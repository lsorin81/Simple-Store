import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {Product} from '../screens/HomeScreen';

const ProductThumbnail = ({item}: {item: Product}) => {
  return (
    <View style={styles.item}>
      <Image source={{uri: item.thumbnail}} style={styles.thumbnail} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
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
