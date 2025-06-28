import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import { useTheme } from '../../theme';
import { MMKV } from 'react-native-mmkv';
import Geolocation from 'react-native-geolocation-service';
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

export function SetOfficeLocationScreen() {
  const { theme } = useTheme();
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [message, setMessage] = useState('');
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState('');

  useEffect(() => {
    const coords = storage.getString(OFFICE_KEY);
    if (coords) {
      const { latitude, longitude } = JSON.parse(coords);
      setLat(latitude.toString());
      setLon(longitude.toString());
    }
  }, []);

  function handleSave() {
    if (!lat || !lon || isNaN(Number(lat)) || isNaN(Number(lon))) {
      setMessage('Please enter valid coordinates');
      return;
    }
    storage.set(OFFICE_KEY, JSON.stringify({ latitude: lat, longitude: lon }));
    setMessage('Office location saved!');
  }

  async function handleUseCurrentLocation() {
    setLocError('');
    setLocLoading(true);
    const perm =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    let result = await check(perm);
    if (result === RESULTS.DENIED) {
      result = await request(perm);
    }
    if (result === RESULTS.GRANTED) {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization('whenInUse');
      }
      Geolocation.getCurrentPosition(
        pos => {
          setLat(pos.coords.latitude.toString());
          setLon(pos.coords.longitude.toString());
          setLocLoading(false);
        },
        err => {
          setLocError(
            'Unable to get location. Please enable location services.',
          );
          setLocLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
      );
    } else {
      if (result === RESULTS.BLOCKED) openSettings();
      setLocError(
        'Location permission denied. Please enable location permissions in settings.',
      );
      setLocLoading(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: theme.background,
      }}
      keyboardShouldPersistTaps="always"
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
          Set Office Location
        </Text>
        <TextInput
          value={lat}
          onChangeText={setLat}
          placeholder="Latitude"
          placeholderTextColor={theme.placeholder}
          keyboardType="numeric"
          style={{
            width: '100%',
            height: 48,
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 10,
            marginBottom: 16,
            color: theme.text,
            paddingHorizontal: 16,
            backgroundColor: theme.inputBg,
            fontSize: 16,
          }}
        />
        <TextInput
          value={lon}
          onChangeText={setLon}
          placeholder="Longitude"
          placeholderTextColor={theme.placeholder}
          keyboardType="numeric"
          style={{
            width: '100%',
            height: 48,
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 10,
            marginBottom: 8,
            color: theme.text,
            paddingHorizontal: 16,
            backgroundColor: theme.inputBg,
            fontSize: 16,
          }}
        />
        <TouchableOpacity
          onPress={handleUseCurrentLocation}
          style={{
            backgroundColor: '#6c63ff',
            paddingVertical: 12,
            width: '100%',
            borderRadius: 10,
            marginTop: 4,
            marginBottom: 8,
            alignItems: 'center',
            opacity: locLoading ? 0.7 : 1,
          }}
          activeOpacity={0.85}
          disabled={locLoading}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
            {locLoading
              ? 'Getting current location...'
              : 'Use Current Location'}
          </Text>
        </TouchableOpacity>
        {!!locError && (
          <Text style={{ color: 'red', marginBottom: 8 }}>{locError}</Text>
        )}
        <TouchableOpacity
          onPress={handleSave}
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
            Save
          </Text>
        </TouchableOpacity>
        {!!message && (
          <Text
            style={{ color: theme.primary, marginTop: 8, marginBottom: 18 }}
          >
            {message}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
