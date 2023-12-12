import React from 'react';
import {Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddProductScreen from '../screens/AddProductScreen';
import {useAuth} from '../context/AuthContext';

const HomeStack = createStackNavigator();

function HomeStackNavigator() {
  const {isLoggedIn} = useAuth();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          headerRight: isLoggedIn
            ? () => (
                <Button
                  onPress={() => navigation.navigate('AddProduct')}
                  title="Add Product"
                  color="#000" // You can customize your button color
                />
              )
            : () => null,
        })}
      />
      <HomeStack.Screen name="AddProduct" component={AddProductScreen} />
    </HomeStack.Navigator>
  );
}

export default HomeStackNavigator;
