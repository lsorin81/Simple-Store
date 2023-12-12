import {useState, useEffect} from 'react';
import {Product} from '../screens/HomeScreen';

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0); // Start from page 0
  const [hasMore, setHasMore] = useState(true);

  const getProducts = async () => {
    if (!hasMore) {
      return;
    }

    setLoading(true);
    const limit = 20; // Items per page
    const skip = page * limit;

    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
      );
      const result = await res.json();
      if (result.products && result.products.length > 0) {
        setProducts(prevProducts => [...prevProducts, ...result.products]);
        setPage(prevPage => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreProducts = () => {
    if (loading || !hasMore) {
      return;
    }
    getProducts();
  };

  return {products, loading, error, loadMoreProducts};
};

export default useProducts;
