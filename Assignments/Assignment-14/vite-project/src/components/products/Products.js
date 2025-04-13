import React, { useEffect, useState } from 'react';
import PostList from '../postlist/PostList';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5); 

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 5 && !loading) {
      console.log('Load more items!');
      setVisibleCount((prevCount) => prevCount + 1); 
      setPage((prevPage) => prevPage + 1); 
    }
  };

  const getProducts = async (page) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      );
      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, ...data]); 
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts(page);
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <div style={{ padding: '1rem' }}>
      <PostList posts={products} visibleCount={visibleCount} />
      {loading && <p>Loading more items...</p>} 
    </div>
  );
}


