import React, {useState} from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default function Reset({newLatitude, newLongitude, setNewLat, setNewLong}) {

  const onPress = () => setNewLat(null) && setNewLong(null);

  return (
    <View >
       <TouchableOpacity
        onPress={onPress}
      >
    <Ionicons name="refresh" size={30} color={'white'} />
    </TouchableOpacity>
    </View>
  );
}


