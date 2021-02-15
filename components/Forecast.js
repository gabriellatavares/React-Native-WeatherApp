import React from 'react'
import {StyleSheet, View, Image, Text} from 'react-native'

export default class Forecast extends React.Component {
  state = { }

  componentDidMount(){

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let date = new Date(this.props.detail.dt * 1000)
    let dayName = days[date.getDay()]
    let day = date.getDate()

    this.setState({
      dayName,
      day,
    })
  }
  render() {
    return(
        <View style = {styles.card}>
            <View style = {styles.container}>
                <View style = {styles.innerContainer}>
                    <Text style = {styles.date}>{this.state.dayName}</Text>
                </View>

                <Image style = {styles.image} source = {{uri:"https://openweathermap.org/img/wn/" + this.props.detail.weather[0].icon + ".png"}}/>
                
                <View style = {styles.innerContainer}>
                    <Text style = {styles.numberDay}>{Math.round(this.props.detail.temp.day)}</Text>
                    <Text style = {styles.numberNight}> {Math.round(this.props.detail.temp.night)}</Text>
                </View>
            </View>  
        </View>
    )
}
}

const styles = StyleSheet.create({
card: {
    backgroundColor: 'transparent',
    borderColor: '#FAF0E6',
    borderWidth: 1,
},
container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 0,
},
date: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 20,
    color: 'white'
},
innerContainer: {
    flexDirection: 'row',
    textAlign: 'left',
    width: '30%',
},
numberDay: {
    fontSize: 20,
    paddingLeft: 15,
    color: 'white'
},
numberNight: {
    fontSize: 20,
    paddingLeft: 35,
    color: 'white'

},
image: {
    width: 50,
    height: 50,
},
});
