import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Import screens
import SearchScreen from './src/screens/SearchScreen';
import AccountScreen from './src/screens/AccountScreen';
import {AuthProvider} from './src/context/AuthContext';
import HomeStackNavigator from './src/navigation/HomeStackNavigator';
import {Image} from 'react-native';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{title: ''}}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              style={{width: 48, height: 48, marginTop: 16}}
              source={require('./src/assets/home.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: () => (
            <Image
              style={{width: 48, height: 48, marginTop: 16}}
              source={require('./src/assets/search.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: () => (
            <Image
              style={{width: 48, height: 48, marginTop: 16}}
              source={require('./src/assets/account.png')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <MyTabs />
      </AuthProvider>
    </NavigationContainer>
  );
}
