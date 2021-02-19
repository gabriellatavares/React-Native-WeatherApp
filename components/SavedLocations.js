import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSaved } from '../context/SavedCityContext'
import { citySaved } from '../context/CitiesContext'
import ListSaved from './ListSaved'


export default function SavedLocations() {


  const {cities, setCities} = citySaved()
  const {isSaved, setIsSaved} = useSaved()


  useEffect(() => {
    getCity()
  }, [])

  const getCity = async () => {
    try {
      const value = await AsyncStorage.getItem('storedCities')
      if (value !== null){
        let city = JSON.parse(value)
        setCities(city)
        console.log('from city state', cities.length)
      }
    } catch(e){
    }
  }

  const deleteAll = async () => { 
    let empty = ''
    try {
      let cityStored = await AsyncStorage.setItem('storedCities', empty)
      setCities(null)
      setIsSaved(0)
    } catch (e){
      alert(e)
    }
  }


  if (isSaved === 0){
    console.log(isSaved)
    return (
      <View >
        <Text style={styles.text}>
          Cleared all cities. Nothing to see here anymore. Please save some of your favorite cities and check-out later.
        </Text>
      </View>
    )
  } else {
  return (
    <>
    
    <View style={styles.container}>
      <Text style={styles.title}>Saved cities</Text>
      <TouchableOpacity
        onPress={deleteAll}
      > 
    <Ionicons name="trash" size={30} color={'#E89F87'} />
    </TouchableOpacity> 
    </View>
    <View>
      <ListSaved />
    </View>
    </>
  )
}
}

const styles = StyleSheet.create({
  text: {
    alignContent: 'center',
    padding: 100,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A996E0'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#A996E0'

  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 100,
    alignContent: 'center',
  }
})
