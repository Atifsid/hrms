import { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AdminStackParamList } from '../../navigation/types';
import { useAuth } from '../../store/useAuth';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();
const OFFICE_KEY = 'office_coords';

export function AdminHome() {
  const { theme } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<AdminStackParamList>>();
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
        Admin Home
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('SetOfficeLocation')}
        style={{
          backgroundColor: theme.primary,
          paddingVertical: 14,
          paddingHorizontal: 40,
          borderRadius: 8,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: theme.card, fontSize: 18 }}>
          Set/Update Office Location
        </Text>
      </TouchableOpacity>
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
        onPress={() => navigation.navigate('EmployeeList')}
        style={{
          backgroundColor: theme.secondary,
          paddingVertical: 14,
          paddingHorizontal: 40,
          borderRadius: 8,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: theme.card, fontSize: 18 }}>
          Manage Employees
        </Text>
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
