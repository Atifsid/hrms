import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../theme';
import LinearGradient from 'react-native-linear-gradient';

export function SplashScreen() {
  const { theme } = useTheme();
  return (
    <LinearGradient
      colors={theme.primaryGradient}
      style={styles.container}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 0.9, y: 0.9 }}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.title, { color: theme.card }]}>HRMS</Text>
        <Text style={[styles.tagline, { color: theme.card }]}>
          Empowering Your Workforce
        </Text>
      </View>
      <ActivityIndicator
        size="large"
        color={theme.card}
        style={styles.spinner}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1,
    opacity: 0.8,
    marginBottom: 12,
  },
  spinner: {
    marginBottom: 40,
  },
});
