import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { EmployeeStack } from '../navigation/stacks/EmployeeStack';
import { AdminStack } from '../navigation/stacks/AdminStack';

const storage = new MMKV();

export function HomeScreen() {
  const [role, setRole] = useState<'admin' | 'employee' | null>(null);
  useEffect(() => {
    setRole(storage.getString('role') as 'admin' | 'employee');
  }, []);
  if (!role) return <View />;
  if (role === 'admin') return <AdminStack />;
  return <EmployeeStack />;
}
