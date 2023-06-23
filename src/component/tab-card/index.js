import {View, Text} from 'react-native';
import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {styles} from './styles';

const TabCard = ({path, name}) => {
  return (
    <View
      style={{
        paddingHorizontal: 15,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderTopEndRadius: 12,
        borderTopLeftRadius: 12,
        paddingTop: 10,
      }}>
      <Svg height={40} viewBox="0 -960 960 960" width={40}>
        <Path d={path} />
      </Svg>
      <Text style={styles.tabName}>{name}</Text>
    </View>
  );
};

export default TabCard;
