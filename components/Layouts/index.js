import React from 'react';
import {Divider, Icon, Layout, TopNavigation, TopNavigationAction, useTheme} from '@ui-kitten/components';
import {useNavigation, useRoute} from "@react-navigation/native";
import {SafeAreaView} from "react-native";

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back'/>
);

export default function ({ children }) {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme['background-basic-color-1'] }}>
      <TopNavigation
        accessoryLeft={
          navigation.canGoBack() && <TopNavigationAction icon={BackIcon} onPress={navigation.goBack} />
        }
        title={route.params?.title ?? 'Friendly Timezones'}
        alignment='center'
      />
      <Divider/>
      {children}
    </SafeAreaView>
  );
}
