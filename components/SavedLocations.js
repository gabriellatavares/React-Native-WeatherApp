import React, {useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'


//managed to save cities on async storage,
//now the plan is to show all cities here in this page, 
//and delete city if the user wants to

export default function SavedLocations() {


  let flag;

  useEffect(() => {
    getCity()
  }, [])

  const getCity = async () => {
    try {
      const value = await AsyncStorage.getItem('storedCities')
      if (value !== null){
        console.log('from value',value)
        flag = true
      }
    } catch(e){
    }
  }

  const deleteAll = async () => { 
    let empty = ''
    try {
      let cityStored = await AsyncStorage.setItem('storedCities', empty)
      flag = false
      console.log(flag)
    } catch (e){
      alert(e)
    }
  }


  if (flag == false){
    return (
      <View >
        <Text style={styles.text}>
          Nothing to see here yet. Please save some of your favorite cities and check-out later.
        </Text>
      </View>
    )
  } else {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved cities</Text>
      <TouchableOpacity
        onPress={deleteAll}
      > 
    <Ionicons name="trash" size={30} color={'#E89F87'} />
    </TouchableOpacity> 
    </View>
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
