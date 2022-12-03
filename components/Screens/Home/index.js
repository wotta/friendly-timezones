import React, {useState} from 'react';
import BaseLayout from '@components/Layouts'
import {Button} from '@ui-kitten/components';
import {StyleSheet, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimezoneList from "@components/TimezoneList";

export default function ({navigation}) {
  const [timezones, setTimezones] = useState(null);
  const navigateDetails = () => {
    navigation.navigate('Details', {
      title: 'Dit is een test'
    });
  };

  const addTestData = async () => {
    try {
      const data = await AsyncStorage.setItem('@testKey', 'randomValue')
    } catch (e) {
      console.log(e);
    }
  }

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem('@testKey');

      console.log(data);

      setTimezones(data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <BaseLayout>
      <View style={{flex: 1, maxHeight: 192}}>

        <TimezoneList timezones={[
          {title: 'test', description: 'woot'}
        ]} />

        <View style={buttonStyles.container}>
          <View style={buttonStyles.buttons}>
            <Button onPress={getData}>Reload</Button>
            <Button onPress={addTestData}></Button>
            <Button onPress={navigateDetails}>Add</Button>
          </View>
        </View>
      </View>
    </BaseLayout>
  );
};

const buttonStyles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttons: {
    flex: 3,
  }
});
