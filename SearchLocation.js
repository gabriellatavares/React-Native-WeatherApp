import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
} from 'react-native';
import GoogleInput from './components/GoogleInput'
import WeatherInfo from './components/WeatherInfo'
import Forecast from './components/Forecast'
import Reset from './components/Reset'
import Saved from './components/Saved'
import {LinearGradient} from 'expo-linear-gradient'
import {WEATHER_API_KEY} from 'react-native-dotenv'


const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'
const FORECAST_URL =  'https://api.openweathermap.org/data/2.5/onecall?'


export default function SearchLocation() {
    const [unitsSystem, setUnitsSystem] = useState('metric')
    const [newLatitude, setNewLat] = useState(null)
    const [newLongitude, setNewLong] = useState(null) 
    const [currentWeather, setCurrentWeather] = useState(null)
    const [forecast, setForecast] = useState(null)
    const [name, setName] = useState(null)
    const [temp, setTemp] = useState(null)


    useEffect(() => {
      loading()
    }, [ newLongitude, newLatitude])
  

    async function loading(){
      setCurrentWeather(null)
      const weatherUrl = `${BASE_WEATHER_URL}lat=${newLatitude}&lon=${newLongitude}&units=metric&appid=${WEATHER_API_KEY}`

      const response = await fetch(weatherUrl)
      const result = await response.json()

      const forecastUrl = `${FORECAST_URL}lat=${newLatitude}&lon=${newLongitude}&units=metric&appid=${WEATHER_API_KEY}`
      const response2 = await fetch(forecastUrl)
      const result2 = await response2.json()

      if(response.ok) {
        setCurrentWeather(result)
        setName(result.name)
        setTemp(result.main.temp)
  

      }

      if(response2.ok){
        setForecast(result2)
      }
    }

  if (currentWeather && forecast){
    return (
      <LinearGradient
      colors={[ '#E89F87', '#A996E0']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
     >
      <View style={styles.container}>
      <StatusBar style="auto" />
        <View style={styles.main}>
         <View style={styles.reset}> 
           <Reset 
                newLatitude={newLatitude}
                setNewLat={setNewLat}
                newLongitude={newLongitude}
                setNewLong={setNewLong}
          />
            <Saved 
            name={name}
            temp={temp}/>
          </View>
         <WeatherInfo 
         currentWeather={currentWeather} 
         unitsSystem={unitsSystem} 
         setUnitsSystem={setUnitsSystem}
         />
       </View>
        <FlatList data = {forecast.daily} 
       keyExtractor= {item => item.dt.toString()}
       renderItem = {({item}) => 
       <Forecast detail = {item}
       unitsSystem={unitsSystem} />
       }/> 
   </View>
   </LinearGradient>
    )
  } else {
    return (
      <LinearGradient
      colors={[ '#E89F87', '#A996E0']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
     >
      <View style={styles.container}>
        <Text style={styles.search}>Looking for a different city?</Text>
      <GoogleInput 
      newLatitude={newLatitude}
      setNewLat={setNewLat}
      newLongitude={newLongitude}
      setNewLong={setNewLong}/>
    </View>
    </LinearGradient>
    )
  }
  }
 


const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    paddingTop: 70,
  },
  main: {
    justifyContent: 'center',
  }, 
  forecast: {
    flex: 2,
    justifyContent: 'center',
  },
  reset: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: -100, 
    marginRight: 20,
    marginLeft: 20,
    paddingBottom: 100,

    },
  search: {
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 20,
    color: 'white'

  },
});
