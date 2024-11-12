import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import BooksListScreen from './BooksListScreen';
import BookDetailScreen from './BookDetailScreen';
import BorrowedScreen from './BorrowedScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BooksList" component={BooksListScreen} options={{ title: 'Books List' }} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ title: 'Book Detail' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Borrowed') {
              iconName = 'book-outline';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Borrowed" component={BorrowedScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
