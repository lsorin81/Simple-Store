import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import useProducts from '../hooks/useProducts';
import {Product} from './HomeScreen';

import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/HomeStackNavigator';

type ProductScreenRouteProp = RouteProp<HomeStackParamList, 'Product'>;
type ProductScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'Product'
>;

type Props = {
  route: ProductScreenRouteProp;
  navigation: ProductScreenNavigationProp;
};

const ProductScreen: React.FC<Props> = ({route}) => {
  const {productId} = route.params;
  const {products} = useProducts();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    if (productId && products && products.length) {
      setProduct(products.find(prod => prod.id === productId));
    }
  }, [productId, products]);

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: product?.thumbnail}} style={styles.image} />

      <View style={styles.titleRow}>
        <Text style={styles.title}>{product?.title}</Text>
        <Text style={styles.price}>${product?.price}</Text>
      </View>

      <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
        {product?.description}
      </Text>
    </ScrollView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: 'green', // Adjust the color as needed
  },
  description: {
    padding: 10,
  },
});
