import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Button,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';

import axios from 'axios';

import ClinicianCard from '../Components/ClinicianCard';
import UserDetail from '../Components/UserDetail';
import {useSelector} from 'react-redux';

import clinicians from '../clinicians.json';
const alphabetizedClinicians = clinicians.sort((a, b) =>
  a.firstName > b.firstName ? 1 : -1,
);

const BASE_URL = 'https://www.mapquestapi.com/geocoding/v1/reverse?key=';
const API_KEY = 'nyqrV5Sb6Ycc2d9H51kIt49mGQwCRs4w';

import {AuthContext} from '../Components/context';

const Home = () => {
  const [deviceState, setDeviceState] = useState(null);
  const [loading, setLoading] = useState(false);
  const {signOut} = useContext(AuthContext);
  const [stateClinicians, setStateClinicians] = useState(null);
  const favorite = useSelector(state => state.favorite.favorite);
  const location = useSelector(state => state.location.location);

  function mapAsync(array, callbackfn) {
    return Promise.all(array.map(callbackfn));
  }

  async function filterAsync(array, callbackfn) {
    const filterMap = await mapAsync(array, callbackfn);
    return array.filter((value, index) => filterMap[index]);
  }

  useEffect(() => {
    sendGetRequest();
    filterCliniciansByState();
  }, [location]);

  const filterCliniciansByState = async () => {
    setLoading(true);
    const newClinicians = await Promise.all(
      alphabetizedClinicians.map(item => {
        return getState(item);
      }),
    );

    const finalClinicians = alphabetizedClinicians.filter((c, i) => {
      return newClinicians[i] === true;
    });
    setStateClinicians(finalClinicians);
    setLoading(false);
  };

  const sendGetRequest = async () => {
    try {
      const resp = await axios.get(
        `${BASE_URL}${API_KEY}&location=${location.latitude},${location.longitude}`,
      );

      setDeviceState(resp.data.results[0].locations[0].adminArea3);
    } catch (err) {
      console.error(err);
    }
  };

  const getState = async item => {
    const latitude = item.location.split(',')[0].replace(/[^\d.-]/g, '');
    const longitude = item.location.split(',')[1].replace(/[^\d.-]/g, '');
    try {
      const resp = await axios.get(
        `${BASE_URL}${API_KEY}&location=${latitude},${longitude}`,
      );
      return resp.data.results[0].locations[0].adminArea3 === 'MO';
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    signOut();
  };

  const renderFavorite = () => {
    const favItem = clinicians.find(c => c.id === favorite);
    return (
      <>
        <View style={styles.favoriteContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: 24,
                height: 24,
              }}
              source={require('../assets/closedHeart-100.png')}
              resizeMode={'cover'}
            />
            <Text style={styles.favorite}>Favorite Clinician:</Text>
          </View>
          <View>
            <UserDetail title="name" text={`${favItem.fullName}`} />
            <UserDetail title="email" text={`${favItem.email}`} />
            <UserDetail title="phone" text={`${favItem.phone}`} />
          </View>
        </View>
      </>
    );
  };

  const renderItem = ({item}) => {
    return <ClinicianCard item={item} />;
  };

  return loading ? (
    <View style={styles.loading}>
      <Text style={styles.loadingText}>Loading Clinicians...</Text>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {!favorite && <Text style={styles.title}>Clinicians</Text>}
        {favorite && renderFavorite()}
        {favorite && <Text style={styles.title}>Clinicians</Text>}

        <FlatList
          data={stateClinicians}
          keyExtractor={(item, index) => item + index.toString()}
          enableEmptySections={true}
          renderItem={renderItem}
          contentContainerStyle={{padding: 40, paddingTop: 0}}
        />
      </View>
      <Button title="Logout" onPress={logout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginBottom: 20,
  },
  favoriteContainer: {
    padding: 8,
    backgroundColor: 'lightblue',
    alignSelf: 'center',
    width: 360,
    marginTop: 20,
    borderRadius: 6,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    marginVertical: 14,
  },
  favorite: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  loadButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    width: 140,
    backgroundColor: 'dodgerblue',
    borderRadius: 6,
  },
  buttonCopy: {
    color: 'white',
    fontSize: 16,
  },
});

export default Home;
