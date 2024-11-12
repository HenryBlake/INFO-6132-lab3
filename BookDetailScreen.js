import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert,StyleSheet } from 'react-native';
import { db } from '../BookApp/firebaseconfig';
import { doc, updateDoc, collection, getDocs, query, where } from 'firebase/firestore';

function BookDetailScreen({ route, navigation }) {
  const { book } = route.params;
  const [borrowedCount, setBorrowedCount] = useState(0);

  const fetchBorrowedCount = async () => {
    const borrowedQuery = query(collection(db, 'books'), where('available', '==', false));
    const borrowedSnapshot = await getDocs(borrowedQuery);
    setBorrowedCount(borrowedSnapshot.size);
  };

  useEffect(() => {
    fetchBorrowedCount(); 
  }, []);

  const borrowBook = async () => {
    if (borrowedCount >= 3) {
      Alert.alert('Limit!', 'You can only borrow for max 3 books');
      return;
    }

    try {
      const bookRef = doc(db, 'books', book.id);
      await updateDoc(bookRef, { available: false });
      Alert.alert('Success', 'Book borrowed');
      navigation.goBack(); 
    } catch (error) {
      Alert.alert('err', 'cant do this');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.bookTitle}>{book.name}</Text>
      <Text style={styles.bookAuthor}>Author: {book.author}</Text>
      <Text style={styles.bookRating}>Rating: {book.rating}</Text>
      <Text style={styles.bookSummary}>{book.summary}</Text>
      <Button title="Borrow" onPress={borrowBook} />
    </View>
  );
  
}
const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#fff',
      flex: 1,
    },
    bookTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
    },
    bookAuthor: {
      fontSize: 18,
      color: '#666',
      marginBottom: 10,
    },
    bookRating: {
      fontSize: 16,
      color: '#444',
      marginBottom: 10,
    },
    bookSummary: {
      fontSize: 16,
      color: '#666',
      lineHeight: 24,
      marginBottom: 20,
    },
  });

export default BookDetailScreen;
