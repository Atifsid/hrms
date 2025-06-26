import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (v: boolean) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  function logout() {
    setIsAuthenticated(false);
    storage.clearAll();
  }
  useEffect(() => {
    console.log('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    const stored = storage.getString('isAuthenticated');
    if (stored === 'true') setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    storage.set('isAuthenticated', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
