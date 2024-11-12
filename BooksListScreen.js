import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { db } from '../BookApp/firebaseconfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

function BooksListScreen({ navigation }) {
  const [books, setBooks] = useState([]);

  const fetchAvailableBooks = async () => {
    const booksQuery = query(collection(db, 'books'), where('available', '==', true));
    const booksSnapshot = await getDocs(booksQuery);
    const booksList = booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setBooks(booksList);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchAvailableBooks();
    }, [])
  );

  return (
    <FlatList
      data={books}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('BookDetail', { book: item })}>
          <View style={styles.bookContainer}>
            <Text style={styles.bookTitle}>{item.name}</Text>
            <Text style={styles.bookAuthor}>{item.author}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  bookContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
  },
});

export default BooksListScreen;
