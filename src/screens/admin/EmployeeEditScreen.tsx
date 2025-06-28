import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useTheme } from '../../theme';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Employee, updateEmployee } from '../../api/employees';
import { Header } from '../../components/Header';
import { useAuth } from '../../store/useAuth';
import { ThemeToggle } from '../../components/ThemeToggle';

const { width } = Dimensions.get('window');

type Params = { mode: 'edit' | 'add'; employee?: Employee };

function isValidEmail(email: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

function isValidTime(time: string) {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
}

export function EmployeeEditScreen() {
  const { theme } = useTheme();
  const { logout } = useAuth();
  const route = useRoute();
  const navigation = useNavigation();
  const { mode, employee } = route.params as Params;
  const [name, setName] = useState(employee?.name || '');
  const [email, setEmail] = useState(employee?.email || '');
  const [role, setRole] = useState(employee?.role || '');
  const [arrivalTime, setArrivalTime] = useState(employee?.arrivalTime || '');
  const [error, setError] = useState('');

  function handleSave() {
    setError('');
    if (!name || !email || !role || !arrivalTime) {
      setError('All fields are required');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Invalid email format');
      return;
    }
    if (!isValidTime(arrivalTime)) {
      setError('Arrival time must be HH:mm');
      return;
    }
    updateEmployee({
      id: employee?.id || Date.now(),
      name,
      email,
      role,
      arrivalTime,
    });
    navigation.goBack();
  }

  const isDisabled =
    !name ||
    !email ||
    !role ||
    !arrivalTime ||
    !isValidEmail(email) ||
    !isValidTime(arrivalTime);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Header
        showAvatar={false}
        showLogoutBtn={false}
        title={mode === 'edit' ? 'Edit Employee' : 'Add Employee'}
        onLogout={logout}
      >
        <ThemeToggle />
      </Header>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.background,
        }}
        keyboardShouldPersistTaps="always"
      >
        <View
          style={{
            width: width > 400 ? 380 : width - 32,
            maxWidth: 420,
            padding: 0,
            alignItems: 'center',
          }}
        >
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name"
            placeholderTextColor={theme.placeholder}
            style={{
              width: '100%',
              height: 48,
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 10,
              marginBottom: 16,
              color: theme.text,
              paddingHorizontal: 16,
              backgroundColor: theme.inputBg,
              fontSize: 16,
            }}
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={theme.placeholder}
            style={{
              width: '100%',
              height: 48,
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 10,
              marginBottom: 16,
              color: theme.text,
              paddingHorizontal: 16,
              backgroundColor: theme.inputBg,
              fontSize: 16,
            }}
          />
          <TextInput
            value={role}
            onChangeText={setRole}
            placeholder="Role"
            placeholderTextColor={theme.placeholder}
            style={{
              width: '100%',
              height: 48,
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 10,
              marginBottom: 16,
              color: theme.text,
              paddingHorizontal: 16,
              backgroundColor: theme.inputBg,
              fontSize: 16,
            }}
          />
          <TextInput
            value={arrivalTime}
            onChangeText={setArrivalTime}
            placeholder="Arrival Time (HH:mm)"
            placeholderTextColor={theme.placeholder}
            style={{
              width: '100%',
              height: 48,
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 10,
              marginBottom: 8,
              color: theme.text,
              paddingHorizontal: 16,
              backgroundColor: theme.inputBg,
              fontSize: 16,
            }}
          />
          {!!error && (
            <Text
              style={{
                color: theme.error,
                marginBottom: 10,
                marginTop: 2,
                width: '100%',
              }}
            >
              {error}
            </Text>
          )}
          <TouchableOpacity
            onPress={handleSave}
            style={{
              backgroundColor: isDisabled ? theme.disabled : theme.primary,
              paddingVertical: 14,
              width: '100%',
              borderRadius: 10,
              shadowColor: theme.shadow,
              shadowOpacity: 0.12,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
              marginTop: 8,
              marginBottom: 8,
              alignItems: 'center',
            }}
            disabled={isDisabled}
            activeOpacity={0.85}
          >
            <Text
              style={{
                color: isDisabled ? theme.disabledText : theme.card,
                fontSize: 18,
                fontWeight: '700',
                letterSpacing: 0.5,
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
