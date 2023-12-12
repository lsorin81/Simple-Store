import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
      <View>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text>${item.price}</Text>
      </View>
      <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
        {item.description}
      </Text>
    </TouchableOpacity>
  );
};

export default ProductThumbnail;

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    maxWidth: 180,
  },
  thumbnail: {
    width: 140,
    height: 140,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  title: {
    fontWeight: 'bold',
  },
  description: {
    color: 'gray',
    fontSize: 12,
  },
});
