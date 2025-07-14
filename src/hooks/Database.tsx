import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { firestore } from '@/config/firebaseConfig';

const Database = () => {
  // State variables for clients, programs, products, downloads, blogs, and loading/error status
  const [tours, setTours] = useState([]);
  const [blogs, setBlogs] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Start by setting loading state to true
        setLoading(true);

        // Query for programs
        const programsQuery = query(collection(firestore, 'TP_Programs'), where('availability', '==', true));
        const unsubscribePrograms = onSnapshot(programsQuery, snapshot => {
          const programsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setTours(programsData);
        });

        

        // Query for blogs
        const blogsQuery = query(collection(firestore, 'TP_Blogs'), where('availability', '==', true));
        const unsubscribeBlogs = onSnapshot(blogsQuery, snapshot => {
          const blogsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setBlogs(blogsData);
        });

        setLoading(false);

        // Return cleanup functions to unsubscribe from snapshot listeners
        return () => {
          unsubscribePrograms();
          
          unsubscribeBlogs();
        };
      } catch (error) {
        // If there's an error, set loading to false and store the error
        setLoading(false);
        setError(error);
        console.error('Error fetching data:', error);
      }
    };

    // Invoke the fetchData function
    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only on mount

  return { tours, blogs, loading, error };
};

export default Database;
