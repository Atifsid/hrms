import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useTheme } from '../../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from 'react-native-geolocation-service';
import { MMKV } from 'react-native-mmkv';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

const storage = new MMKV();
const OFFICE_KEY = 'office_coords';
const { width } = Dimensions.get('window');

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

async function requestLocationPermission(): Promise<boolean> {
  const perm =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  let result = await check(perm);
  if (result === RESULTS.DENIED) {
    result = await request(perm);
  }

  if (result === RESULTS.GRANTED) return true;
  if (result === RESULTS.BLOCKED) openSettings();
  return false;
}

export function AttendanceScreen() {
  const { theme } = useTheme();
  const [step, setStep] = useState<'idle' | 'biometric' | 'gps' | 'done'>(
    'idle',
  );
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [distance, setDistance] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [officeCoords, setOfficeCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    async function getLocation() {
      const coords = storage.getString(OFFICE_KEY);
      if (!coords) {
        setError('Office location not set. Please contact admin.');
        setLoading(false);
        return;
      }

      let parsed;
      try {
        parsed = JSON.parse(coords);
      } catch {
        setError('Invalid office location data. Please contact admin.');
        setLoading(false);
        return;
      }

      setOfficeCoords(parsed);

      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setError(
          'Location permission denied. Please enable location permissions in settings.',
        );
        setLoading(false);
        return;
      }

      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization('whenInUse');
      }

      Geolocation.getCurrentPosition(
        pos => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          setLocation({ lat, lon });
          const dist = getDistanceFromLatLonInMeters(
            lat,
            lon,
            parsed.latitude,
            parsed.longitude,
          );
          setDistance(dist);
          setLoading(false);
        },
        err => {
          setError('Unable to get location. Please enable location services.');
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
      );
    }

    getLocation();
  }, []);

  function handleAttendance() {
    if (!canCheckIn) return;
    setStep('biometric');
    setTimeout(() => setStep('gps'), 1200);
    setTimeout(() => setStep('done'), 2400);
  }

  const canCheckIn = distance !== null && distance <= 200;

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background,
      }}
    >
      <View
        style={{
          width: width > 400 ? 380 : width - 32,
          maxWidth: 420,
          padding: 0,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: theme.text,
            fontSize: 24,
            fontWeight: '700',
            marginBottom: 24,
            letterSpacing: 0.5,
          }}
        >
          Attendance
        </Text>
        {loading && <ActivityIndicator color={theme.primary} size="large" />}
        {!loading && error && (
          <Text style={{ color: theme.error, marginBottom: 16 }}>{error}</Text>
        )}
        {!loading && !error && distance !== null && (
          <Text
            style={{
              color: canCheckIn ? theme.primary : theme.error,
              marginBottom: 16,
            }}
          >
            {canCheckIn
              ? `Within office: ${distance.toFixed(1)}m`
              : `Too far from office: ${distance.toFixed(1)}m`}
          </Text>
        )}
        {step === 'idle' && !loading && canCheckIn && (
          <TouchableOpacity
            onPress={handleAttendance}
            style={{
              backgroundColor: theme.primary,
              paddingVertical: 14,
              width: '100%',
              borderRadius: 10,
              shadowColor: theme.shadow,
              shadowOpacity: 0.12,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
              marginTop: 8,
              marginBottom: 8,
              alignItems: 'center',
            }}
            activeOpacity={0.85}
          >
            <Text
              style={{
                color: theme.card,
                fontSize: 18,
                fontWeight: '700',
                letterSpacing: 0.5,
              }}
            >
              Set Attendance
            </Text>
          </TouchableOpacity>
        )}
        {step === 'biometric' && (
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <MaterialCommunityIcons
              name="fingerprint"
              size={64}
              color={theme.primary}
            />
            <Text style={{ color: theme.text, fontSize: 18, marginTop: 16 }}>
              Biometric Verification...
            </Text>
          </View>
        )}
        {step === 'gps' && (
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <ActivityIndicator color={theme.primary} size="large" />
            <Text style={{ color: theme.text, fontSize: 18, marginTop: 16 }}>
              Checking location...
            </Text>
          </View>
        )}
        {step === 'done' && (
          <Text
            style={{ color: theme.primary, fontSize: 20, marginBottom: 24 }}
          >
            Attendance Marked
          </Text>
        )}
        {!canCheckIn && !loading && !error && (
          <Text style={{ color: theme.error, marginTop: 24, marginBottom: 24 }}>
            You must be within 200m of office to check in.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
