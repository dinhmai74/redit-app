import React, {ReactNode} from 'react';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';
type Props = {
  children: ReactNode;
};

export const Provider = ({children}: Props) => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      {children}
    </SafeAreaProvider>
  );
};
