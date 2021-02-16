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
  
if (unitsSystem === 'metric'){
  return (
    <>
    <View style={styles.WeatherInfo}>
      <Text style={styles.textPrimary}>{name}</Text>
      <Text style={styles.textSecondary}>{main}</Text>
      <Image 
      style={styles.weatherIcon}
      source={{uri: iconUrl}}/>
        {/* <Text>Min: {temp_min}°. Max: {temp_max}°</Text> */}
        <Text style={{color: 'white'}}>Feels like: {Math.round(feels_like)}° </Text> 
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Text style={styles.textPrimary}>{Math.round(temp)}</Text>
        <Picker itemStyle={{color:'white'}} style={{flex: 0.3,} } selectedValue={unitsSystem} onValueChange={(item) => setUnitsSystem(item)} >
          <Picker.Item  label="°C" value='metric'/>
          <Picker.Item label="°F" value='imperial'/>
        </Picker>
      </View>
    </View>
  </>
  )} else {
    return (
      <>
      <View style={styles.WeatherInfo}>
      <Text style={styles.textPrimary}>{name}</Text>
      <Text style={styles.textSecondary}>{main}</Text>
      <Image 
      style={styles.weatherIcon}
      source={{uri: iconUrl}}/>
        {/* <Text>Min: {temp_min}°. Max: {temp_max}°</Text> */}
        <Text style={{color: 'white'}}>Feels like: {Math.round((feels_like / 5) * 9 + 32)}°</Text>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Text style={styles.textPrimary}>{Math.round((temp / 5) * 9 + 32)}</Text>
        <Picker itemStyle={{color:'white'}} style={{flex: 0.3,} } selectedValue={unitsSystem} onValueChange={(item) => setUnitsSystem(item)} >
          <Picker.Item  label="°C" value='metric'/>
          <Picker.Item label="°F" value='imperial'/>
        </Picker>
      </View>
    </View>
  </>
    )
  }
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
    color: 'white',

  },
  textSecondary: {
    fontSize: 20,
    marginTop: 10,
    color: 'white'

  },

})