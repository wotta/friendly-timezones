import moment from "moment-timezone";
import React, {useState} from 'react';
import BaseLayout from '@components/Layouts';
import {TouchableWithoutFeedback} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Autocomplete, AutocompleteItem, Button, Icon} from "@ui-kitten/components";

export default function ({ navigation }) {
  const momentTimezones = moment.tz.names();

  const [timezone, setTimezone] = useState('');
  const [timezones, setTimezones] = useState(momentTimezones);

  const filter = (item, query) => item.toLowerCase().includes(query.toLowerCase());

  const onChangeText = (query) => {
    setTimezone(query);

    setTimezones(momentTimezones.filter(item => filter(item, query)));
  };

  const renderOption = (item, index) => {
    const utcOffset = moment().tz(item).utcOffset();
    const belowZero = utcOffset < 0;
    return (
      <AutocompleteItem
        key={index}
        title={`${item} :: ${belowZero ? '' : '+'}${utcOffset / 60}`}
      />
    );
  };

  const renderCloseIcon = (props) => (
    <TouchableWithoutFeedback onPress={clearInput}>
      <Icon {...props} name='close'/>
    </TouchableWithoutFeedback>
  );

  const clearInput = () => {
    setTimezone('');
    setTimezones(momentTimezones);
  };

  const handleSubmit = async () => {
    // Add the selected timezone to the list of timezones in AsyncStorage
    let storedTimezones = JSON.parse(await AsyncStorage.getItem('timezones'));

    if (! storedTimezones) {
      storedTimezones = [timezone];
    } else {
      storedTimezones.push(timezone)
    }

    await AsyncStorage.setItem('timezones', JSON.stringify(storedTimezones));

    navigation.navigate('Home');
  };

  const selectTimezone = (index) => {
    setTimezone(timezones[index]);
  }

  return (
    <BaseLayout>
      <Autocomplete
        data={timezones}
        value={timezone}
        onSelect={selectTimezone}
        onChangeText={onChangeText}
        accessoryRight={renderCloseIcon}
        placeholder='Select a timezone to add'
      >
        {timezones.map(renderOption)}
      </Autocomplete>
      <Button onPress={handleSubmit} title="Submit">Add timezone</Button>
    </BaseLayout>
  );
};
