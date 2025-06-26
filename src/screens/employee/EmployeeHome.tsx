import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { EmployeeStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../store/useAuth';

export function EmployeeHome() {
  const { theme } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<EmployeeStackParamList>>();
  const { logout } = useAuth();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background,
      }}
    >
      <Text style={{ color: theme.text, fontSize: 24, marginBottom: 32 }}>
        Employee Home
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Attendance')}
        style={{
          backgroundColor: theme.primary,
          paddingVertical: 14,
          paddingHorizontal: 40,
          borderRadius: 8,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: theme.card, fontSize: 18 }}>Attendance</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('EmployeeDetails')}
        style={{
          backgroundColor: theme.secondary,
          paddingVertical: 14,
          paddingHorizontal: 40,
          borderRadius: 8,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: theme.card, fontSize: 18 }}>My Details</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={logout}
        style={{
          position: 'absolute',
          bottom: 40,
          backgroundColor: theme.error,
          paddingVertical: 12,
          paddingHorizontal: 40,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: theme.card, fontSize: 18 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
