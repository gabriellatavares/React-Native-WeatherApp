import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CurrentLocation from './CurrentLocation'
import SearchLocation from './SearchLocation'
import SavedLocations from './components/SavedLocations'
import { Ionicons } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator

    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Search') {
          iconName = focused ? 'search' : 'search-outline';
        } else {
          iconName = focused ? 'bookmark' : 'bookmark-outline'
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#A996E0',
      inactiveTintColor: 'gray',
    }}
  >
      <Tab.Screen name="Home" component={CurrentLocation} />
      <Tab.Screen name="Search" component={SearchLocation} />
      <Tab.Screen name="Saved" component={SavedLocations} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (

    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>

  );
}