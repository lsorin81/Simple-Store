import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import ProductThumbnail from '../components/ProductThumbnail';

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
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    const res = await fetch('https://dummyjson.com/products');
    const result = await res.json();
    setProducts(result.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <FlatList
      data={products}
      numColumns={2}
      renderItem={({item}) => <ProductThumbnail item={item} />}
      keyExtractor={item => item.id.toString()}
    />
  );
}
