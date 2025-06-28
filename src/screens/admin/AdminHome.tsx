import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../theme';
import { ThemeToggle } from '../../components/ThemeToggle';
import { SetOfficeLocationScreen } from './SetOfficeLocationScreen';
import { AttendanceScreen } from '../attendance/AttendanceScreen';
import { EmployeeListScreen } from './EmployeeListScreen';
import { Header } from '../../components/Header';
import { useAuth } from '../../store/useAuth';

export function AdminHome() {
  const { theme } = useTheme();
  const { logout } = useAuth();
  const [segment, setSegment] = useState<'office' | 'attendance' | 'employees'>(
    'office',
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Header title="HRMS" onLogout={logout}>
        <ThemeToggle />
      </Header>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          flexGrow: 0,
          flexShrink: 0,
          height: 40,
          marginTop: 20,
          marginBottom: 0,
          paddingTop: 0,
          paddingBottom: 0,
        }}
        contentContainerStyle={{
          paddingHorizontal: 12,
          marginTop: 0,
          marginBottom: 0,
          paddingTop: 0,
          paddingBottom: 0,
        }}
      >
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity
            onPress={() => setSegment('office')}
            style={{
              backgroundColor:
                segment === 'office' ? theme.primary : theme.card,
              height: 38,
              minWidth: 110,
              paddingVertical: 0,
              paddingHorizontal: 14,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: segment === 'office' ? theme.primary : 'transparent',
              shadowOpacity: segment === 'office' ? 0.12 : 0,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
            }}
          >
            <Text
              style={{
                color: segment === 'office' ? theme.card : theme.text,
                fontWeight: '600',
                fontSize: 15,
                textAlign: 'center',
              }}
            >
              Office Location
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSegment('attendance')}
            style={{
              backgroundColor:
                segment === 'attendance' ? theme.primary : theme.card,
              height: 38,
              minWidth: 110,
              paddingVertical: 0,
              paddingHorizontal: 14,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor:
                segment === 'attendance' ? theme.primary : 'transparent',
              shadowOpacity: segment === 'attendance' ? 0.12 : 0,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
            }}
          >
            <Text
              style={{
                color: segment === 'attendance' ? theme.card : theme.text,
                fontWeight: '600',
                fontSize: 15,
                textAlign: 'center',
              }}
            >
              Attendance
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSegment('employees')}
            style={{
              backgroundColor:
                segment === 'employees' ? theme.primary : theme.card,
              height: 38,
              minWidth: 110,
              paddingVertical: 0,
              paddingHorizontal: 14,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor:
                segment === 'employees' ? theme.primary : 'transparent',
              shadowOpacity: segment === 'employees' ? 0.12 : 0,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
            }}
          >
            <Text
              style={{
                color: segment === 'employees' ? theme.card : theme.text,
                fontWeight: '600',
                fontSize: 15,
                textAlign: 'center',
              }}
            >
              Employees
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ flex: 1, marginTop: 30 }}>
        {segment === 'office' && <SetOfficeLocationScreen />}
        {segment === 'attendance' && <AttendanceScreen />}
        {segment === 'employees' && <EmployeeListScreen />}
      </View>
    </View>
  );
}
