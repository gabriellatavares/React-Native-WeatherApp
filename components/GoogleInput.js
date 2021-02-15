import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

export default function GoogleInput({newLatitude, setNewLat, newLongitude, setNewLong}) {
  function newLocation(details) {
    let newLat = details.geometry.location.lat
    let newLong = details.geometry.location.lng
    setNewLat(newLat)
    setNewLong(newLong)
  }
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
      placeholder='Search here! 🔎'
      minLength={1}
      autoFocus={false}
      returnKeyType = {'search'}
      listViewDisplayed='auto'
      fetchDetails={true}
      onPress={(data, details = null) => {
        newLocation(details, details.geometry.location.lat, details.geometry.location.lng)
        return (null)
      }}
      getDefaultValue = {() => {
        return ''
      }}
      query = {{
        key: 'AIzaSyAsZyiWcijdn8yn7k_J8QwQeE6w1MQ2JEM',
        language: 'en',
        types: '(cities)',
      }}
      style = {{
      }}
      currentLocation = {false}
      currentLocationLabel = 'Current location'
      debounce = {300}

      />

    </View>

  )
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'row',
      paddingTop: 30,
      paddingBottom: 0,
      paddingLeft: 40,
      width: '90%',
    },
})
