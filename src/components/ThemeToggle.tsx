import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../theme';

export function ThemeToggle() {
  const { scheme, setTheme, theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => setTheme(scheme === 'dark' ? 'light' : 'dark')}
      style={{
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderColor: theme.border,
        borderWidth: 1,
        borderRadius: 20,
        marginLeft: 10,
      }}
    >
      <Text style={{ color: theme.primary, fontWeight: 'bold' }}>
        {scheme === 'dark' ? 'Light' : 'Dark'} Mode
      </Text>
    </TouchableOpacity>
  );
}
