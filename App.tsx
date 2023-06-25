import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import TabBar from './src/components/tab-bar';
import {SafeAreaView} from 'react-native/types';

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <TabBar />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
