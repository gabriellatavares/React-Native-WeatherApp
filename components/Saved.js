import React, {useState, } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Saved({name, temp}) {

  
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
      let cities = JSON.parse(cityStored)
      let isThere = false
      cities.forEach(function (item, index) {
        if (item[0] === cityArr[0]){
          alert('City is already saved!')
          isThere = true
          console.log(isThere)
        } 
      })
      if (isThere === false){
        cities.push(cityArr)
      }
      const trial = JSON.stringify(cities)
      await AsyncStorage.setItem('storedCities', trial)
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
