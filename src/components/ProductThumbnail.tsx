import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Product} from '../screens/HomeScreen';

const ProductThumbnail = ({
  item,
  onPress,
}: {
  item: Product;
  onPress: (productId: number) => void;
}) => {
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(item.id)}>
      <Image source={{uri: item.thumbnail}} style={styles.thumbnail} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );
};

export default ProductThumbnail;

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    maxWidth: 200,
  },
  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  title: {
    fontWeight: 'bold',
  },
  description: {
    color: 'gray',
  },
});
