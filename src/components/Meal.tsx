import {View, Text} from 'react-native';
import React from 'react';

const Meal = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Text style={{fontSize: 30}}>Meal</Text>
    </View>
  );
};

export default Meal;
