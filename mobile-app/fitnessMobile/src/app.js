import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RegistrationScreen } from './register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from './login';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserScreen } from './user';
import { ProgramScreen } from './program';
import { EnrollScreen } from './enroll';
import { locale } from './lang/hr';

const Tab = createMaterialBottomTabNavigator();

function Main(props) {
  const params = props.route.params
  return (
    <Tab.Navigator initialRouteName="Program" screenOptions={
      { headerShown: false }}>
      <Tab.Screen name="User" component={UserScreen} initialParams={params} options={{
        tabBarLabel: locale.accountIcon,
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account-box" color={color} size={26} />
        ),
      }} />
      <Tab.Screen name="Enroll" component={EnrollScreen} initialParams={params} options={{
        tabBarLabel: locale.enrollIcon,
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="star" color={color} size={26} />
        ),
      }} />
      <Tab.Screen name="Program" component={ProgramScreen} initialParams={params} options={{
        tabBarLabel: locale.programIcon,
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="progress-check" color={color} size={26} />
        ),
      }} />
    </Tab.Navigator>
  )
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={
        { headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;