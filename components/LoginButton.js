import React from 'react';
import {Button, Icon} from '@ui-kitten/components';

const FacebookIcon = (props) => (
  <Icon name='facebook' {...props} />
);

export const LoginButton = () => (
  <Button accessoryLeft={FacebookIcon}>Login with Facebook</Button>
);