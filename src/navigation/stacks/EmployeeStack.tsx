import { createStackNavigator } from '@react-navigation/stack';
import { EmployeeHome } from '../../screens/employee/EmployeeHome';
import { EmployeeDetailsScreen } from '../../screens/employee/EmployeeDetailsScreen';

const Stack = createStackNavigator();

export function EmployeeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EmployeeHome" component={EmployeeHome} />
      <Stack.Screen name="EmployeeDetails" component={EmployeeDetailsScreen} />
    </Stack.Navigator>
  );
}
