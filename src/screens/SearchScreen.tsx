import React, {useState} from 'react';
import {Button, FlatList, StyleSheet, TextInput, View} from 'react-native';
import ProductThumbnail from '../components/ProductThumbnail';
import {Product} from './HomeScreen';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const handleSearch = async () => {
    const res = await fetch(
      'https://dummyjson.com/products/search?q=' + searchQuery,
    );
    const results = await res.json();
    setSearchResults(results.products);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder="Search for products"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      <FlatList
        data={searchResults}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <ProductThumbnail item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchSection: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SearchScreen;
