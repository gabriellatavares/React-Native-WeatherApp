import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View,  SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { citySaved } from '../context/CitiesContext'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {LinearGradient} from 'expo-linear-gradient'


//left to do: delete city from saved list and update asyncStorage

export default function ListSaved() {

  const {cities, setCities} = citySaved()

  const list = () => {
    if (cities !== null){
    return cities.map((element, idx) => {
      return (
      <LinearGradient
        colors={['#A996E0', '#E89F87']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        key={idx}
       >
        
        <View style={styles.contain}>
          <View>
            <Text> 
            <TouchableOpacity style={{padding: 15}}>
              <Ionicons name="trash" size={25} color={'white'}/>
              </TouchableOpacity>
            </Text>
          </View>
          <View>
            <Text style={styles.text}>{element[0]}</Text>
            <Text style={styles.text}>{Math.round(element[1])} °C</Text>
          </View>
         </View>
       
        </LinearGradient>
      )
    })
  }
  }

 

if (cities === null){
  return (
    <View>
      <Text>Nothing to see here! </Text>
    </View>
  )

} else if (cities !== null) {
  
    return (
  
      <SafeAreaView>
        <ScrollView>
          <View>
            {list()}
  
            </View>
          </ScrollView>
      </SafeAreaView>
     
    )
  ;
}
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingTop: 20,
    marginTop: 20,
    marginHorizontal: 20,
    paddingBottom: 10,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: 20
  },
  contain: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 0,
    paddingRight: 20,
  }
})