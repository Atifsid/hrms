import { useState, useEffect } from 'react';
import { useAuth } from '../store/useAuth';
import { AuthStack } from './stacks/AuthStack';
import { AppStack } from './stacks/AppStack';
import { SplashScreen } from '../screens/SplashScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export function RootNavigator() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  if (loading) return <SplashScreen />;
  return isAuthenticated ? <AppStack /> : <AuthStack />;
}
