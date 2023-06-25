import {View, Text} from 'react-native';
import React from 'react';

const Profile = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Text style={{fontSize: 30}}>Profile</Text>
    </View>
  );
};

export default Profile;
