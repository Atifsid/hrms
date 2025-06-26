import { View, Text } from 'react-native';
import { useTheme } from '../theme';

export function SplashScreen() {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.primary,
      }}
    >
      <Text
        style={{
          color: theme.card,
          fontSize: 36,
          fontWeight: 'bold',
          letterSpacing: 2,
        }}
      >
        HRMS
      </Text>
    </View>
  );
}
