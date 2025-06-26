import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../../screens/HomeScreen';
import { AttendanceScreen } from '../../screens/attendance/AttendanceScreen';

const Stack = createStackNavigator();

export function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
    </Stack.Navigator>
  );
}
