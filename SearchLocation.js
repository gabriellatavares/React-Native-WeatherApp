import React, {useEffect, useState} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ActivityIndicator,
  FlatList, 
} from 'react-native';

import GoogleInput from './components/GoogleInput'

export default function SearchLocation() {
     const [newLat, setNewLat] = useState(null)
     const [newLong, setNewLong] = useState(null) 
  
    return (
      <View style={styles.container}>
      <Text>Teste</Text>
      <GoogleInput />
    </View>
    )
  }
 


const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    paddingTop: 150,
    backgroundColor: '#e8e8e4'

  },
  main: {
    justifyContent: 'center',
  }, 
  forecast: {
    flex: 2,
    justifyContent: 'center',
  }
});
