import React from 'react';
import {Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddProductScreen from '../screens/AddProductScreen';
import {useAuth} from '../context/AuthContext';
import ProductScreen from '../screens/ProductScreen';

export type HomeStackParamList = {
  Home: undefined; // No parameters expected for HomeScreen
  AddProduct: undefined; // Assuming no parameters for AddProductScreen
  Product: {productId: number}; // Example parameter for ProductScreen
};

const HomeStack = createStackNavigator<HomeStackParamList>();

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
      <HomeStack.Screen name="Product" component={ProductScreen} />
    </HomeStack.Navigator>
  );
}

export default HomeStackNavigator;
