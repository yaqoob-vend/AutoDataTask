import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddRecord from '../screens/AddRecord';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddRecord" component={AddRecord} />
    </Stack.Navigator>
  );
};

export default RootStack;
