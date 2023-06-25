import {View, Text} from 'react-native';
import React from 'react';

const Diary = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Text style={{fontSize: 30}}>Diary</Text>
    </View>
  );
};

export default Diary;
