import React from 'react';
import BaseLayout from '@components/Layouts'
import {Text, Button, Layout, ListItem} from '@ui-kitten/components';
import {View} from "react-native";

export default function ({navigation}) {
  const navigateDetails = () => {
    navigation.navigate('Details', {
      title: 'Dit is een test'
    });
  };

  return (
    <BaseLayout>
      <Layout style={{flex: 1}}>
        <ListItem
          title={evaProps => <Text {...evaProps}>TITLE</Text>}
          description={evaProps => <Text {...evaProps}>DESCRIPTION</Text>}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Button onPress={navigateDetails} style={{}}>OPEN DETAILS</Button>
        </View>
      </Layout>
    </BaseLayout>
  );
};
