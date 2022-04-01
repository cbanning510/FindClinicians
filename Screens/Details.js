import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
} from 'react-native';

import UserDetail from '../Components/UserDetail';

import {useSelector, useDispatch} from 'react-redux';
import {setFavorite} from './favoriteSlice';

const BASE_URL = 'https://open.mapquestapi.com/nominatim/v1/reverse.php?key=';
const API_KEY = 'nyqrV5Sb6Ycc2d9H51kIt49mGQwCRs4w';

const Details = ({route, navigation}) => {
  const [address, setAddress] = useState(null);
  const favorite = useSelector(state => state.favorite.favorite);
  const dispatch = useDispatch();

  useEffect(() => {
    getAddress();
  }, []);

  const {
    item: {id, fullName, imageUrl, bio, email, phone, location},
  } = route?.params;

  const updatedimageUrl = imageUrl.replace(/^http:\/\//i, 'https://');

  const isFavorite = favorite === id;

  const getAddress = async () => {
    const latitude = location.split(',')[0].replace(/[^\d.-]/g, '');
    const longitude = location.split(',')[1].replace(/[^\d.-]/g, '');

    try {
      const response = await fetch(
        `${BASE_URL}${API_KEY}&format=json&lat=${latitude}&lon=${longitude}`,
      );
      try {
        const json = await response.json();
        setAddress(json.address);
      } catch (err) {
        console.log('respons.json error ', error);
      }
    } catch (error) {
      console.log('error!!!! ', error);
    }
  };

  const createAddressText = () => {
    console.log('address is ', address);
    const road = address?.road ? address.road : address?.hamlet;
    return `${road}\n${address?.county}\n${address?.state}\n${address?.postcode}\n${address?.country}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.ScrollViewContainer}>
        <View style={styles.titleName}>
          <Text style={styles.titleText}>{fullName}</Text>
          <TouchableOpacity
            onPress={() => dispatch(setFavorite(!isFavorite ? id : null))}>
            <Image
              style={styles.favoriteImage}
              source={
                !isFavorite
                  ? require('../assets/openHeart-100.png')
                  : require('../assets/closedHeart-100.png')
              }
              resizeMode={'cover'}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Image
            style={styles.clinicianImage}
            source={{uri: `${updatedimageUrl}`}}
            resizeMode={'cover'}
          />
        </View>
        <View style={styles.userDetailsContainer}>
          <UserDetail title="name" text={`${fullName}`} />
          <View style={styles.email}>
            <Text style={styles.title}>email: </Text>
            <Text>{email}</Text>
          </View>
          <UserDetail title="phone" text={`${phone}`} />
          <UserDetail title="address" text={createAddressText()} />
          <View style={styles.bio}>
            <Text style={styles.title}>bio: </Text>
            <Text>{bio}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.goBack()}
          style={styles.button}>
          <Text style={styles.buttonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDetailsContainer: {
    width: '90%',
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    alignSelf: 'center',
  },
  titleName: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  email: {flexDirection: 'row', width: '80%', margin: 6},
  bio: {flexDirection: 'row', width: '82%', margin: 6},
  text: {
    fontSize: 16,
  },
  favoriteImage: {
    width: 24,
    height: 24,
  },
  titleText: {
    fontSize: 22,
    margin: 20,
  },
  clinicianImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 60,
    alignSelf: 'center',
  },
  title: {
    fontWeight: '600',
    marginRight: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    width: 140,
    backgroundColor: 'dodgerblue',
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  ScrollViewContainer: {paddingBottom: 60},
});

export default Details;
