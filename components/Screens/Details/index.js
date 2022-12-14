import React, {useState} from 'react';
import BaseLayout from '@components/Layouts';
import {Autocomplete, AutocompleteItem, Button, Icon} from '@ui-kitten/components';
import {TouchableWithoutFeedback} from "react-native";
import moment from "moment-timezone";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ({navigation}) {
  const timezoneNames = moment.tz.names();

  const [value, setValue] = useState(null);
  const [data, setData] = useState(timezoneNames);

  const filter = (item, query) => item.toLowerCase().includes(query.toLowerCase());

  const onSelect = (index) => {
    setValue(data[index]);
  };

  const onChangeText = (query) => {
    setValue(query);

    setData(timezoneNames.filter(item => filter(item, query)));
  };

  const clearInput = () => {
    setValue(null);
    setData(timezoneNames);
  };

  const renderOption = (item, index) => {
    return (
      <AutocompleteItem
        key={index}
        title={item}
      />
    );
  };

  const renderCloseIcon = (props) => (
    <TouchableWithoutFeedback onPress={clearInput}>
      <Icon {...props} name='close'/>
    </TouchableWithoutFeedback>
  );

  const onSubmit = async () => {
    // Save the selected timezone to AsyncStorage here
    try {
      await AsyncStorage.setItem('timezones', value);
    } catch (error) {
      // Handle error
    }
    // navigation.navigate('Index');
  };

  return (
    <BaseLayout>
      <Autocomplete
        placeholder='Place your Text'
        value={value}
        accessoryRight={renderCloseIcon}
        onChangeText={onChangeText}
        onSelect={onSelect}>
        {data.map(renderOption)}
      </Autocomplete>

      <Button onPress={onSubmit}>Submit</Button>
    </BaseLayout>
  );
};
