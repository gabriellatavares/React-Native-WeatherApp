import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ActivityIndicator,
  FlatList,
} from 'react-native';
import * as Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo'
import Forecast from './components/Forecast'
import {LinearGradient} from 'expo-linear-gradient'


const WEATHER_API_KEY = '16909a97489bed275d13dbdea4e01f59'
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'
const FORECAST_URL =  'https://api.openweathermap.org/data/2.5/onecall?'


export default function CurrentLocation() {

  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, setUnitsSystem] = useState('metric')
  const [forecast, setForecast] = useState(null)
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')


  
  useEffect(() => {
    load()
  }, [unitsSystem, longitude, latitude])



  async function load(){
    setCurrentWeather(null)
    setErrorMessage(null)
    try {
      let { status } = await Location.requestPermissionsAsync()
      if (status !== 'granted'){
        setErrorMessage('Access to location is needed to run the app!')
        return 
      }
      const location = await Location.getCurrentPositionAsync()
      
      setLatitude(location.coords.latitude)
      setLongitude(location.coords.longitude)
 
    
      
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`

      const response = await fetch(weatherUrl)
      const result = await response.json()

      const forecastUrl = `${FORECAST_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`
      const response2 = await fetch(forecastUrl)
      const result2 = await response2.json()

      if(response.ok) {
        setCurrentWeather(result)
      } else {
        setErrorMessage(result.message)
      }

      if(response2.ok){
        setForecast(result2)
      }

    } catch (error){
      setErrorMessage(error.message)
    }
  } 



  if (currentWeather && forecast){
    return (

      <LinearGradient
       colors={['#A996E0', '#E89F87']}
       style={styles.container}
       start={{ x: 0, y: 0 }}
       end={{ x: 1, y: 1 }}
      >
        <View style={styles.container}>
     
         <StatusBar style="auto" />
           <View style={styles.main}>
            <WeatherInfo 
            currentWeather={currentWeather} 
            unitsSystem={unitsSystem} 
            setUnitsSystem={setUnitsSystem}
            />
          </View>
           <FlatList data = {forecast.daily} 
          keyExtractor= {item => item.dt.toString()}
          renderItem = {({item}) => 
          <Forecast detail = {item} />
          }/> 
                
      </View>
      </LinearGradient>
    )
  } else if (errorMessage){
    return (
      <View style={styles.container}>
      <Text>{errorMessage}</Text>
      <StatusBar style="auto" />
    </View>
    )
  } else {
    return (
      <View style={styles.container}>
      <ActivityIndicator size='large' />
      <StatusBar style="auto" />
    </View>
    )
  }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    paddingTop: 80,

  },
  main: {
    justifyContent: 'center',
  }, 
  forecast: {
    flex: 2,
    justifyContent: 'center',
  }
});
