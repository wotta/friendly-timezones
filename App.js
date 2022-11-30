//import { StatusBar } from 'expo-status-bar';
//import { StyleSheet, Text, View } from 'react-native';

import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { default as theme } from './assets/themes/woutervm-theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {AppNavigator} from "./navigation.component";

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <AppNavigator />
    </ApplicationProvider>
  </>
);