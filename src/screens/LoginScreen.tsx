import { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import { useAuth } from '../store/useAuth';
import { MMKV } from 'react-native-mmkv';
import { useTheme } from '../theme';
import { getEmployeeByUsername } from '../api/employees';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const storage = new MMKV();
const { width } = Dimensions.get('window');

export function LoginScreen() {
  const { setIsAuthenticated } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'employee'>('employee');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  async function handleLogin() {
    setError('');
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }
    setLoading(true);
    if (role === 'employee') {
      const emp = await getEmployeeByUsername(username);
      if (!emp) {
        setError('Employee not found');
        setLoading(false);
        return;
      }
      storage.set('employee', JSON.stringify(emp));
    }
    storage.set('role', role);
    setIsAuthenticated(true);
    setLoading(false);
  }

  const isDisabled = !username || !password || loading;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: width > 400 ? 360 : width - 32,
          backgroundColor: theme.card,
          borderRadius: 20,
          shadowColor: theme.shadow,
          shadowOpacity: 0.18,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 4 },
          elevation: 6,
          padding: 0,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '100%',
            height: 80,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: theme.primary,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons
            name="account-circle"
            size={48}
            color={theme.card}
            style={{ marginTop: 12 }}
          />
        </View>
        <Text
          style={{
            color: theme.text,
            fontSize: 26,
            marginTop: 18,
            marginBottom: 18,
            fontWeight: '700',
            letterSpacing: 1,
          }}
        >
          Login
        </Text>
        <TextInput
          placeholder="Username"
          placeholderTextColor={theme.placeholder}
          value={username}
          onChangeText={setUsername}
          style={{
            width: '85%',
            height: 48,
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 12,
            marginBottom: 14,
            color: theme.text,
            paddingHorizontal: 16,
            backgroundColor: theme.inputBg,
            fontSize: 16,
          }}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={theme.placeholder}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{
            width: '85%',
            height: 48,
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 12,
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
              width: '85%',
            }}
          >
            {error}
          </Text>
        )}
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 18,
            width: '85%',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            onPress={() => setRole('admin')}
            style={{
              backgroundColor: role === 'admin' ? theme.primary : theme.card,
              paddingVertical: 10,
              paddingHorizontal: 18,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: role === 'admin' ? theme.primary : theme.border,
              marginRight: 8,
              flex: 1,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: role === 'admin' ? theme.card : theme.text,
                fontWeight: '600',
              }}
            >
              Admin
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setRole('employee')}
            style={{
              backgroundColor: role === 'employee' ? theme.primary : theme.card,
              paddingVertical: 10,
              paddingHorizontal: 18,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: role === 'employee' ? theme.primary : theme.border,
              flex: 1,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: role === 'employee' ? theme.card : theme.text,
                fontWeight: '600',
              }}
            >
              Employee
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: isDisabled ? theme.disabled : theme.primary,
            paddingVertical: 14,
            width: '85%',
            borderRadius: 12,
            shadowColor: theme.shadow,
            shadowOpacity: 0.15,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 2 },
            marginTop: 4,
            marginBottom: 24,
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
            {loading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
