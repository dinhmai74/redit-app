import {RootNavigator} from 'navigators/RootNavigator';
import {Provider} from 'Provider';
import * as React from 'react';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <Provider>
      <RootNavigator />
    </Provider>
  );
}
