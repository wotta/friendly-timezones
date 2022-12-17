import React from "react";
import moment from "moment-timezone";
import {Button, Icon, List, ListItem} from "@ui-kitten/components";
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';

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
    const copied = await Clipboard.setStringAsync(moment().tz(item).format('HH:mm A'));

    if (copied) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  }

  const renderItem = ({ item, index }) => (
    <ListItem
      key={index}
      title={`${item} :: ${moment().tz(item).format('HH:mm A')}`}
      onPress={() => copyTime(item)}
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
