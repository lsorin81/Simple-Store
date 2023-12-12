import {useState, useEffect} from 'react';
import {Product} from '../screens/HomeScreen';

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://dummyjson.com/products');
        const result = await res.json();
        setProducts(result.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return {products, loading, error};
};

export default useProducts;
