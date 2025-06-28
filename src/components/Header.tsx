import { View, Text, Pressable } from 'react-native';
import { ReactNode } from 'react';
import { useTheme } from '../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type HeaderProps = {
  title: string;
  onLogout: () => void;
  showAvatar?: boolean;
  children?: ReactNode;
  showLogoutBtn?: boolean;
};

export function Header({
  title,
  onLogout,
  showAvatar = false,
  children,
  showLogoutBtn = true,
}: HeaderProps) {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 18,
        paddingBottom: 18,
        paddingHorizontal: 24,
        backgroundColor: theme.card,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: theme.shadow,
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: '700',
          color: theme.primary,
          letterSpacing: 0.5,
        }}
      >
        {title}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {children}
        {/* {showAvatar && (
          <MaterialCommunityIcons
            name="account-circle"
            size={24}
            color={theme.secondary}
            style={{ marginLeft: 16 }}
          />
        )} */}
        {showLogoutBtn && (
          <Pressable onPress={onLogout} hitSlop={12} style={{ marginLeft: 22 }}>
            <MaterialCommunityIcons
              name="logout"
              size={24}
              color={theme.error}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}
