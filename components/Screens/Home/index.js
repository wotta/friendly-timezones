import {StyleSheet} from "react-native";
import BaseLayout from '@components/Layouts'
import TimezoneList from "@components/TimezoneList";
import {useIsFocused} from "@react-navigation/native";
import React, {useEffect, useRef, useState} from 'react';
import {Button, ButtonGroup, Icon} from '@ui-kitten/components';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ({navigation}) {
  const isFocused = useIsFocused();
  const interval = useRef(0);
  const [currentListKey, setCurrentListKey] = useState(Date.now())
  const [timezones, setTimezones] = useState([])

  useEffect(() => {
    if (! isFocused) {
      return () => clearInterval(interval.current);
    }

    (async ()=> {
      interval.current = setInterval(() => {
        setCurrentListKey(Date.now());
      }, 1000);

      const response = JSON.parse(await AsyncStorage.getItem('timezones')) ?? [];

      setTimezones(response);
    })();

    return () => clearInterval(interval.current);
  }, [isFocused])

  const removeTimezone = async (index) => {
    try {
      let storedTimezones = JSON.parse(await AsyncStorage.getItem('timezones')) ?? [];
      storedTimezones.splice(index, 1)

      await AsyncStorage.setItem('timezones', JSON.stringify(storedTimezones));

      setTimezones(storedTimezones);
    } catch (e) {
      console.log(e);
    }
  }

  const navigateToCreate = () => {
    navigation.navigate('Create', {
      title: 'Hier ben ik'
    });
  };

  return (
    <BaseLayout>
      <TimezoneList timezones={timezones} onRemove={removeTimezone} key={currentListKey} />
      <ButtonGroup style={buttonStyles.container}>
        <Button accessoryLeft={<Icon name='plus'/>} onPress={navigateToCreate}>Add new</Button>
      </ButtonGroup>
    </BaseLayout>
  );
};

const buttonStyles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: 10,
  },
});
