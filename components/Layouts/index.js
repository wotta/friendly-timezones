import React from 'react';
import {View} from 'react-native';
import {Divider, Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {useNavigation, useRoute} from "@react-navigation/native";

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back'/>
);

export default function ({ children }) {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={{flex: 1}}>
      <TopNavigation
        accessoryLeft={
          navigation.canGoBack() && <TopNavigationAction icon={BackIcon} onPress={navigation.goBack} />
        }
        title={route.params?.title ?? 'Friendly Timezones'}
        alignment='center'
      />
      <Divider/>
      {children}
    </View>
  );
}
