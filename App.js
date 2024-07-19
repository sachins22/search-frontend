import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {  GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();



// import file

import Authcontex from './utils/Authcontex';
import Create from './App/Create';
import  Back_uri  from './utils/Server';
import Server from './utils/Server';
import Search from './App/Search';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
<Authcontex.Provider value={ {
   Back_uri,
  
}}>
  <NavigationContainer>
    <Stack.Navigator initialRouteName='Create'>
      {/* <Stack.Screen 
      name='Server' component={Server} options={{ headerShown: false }}
      /> */}
      <Stack.Screen 
      name='Search' component={Search} options={{ headerShown: false }}
      />
      <Stack.Screen 
      name='Create' component={Create} options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
  </NavigationContainer>

</Authcontex.Provider>
</GestureHandlerRootView>
  )
}