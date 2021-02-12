import React from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  Image } from 'react-native'
import { Picker } from '@react-native-community/picker'


export default function WeatherInfo({currentWeather, unitsSystem, setUnitsSystem}) {
  const {
    main: {temp, feels_like,},
    weather: [details],
    name
  } = currentWeather
  const {icon, main } = details

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`
  return (
    <>
    <View style={styles.WeatherInfo}>
      <Text style={styles.textPrimary}>{name}</Text>
      <Text style={styles.textSecondary}>{main}</Text>
      <Image 
      style={styles.weatherIcon}
      source={{uri: iconUrl}}/>
        {/* <Text>Min: {temp_min}°. Max: {temp_max}°</Text> */}
        <Text>Feels like: {feels_like}°</Text>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Text style={styles.textPrimary}>{temp}</Text>
        <Picker style={{flex: 0.3,} } selectedValue={unitsSystem} onValueChange={(item) => setUnitsSystem(item)} >
          <Picker.Item label="°C" value='metric'/>
          <Picker.Item label="°F" value='imperial'/>
        </Picker>
      </View>
    </View>
  </>
  )
}

const styles = StyleSheet.create({
  WeatherInfo: {
    alignItems: 'center',
  },
 
  weatherIcon: {
    width: 100,
    height: 100,
  },
  textPrimary: {
    fontSize: 40,
    fontWeight: '500',
  },
  textSecondary: {
    fontSize: 20,
    marginTop: 10
  },

})