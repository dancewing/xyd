import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from 'demo/Router';
import {navigationRef} from 'common/service/navigation';
import {Sentry, init} from 'common/service/sentry';
import {Provider} from '@ant-design/react-native';
import theme from 'styles/ant-theme';

init();

const App = () => {
  return (
    <Provider theme={theme}>
      <NavigationContainer ref={navigationRef}>
        <Router />
      </NavigationContainer>
    </Provider>
  );
};

export default Sentry.wrap(App);
