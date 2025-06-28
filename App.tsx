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
import Geolocation from 'react-native-geolocation-service';
import { Platform } from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

const queryClient = new QueryClient();
const storage = new MMKV();
const OFFICE_KEY = 'office_coords';

function App() {
  useEffect(() => {
    const local = storage.getString('employees_data');
    if (!local) {
      seedEmployees();
    }

    const office = storage.getString(OFFICE_KEY);
    if (!office) {
      (async () => {
        const perm =
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
        let result = await check(perm);
        if (result === RESULTS.DENIED) {
          result = await request(perm);
        }
        if (result === RESULTS.GRANTED) {
          if (Platform.OS === 'ios') {
            Geolocation.requestAuthorization('whenInUse');
          }
          Geolocation.getCurrentPosition(
            pos => {
              storage.set(
                OFFICE_KEY,
                JSON.stringify({
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude,
                }),
              );
            },
            err => {},
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
          );
        } else {
          if (result === RESULTS.BLOCKED) openSettings();
        }
      })();
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
          </View>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
