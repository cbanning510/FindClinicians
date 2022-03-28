import React, {useState, useEffect} from 'react';
import GetLocation from 'react-native-get-location';
import axios from 'axios';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const BASE_URL = 'https://www.mapquestapi.com/geocoding/v1/reverse?key=';
const API_KEY = 'MkBymDR3RGCyXQ9sVyHnbaUFzLhMJAz2';

const App = () => {
  const [location, setLocation] = useState(null);
  const [clinicianState, setClinicianState] = useState(null);

  const sendGetRequest = async () => {
    try {
      const resp = await axios.get(
        `${BASE_URL}${API_KEY}&location=${location.latitude},${location.longitude}`,
      );
      setClinicianState(resp.data.results[0].locations[0].adminArea3);
    } catch (err) {
      console.error(err);
    }
  };

  const getLocation = () => {
    GetLocation?.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        setLocation(location);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Device Location: </Text>
      {location && <Text>{`${location.latitude}, ${location.latitude}`}</Text>}
      <Text>State: </Text>
      {location && <Text>{`${clinicianState}`}</Text>}

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={getLocation}
        style={styles.button}>
        <Text style={styles.buttonText}>Show Lat, Long</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={sendGetRequest}
        style={styles.button}>
        <Text style={styles.buttonText}>Show Lat, Long</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    margin: 12,
    width: 140,
    backgroundColor: 'dodgerblue',
    borderRadius: 6,
  },
});

export default App;
