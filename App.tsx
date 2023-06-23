import React from 'react';
import {View, StyleSheet} from 'react-native';
import TabCard from './src/component/tab-card';
import strings from './src/constants/strings';

function App(): JSX.Element {
  return (
    <View style={styles.flexContainer}>
      <View style={styles.tabContainer}>
        <TabCard path={strings.ACCOUNT_PATH} name="Profile" />
        <TabCard path={strings.BOOK_PATH} name="Diary" />
        <TabCard path={strings.HEALTH_PATH} name="Health" />
        <TabCard path={strings.RESTAURANT_PATH} name="Meal" />
        <TabCard path={strings.DESCRIPTION_PATH} name="Notes" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flexContainer: {flex: 1, marginTop: 50, paddingHorizontal: 10},
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default App;
