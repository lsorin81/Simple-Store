import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {ActivityIndicator, FlatList, Text} from 'react-native';
import ProductThumbnail from '../components/ProductThumbnail';
import useProducts from '../hooks/useProducts';
import {HomeStackParamList} from '../navigation/HomeStackNavigator';

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

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Home'>;
type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {products, loading, error, loadMoreProducts} = useProducts();

  if (error) {
    return <Text>Error loading products: {error}</Text>;
  }

  const handleProductPress = (productId: number) => {
    navigation.navigate('Product', {productId});
  };

  const renderFooter = () => {
    return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
  };

  return (
    <FlatList
      data={products}
      numColumns={2}
      renderItem={({item}) => (
        <ProductThumbnail item={item} onPress={handleProductPress} />
      )}
      keyExtractor={item => item.id.toString()}
      onEndReached={() => {
        if (!loading) {
          loadMoreProducts();
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

export default HomeScreen;
