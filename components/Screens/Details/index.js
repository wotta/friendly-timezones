import React from 'react';
import BaseLayout from '@components/Layouts';
import {Icon, Layout, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';



export default function ({navigation}) {

  console.log(navigation.canGoBack());

  return (
    <BaseLayout>
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text category='h1'>DETAILS</Text>
      </Layout>
    </BaseLayout>
  );
};