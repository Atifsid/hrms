import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import { useTheme } from '../../theme';
import { useAuth } from '../../store/useAuth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MMKV } from 'react-native-mmkv';
import { ThemeToggle } from '../../components/ThemeToggle';
import { Header } from '../../components/Header';

const storage = new MMKV();
const { width } = Dimensions.get('window');

function AttendanceSegment() {
  const { theme } = useTheme();
  const [distance, setDistance] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [canCheckIn, setCanCheckIn] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);

  useEffect(() => {
    async function getLocation() {
      setLoading(true);
      setError('');
      setDistance(null);
      setCanCheckIn(false);
      const coords = storage.getString('office_coords');
      if (!coords) {
        setError('Office location not set. Contact admin.');
        setLoading(false);
        return;
      }
      let parsed;
      try {
        parsed = JSON.parse(coords);
      } catch {
        setError('Invalid office location data.');
        setLoading(false);
        return;
      }
      try {
        const perm = await import('react-native-permissions');
        const geo = await import('react-native-geolocation-service');
        const permission =
          Platform.OS === 'ios'
            ? perm.PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            : perm.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
        let result = await perm.check(permission);
        if (result === perm.RESULTS.DENIED) {
          result = await perm.request(permission);
        }
        if (result !== perm.RESULTS.GRANTED) {
          setError('Location permission denied.');
          setLoading(false);
          return;
        }
        geo.default.getCurrentPosition(
          pos => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            const d = getDistanceFromLatLonInMeters(
              lat,
              lon,
              parsed.latitude,
              parsed.longitude,
            );
            setDistance(d);
            setCanCheckIn(d <= 200);
            setLoading(false);
          },
          err => {
            setError('Unable to get location.');
            setLoading(false);
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
        );
      } catch {
        setError('Location error.');
        setLoading(false);
      }
    }
    getLocation();
  }, [checkedIn]);

  function handleCheckIn() {
    setCheckedIn(true);
  }

  return (
    <View style={{ width: '100%', alignItems: 'center', marginTop: 16 }}>
      <View
        style={{
          width: width > 400 ? 380 : width - 32,
          backgroundColor: theme.card,
          borderRadius: 18,
          padding: 24,
          shadowColor: theme.shadow,
          shadowOpacity: 0.08,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
          marginBottom: 24,
        }}
      >
        <Text
          style={{
            color: theme.text,
            fontSize: 22,
            fontWeight: '700',
            marginBottom: 12,
          }}
        >
          <MaterialCommunityIcons
            name="map-marker-radius"
            size={22}
            color={theme.primary}
          />{' '}
          Attendance
        </Text>
        {loading && (
          <Text style={{ color: theme.primary, marginVertical: 12 }}>
            Checking location...
          </Text>
        )}
        {!loading && error && (
          <Text style={{ color: theme.error, marginVertical: 12 }}>
            {error}
          </Text>
        )}
        {!loading && !error && distance !== null && (
          <Text
            style={{
              color: canCheckIn ? theme.primary : theme.error,
              marginBottom: 12,
            }}
          >
            {canCheckIn
              ? `Within office: ${distance.toFixed(1)}m`
              : `Too far: ${distance.toFixed(1)}m`}
          </Text>
        )}
        {!loading && canCheckIn && !checkedIn && (
          <TouchableOpacity
            onPress={handleCheckIn}
            style={{
              backgroundColor: theme.primary,
              paddingVertical: 14,
              borderRadius: 10,
              alignItems: 'center',
              marginTop: 8,
            }}
          >
            <Text
              style={{ color: theme.card, fontSize: 18, fontWeight: '600' }}
            >
              <MaterialCommunityIcons
                name="fingerprint"
                size={20}
                color={theme.card}
              />{' '}
              Check In
            </Text>
          </TouchableOpacity>
        )}
        {checkedIn && (
          <Text
            style={{ color: theme.accent, marginTop: 12, fontWeight: '600' }}
          >
            <MaterialCommunityIcons
              name="check-circle"
              size={18}
              color={theme.accent}
            />{' '}
            Checked in!
          </Text>
        )}
      </View>
    </View>
  );
}

function DetailsSegment() {
  const { theme } = useTheme();
  const [employee, setEmployee] = useState<any>(null);
  useEffect(() => {
    const data = storage.getString('employee');
    if (data) setEmployee(JSON.parse(data));
  }, []);
  if (!employee) return null;
  return (
    <View style={{ width: '100%', alignItems: 'center', marginTop: 16 }}>
      <View
        style={{
          width: width > 400 ? 380 : width - 32,
          backgroundColor: theme.card,
          borderRadius: 18,
          padding: 24,
          shadowColor: theme.shadow,
          shadowOpacity: 0.08,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
        }}
      >
        <Text
          style={{
            color: theme.text,
            fontSize: 22,
            fontWeight: '700',
            marginBottom: 12,
          }}
        >
          <MaterialCommunityIcons
            name="account"
            size={22}
            color={theme.secondary}
          />{' '}
          My Details
        </Text>
        <Text
          style={{
            color: theme.text,
            fontSize: 18,
            marginBottom: 8,
            fontWeight: '600',
          }}
        >
          Name: <Text style={{ color: theme.primary }}>{employee.name}</Text>
        </Text>
        <Text style={{ color: theme.secondary, fontSize: 16, marginBottom: 8 }}>
          Email: {employee.email}
        </Text>
        <Text style={{ color: theme.accent, fontSize: 16, marginBottom: 8 }}>
          Role: {employee.role}
        </Text>
        <Text style={{ color: theme.text, fontSize: 16, marginBottom: 0 }}>
          Arrival: {employee.arrivalTime}
        </Text>
      </View>
    </View>
  );
}

function getDistanceFromLatLonInMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function EmployeeHome() {
  const { theme } = useTheme();
  const { logout } = useAuth();
  const [segment, setSegment] = useState<'attendance' | 'details'>(
    'attendance',
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Header title="HRMS" onLogout={logout}>
        <ThemeToggle />
      </Header>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 24,
        }}
      >
        <TouchableOpacity
          onPress={() => setSegment('attendance')}
          style={{
            backgroundColor:
              segment === 'attendance' ? theme.primary : theme.card,
            paddingVertical: 10,
            paddingHorizontal: 32,
            borderRadius: 24,
            marginRight: 8,
            shadowColor:
              segment === 'attendance' ? theme.primary : 'transparent',
            shadowOpacity: segment === 'attendance' ? 0.12 : 0,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
          }}
        >
          <Text
            style={{
              color: segment === 'attendance' ? theme.card : theme.text,
              fontWeight: '600',
              fontSize: 16,
            }}
          >
            Attendance
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSegment('details')}
          style={{
            backgroundColor: segment === 'details' ? theme.primary : theme.card,
            paddingVertical: 10,
            paddingHorizontal: 32,
            borderRadius: 24,
            marginLeft: 8,
            shadowColor: segment === 'details' ? theme.primary : 'transparent',
            shadowOpacity: segment === 'details' ? 0.12 : 0,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
          }}
        >
          <Text
            style={{
              color: segment === 'details' ? theme.card : theme.text,
              fontWeight: '600',
              fontSize: 16,
            }}
          >
            My Details
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          paddingBottom: 32,
        }}
      >
        {segment === 'attendance' ? <AttendanceSegment /> : <DetailsSegment />}
      </ScrollView>
    </View>
  );
}
