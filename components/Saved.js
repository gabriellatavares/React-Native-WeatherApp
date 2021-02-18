import React, {useState, } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSaved } from '../context/SavedCityContext'
import { citySaved } from '../context/CitiesContext'


export default function Saved({name, temp}) {
  const {isSaved, setIsSaved} = useSaved()
  const {cities, setCities} = citySaved()

  
  const onPress = async () => {
    let cityArr = []
    cityArr.push(name)
    cityArr.push(temp)

    try {
      let cityStored = await AsyncStorage.getItem('storedCities')
      if (cityStored == null || cityStored == undefined){
        cityStored = []
        cityStored = JSON.stringify(cityStored)
      }
      let citie = JSON.parse(cityStored)
      let isThere = false
      citie.forEach(function (item, index) {
        if (item[0] === cityArr[0]){
          alert('City is already saved!')
          isThere = true
          console.log(isThere)
        } 
      })
      if (isThere === false){
        citie.push(cityArr)
      }
      const trial = JSON.stringify(citie)
      await AsyncStorage.setItem('storedCities', trial)
      setIsSaved('saved')
      setCities(citie)
      console.log(typeof citie)
    } catch (e){
      alert(e)
    }
  }
    

  
  return (
    <View >
       <TouchableOpacity
        onPress={onPress}
      >
    <Ionicons name="bookmark-outline" size={30} color={'white'} />
    </TouchableOpacity>
    </View>
  );
}
