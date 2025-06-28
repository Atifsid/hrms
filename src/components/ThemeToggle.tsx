import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../theme';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

export function ThemeToggle() {
  const { scheme, setTheme, theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => setTheme(scheme === 'dark' ? 'light' : 'dark')}
      style={{
        marginLeft: 10,
      }}
    >
      {scheme === 'light' && (
        <MatIcon name="dark-mode" size={24} color={theme.primary} />
      )}
      {scheme === 'dark' && (
        <Entypo name="light-up" size={24} color={theme.primary} />
      )}
    </TouchableOpacity>
  );
}
