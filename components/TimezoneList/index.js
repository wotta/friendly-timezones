import React from "react";
import moment from "moment-timezone";
import {Button, Icon, List, ListItem} from "@ui-kitten/components";
import * as Clipboard from 'expo-clipboard';

export default function ({timezones=[], onRemove}) {
  const icon = (
    <Icon name='globe-outline' />
  )

  const removeButton = (index) => {
    return (
      <Button
        size='tiny'
        onPress={() => onRemove(index)}
        accessoryRight={<Icon name='close-outline' />}
      >
      </Button>
    );
  };

  const copyTime = async (item) => {
    return await Clipboard.setStringAsync(moment().tz(item).format('HH:mm A'));
  }

  const renderItem = ({ item, index }) => (
    <ListItem
      key={index}
      title={`${item} :: ${moment().tz(item).format('HH:mm A')}`}
      onPressOut={() => copyTime(item)}
      description={moment().tz(item).zoneAbbr()}
      accessoryLeft={icon}
      accessoryRight={() => removeButton(index)}
    />
  );

  return (
    <List
      data={timezones}
      renderItem={renderItem}
    />
  )
}
