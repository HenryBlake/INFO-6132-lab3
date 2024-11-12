import React, { useState } from "react";
import { View, Text, FlatList, Button, Alert ,StyleSheet} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { db } from "../BookApp/firebaseconfig";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";

function BorrowedScreen() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const fetchBorrowedBooks = async () => {
    const borrowedQuery = query(
      collection(db, "books"),
      where("available", "==", false)
    );
    const borrowedSnapshot = await getDocs(borrowedQuery);
    const borrowedList = borrowedSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBorrowedBooks(borrowedList);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBorrowedBooks();
    }, [])
  );

  const returnBook = async (book) => {
    try {
      const bookRef = doc(db, "books", book.id);
      await updateDoc(bookRef, { available: true });
      fetchBorrowedBooks(); 
      Alert.alert("success", "Book returned");
    } catch (error) {
      Alert.alert("Error", "Cant return");
    }
  };

  return (
    <FlatList
      data={borrowedBooks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.bookContainer}>
          <Text style={styles.bookTitle}>{item.name}</Text>
          <Text style={styles.bookAuthor}>{item.author}</Text>
          <Button title="Return" onPress={() => returnBook(item)} />
        </View>
      )}
    />
  );
}
const styles = StyleSheet.create({
  bookContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  bookAuthor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
});
export default BorrowedScreen;
