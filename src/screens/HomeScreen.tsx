import React from 'react';
import {FlatList, ActivityIndicator, Text} from 'react-native';
import ProductThumbnail from '../components/ProductThumbnail';
import useProducts from '../hooks/useProducts';

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export default function HomeScreen() {
  const {products, loading, error} = useProducts();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error loading products: {error}</Text>;
  }

  return (
    <FlatList
      data={products}
      numColumns={2}
      renderItem={({item}) => <ProductThumbnail item={item} />}
      keyExtractor={item => item.id.toString()}
    />
  );
}
