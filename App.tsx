import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './app/navigation/RootStack';
import {setupTable} from './app/database';

const App = () => {
  useEffect(() => {
    setupTable();
  }, []);
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default App;
