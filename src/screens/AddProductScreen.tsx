import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Product} from './HomeScreen';
import useProducts from '../hooks/useProducts';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const AddProductScreen: React.FC = () => {
  const {products} = useProducts();
  const navigation = useNavigation();
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    discountPercentage: '',
    rating: '',
    stock: '',
    brand: '',
    category: '',
    thumbnail: '',
    images: [],
  });

  const handleSubmit = async () => {
    const res = await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(product),
    });
    const result = await res.json();
    if (result.id) {
      Alert.alert(
        'Success',
        'New post successfully created, get back to Home screen now!',
        [
          {
            text: 'OK',
            onPress: navigation.goBack,
          },
        ],
      );
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={handleSubmit}
          title="Submit"
          color="#000" // You can customize your button color
        />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  const chooseRandomThumbnail = () => {
    const randomIndex = Math.ceil(Math.random() * (products.length - 1));
    const randomThumbnail = products[randomIndex].thumbnail;
    handleChange('thumbnail', randomThumbnail);
  };

  useEffect(() => {
    if (products && products.length) {
      chooseRandomThumbnail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  // Update the state for a given field
  const handleChange = (name: keyof Product, value: any) => {
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Render method continues
  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={value => handleChange('title', value)}
        value={product.title}
        placeholder="Title"
      />
      <TextInput
        style={styles.input}
        onChangeText={value => handleChange('description', value)}
        value={product.description}
        placeholder="Description"
      />
      <TextInput
        style={styles.input}
        onChangeText={value => handleChange('price', value)}
        value={product.price}
        placeholder="Price"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={value => handleChange('discountPercentage', value)}
        value={product.discountPercentage}
        placeholder="Discount Percentage"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={value => handleChange('rating', value)}
        value={product.rating}
        placeholder="Rating"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={value => handleChange('stock', value)}
        value={product.stock}
        placeholder="Stock"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={value => handleChange('brand', value)}
        value={product.brand}
        placeholder="Brand"
      />
      <TextInput
        style={styles.input}
        onChangeText={value => handleChange('category', value)}
        value={product.category}
        placeholder="Category"
      />
      <TouchableOpacity onPress={chooseRandomThumbnail}>
        <Image source={{uri: product.thumbnail}} style={styles.thumbnail} />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  label: {
    marginVertical: 8,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  thumbnail: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
});
