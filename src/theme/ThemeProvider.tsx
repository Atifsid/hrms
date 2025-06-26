import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { MMKV } from 'react-native-mmkv';

const light = {
  background: '#F4F7FA',
  card: '#FFFFFF',
  text: '#1A2233',
  primary: '#2563eb',
  primaryGradient: ['#2563eb', '#60a5fa'],
  secondary: '#f59e42',
  accent: '#10b981',
  border: '#CBD5E1',
  error: '#ef4444',
  shadow: 'rgba(30, 41, 59, 0.08)',
  inputBg: '#F7FAFC',
  placeholder: '#8A94A6',
  disabled: '#B0B8C1',
  disabledText: '#FFFFFF',
};

const dark = {
  background: '#181C24',
  card: '#232A36',
  text: '#F3F6FB',
  primary: '#60a5fa',
  primaryGradient: ['#60a5fa', '#2563eb'],
  secondary: '#fbbf24',
  accent: '#34d399',
  border: '#626469',
  error: '#f87171',
  shadow: 'rgba(0,0,0,0.25)',
  inputBg: '#232A36',
  placeholder: '#A0AEC0',
  disabled: '#3A4250',
  disabledText: '#A0AEC0',
};

const storage = new MMKV();
const THEME_KEY = 'theme_mode';

type ThemeContextType = {
  theme: typeof light;
  scheme: 'light' | 'dark';
  setTheme: (scheme: 'light' | 'dark') => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: light,
  scheme: 'light',
  setTheme: () => {},
});

type Props = { children: ReactNode; scheme?: string };

export function ThemeProvider({ children, scheme }: Props) {
  const [mode, setMode] = useState<'light' | 'dark'>(
    scheme === 'dark' ? 'dark' : 'light',
  );
  useEffect(() => {
    const stored = storage.getString(THEME_KEY);
    if (stored === 'light' || stored === 'dark') setMode(stored);
  }, []);
  function setTheme(s: 'light' | 'dark') {
    setMode(s);
    storage.set(THEME_KEY, s);
  }
  const theme = mode === 'dark' ? dark : light;
  return (
    <ThemeContext.Provider value={{ theme, scheme: mode, setTheme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
