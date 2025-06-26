/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './src/theme/ThemeProvider';
import { RootNavigator } from './src/navigation/RootNavigator';
import { useColorScheme, View } from 'react-native';
import { AuthProvider } from './src/store/useAuth';
import { ThemeToggle } from './src/components/ThemeToggle';
import { enableScreens } from 'react-native-screens';
import { useEffect } from 'react';
import { MMKV } from 'react-native-mmkv';
import { seedEmployees } from './src/api/employees';

const queryClient = new QueryClient();
const storage = new MMKV();

function App() {
  useEffect(() => {
    const local = storage.getString('employees_data');
    if (!local) {
      seedEmployees();
    }
  }, []);
  enableScreens();
  const scheme = useColorScheme();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider scheme={scheme || 'light'}>
        <AuthProvider>
          <View style={{ flex: 1 }}>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
            <ThemeToggle />
          </View>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
