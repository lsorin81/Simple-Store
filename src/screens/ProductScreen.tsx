import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import useProducts from '../hooks/useProducts';
import {Product} from './HomeScreen';

const ProductScreen = () => {
  const route = useRoute();
  const {productId} = route.params;
  const {products} = useProducts();
  const [product, setProduct] = useState<Product>();
  console.log(
    '🚀 ~ file: ProductScreen.tsx:12 ~ ProductScreen ~ product:',
    product,
  );

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
