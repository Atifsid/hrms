import { useEffect, useState } from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { useTheme } from '../../theme';

const storage = new MMKV();
const { width } = Dimensions.get('window');

export function EmployeeDetailsScreen() {
  const { theme } = useTheme();
  const [employee, setEmployee] = useState<{
    name: string;
    email: string;
    role: string;
    arrivalTime: string;
  } | null>(null);
  useEffect(() => {
    const data = storage.getString('employee');
    if (data) setEmployee(JSON.parse(data));
  }, []);
  if (!employee) return <View />;
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background,
      }}
    >
      <View
        style={{
          width: width > 400 ? 380 : width - 32,
          maxWidth: 420,
          padding: 0,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: theme.text,
            fontSize: 24,
            fontWeight: '700',
            marginBottom: 24,
            letterSpacing: 0.5,
          }}
        >
          My Details
        </Text>
        <Text
          style={{
            color: theme.text,
            fontSize: 20,
            marginBottom: 8,
            fontWeight: '600',
          }}
        >
          Name: <Text style={{ color: theme.primary }}>{employee.name}</Text>
        </Text>
        <Text style={{ color: theme.secondary, fontSize: 18, marginBottom: 8 }}>
          Email: {employee.email}
        </Text>
        <Text style={{ color: theme.accent, fontSize: 18, marginBottom: 8 }}>
          Role: {employee.role}
        </Text>
        <Text style={{ color: theme.text, fontSize: 18, marginBottom: 24 }}>
          Arrival: {employee.arrivalTime}
        </Text>
      </View>
    </ScrollView>
  );
}
