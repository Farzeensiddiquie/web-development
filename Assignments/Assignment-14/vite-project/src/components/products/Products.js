import React, { useEffect, useState } from 'react';
import PostList from '../postlist/PostList';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5); 

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
      console.log('Load more items!');
      setVisibleCount((prevCount) => prevCount + 5); 
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

  return (
    <div
      onScroll={handleScroll}
      style={{ height: '90vh', overflowY: 'auto', border: '1px solid #ccc' }}
    >
      <PostList posts={products} visibleCount={visibleCount} />
      {loading && <p>Loading more items...</p>} 
    </div>
  );
}

