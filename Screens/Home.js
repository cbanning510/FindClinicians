import React, {useState, useEffect, useContext} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Button,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';

import GetLocation from 'react-native-get-location';
import axios from 'axios';

import ClinicianCard from '../Components/ClinicianCard';
import UserDetail from '../Components/UserDetail';
import {useSelector, useDispatch} from 'react-redux';
//import {getState} from '../utils/getState';

import clinicians from '../clinicians.json';

const BASE_URL = 'https://www.mapquestapi.com/geocoding/v1/reverse?key=';
const API_KEY = 'MkBymDR3RGCyXQ9sVyHnbaUFzLhMJAz2';

//import {AuthContext} from '../components/context';

const Home = ({navigation}) => {
  const [deviceLocation, setDeviceLocation] = useState(null);
  const [deviceState, setDeviceState] = useState(null);

  //const {signOut, latitude, longitude} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [stateClinicians, setStateClinicians] = useState(null);
  // const favorite = useSelector(state => state.favorite.favorite);
  const location = useSelector(state => state.location.location);
  //console.log('location in Home!!!!!!!!! ', location);
  //const dispatch = useDispatch();

  useEffect(() => {
    console.log('useEffect in Home!!!!!!!!!', location);
    sendGetRequest();
  }, [location]);

  const alphabetizedClinicians = clinicians.sort((a, b) =>
    a.firstName > b.firstName ? 1 : -1,
  );

  // const sendGetRequest = () => {
  //   console.log('kjbasdflkjbasfv');
  // };

  const sendGetRequest = async () => {
    console.log('sendGetREquest!!!! ', location);
    console.log(
      `${BASE_URL}${API_KEY}&location=${location.latitude},${location.longitude}`,
    );
    try {
      const resp = await axios.get(
        `${BASE_URL}${API_KEY}&location=${location.latitude},${location.longitude}`,
      );
      setDeviceState(resp.data.results[0].locations[0].adminArea3);
    } catch (err) {
      console.error(err);
    }
  };

  // const getLocation = () => {
  //   GetLocation?.getCurrentPosition({
  //     enableHighAccuracy: true,
  //     timeout: 15000,
  //   })
  //     .then(location => {
  //       console.log('location ', location);
  //       setDeviceLocation(location);
  //       //sendGetRequest();
  //     })
  //     .catch(error => {
  //       const {code, message} = error;
  //       console.warn(code, message);
  //     });
  // };

  //const main = () => {
  //console.log('main caled!!!!!!!!!!!!!');
  //Geolocation.getCurrentPosition(info => console.log(info));
  //getPosition().then(data => {
  //console.log('data is ', data);
  // setDeviceStateLocation(data.coords.latitude, data.coords.longitude).catch(
  //   err => console.log('setDeviceStateLocation error!!! ', err),
  //);
  // });
  //};

  // async function setDeviceStateLocation(latitude, longitude) {
  //   setLoading(true);
  //   try {
  //     let response = await fetch(
  //       `${BASE_URL}${API_KEY}&format=json&lat=${latitude}&lon=${longitude}`,
  //       {
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     );
  //     try {
  //       let json = await response.json();
  //       setState(json.address.state);
  //     } catch (err) {
  //       console.log('response.json err', err);
  //     }
  //   } catch (err) {
  //     console.log('fetch error!!! ', err);
  //   }
  //   setLoading(false);
  // }

  // useEffect(() => {
  //   getLocation();
  //   if (deviceLocation) {
  //     sendGetRequest();
  //   }
  //   //main();
  //   //filterCliniciansByState();
  // }, []);

  const logout = () => {
    signOut();
  };

  // const renderFavorite = () => {
  //   const favItem = clinicians.find(c => c.id === favorite);
  //   return (
  //     <>
  //       <View style={styles.favoriteContainer}>
  //         <View
  //           style={{
  //             flexDirection: 'row',
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //           }}>
  //           <Image
  //             style={{
  //               width: 24,
  //               height: 24,
  //             }}
  //             source={require('../assets/closedHeart-100.png')}
  //             resizeMode={'cover'}
  //           />
  //           <Text style={styles.favorite}>Favorite Clinician:</Text>
  //         </View>
  //         <View>
  //           <UserDetail title="name" text={`${favItem.fullName}`} />
  //           <UserDetail title="email" text={`${favItem.email}`} />
  //           <UserDetail title="phone" text={`${favItem.phone}`} />
  //         </View>
  //       </View>
  //     </>
  //   );
  // };

  const renderItem = ({item}) => {
    return <ClinicianCard item={item} />;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>Device Location:</Text>
      {location && (
        <>
          <Text>{`${location.latitude}, ${location.longitude}`}</Text>
          <Text>State:</Text>
          <Text>{deviceState}</Text>
        </>
      )}

      <View style={styles.container}>
        {/* {!favorite && <Text style={styles.title}>Clinicians</Text>} */}
        <Text style={styles.title}>Clinicians</Text>
        {/* {favorite && renderFavorite()} */}
        {/* {favorite && <Text style={styles.title}>Clinicians</Text>} */}

        <FlatList
          data={alphabetizedClinicians}
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
