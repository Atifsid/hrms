import { createStackNavigator } from '@react-navigation/stack';
import { EmployeeListScreen } from '../../screens/admin/EmployeeListScreen';
import { EmployeeEditScreen } from '../../screens/admin/EmployeeEditScreen';
import { SetOfficeLocationScreen } from '../../screens/admin/SetOfficeLocationScreen';
import { AdminHome } from '../../screens/admin/AdminHome';

const Stack = createStackNavigator();

export function AdminStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="AdminHome"
    >
      <Stack.Screen name="AdminHome" component={AdminHome} />
      <Stack.Screen name="EmployeeList" component={EmployeeListScreen} />
      <Stack.Screen name="EmployeeEdit" component={EmployeeEditScreen} />
      <Stack.Screen
        name="SetOfficeLocation"
        component={SetOfficeLocationScreen}
      />
    </Stack.Navigator>
  );
}
