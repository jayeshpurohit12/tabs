import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import TabBar from './src/components/tab-bar';

const App = () => {
  return (
    <SafeAreaProvider>
      <TabBar />
    </SafeAreaProvider>
  );
};

export default App;
