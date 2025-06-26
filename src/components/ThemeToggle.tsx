import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../theme';

export function ThemeToggle() {
  const { scheme, setTheme, theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => setTheme(scheme === 'dark' ? 'light' : 'dark')}
      style={{
        position: 'absolute',
        top: 24,
        right: 24,
        backgroundColor: theme.card,
        padding: 10,
        borderRadius: 20,
        elevation: 2,
      }}
    >
      <Text style={{ color: theme.primary, fontWeight: 'bold' }}>
        {scheme === 'dark' ? 'Light' : 'Dark'} Mode
      </Text>
    </TouchableOpacity>
  );
}
