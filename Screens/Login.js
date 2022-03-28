//import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useContext, useState} from 'react';
import GetLocation from 'react-native-get-location';

import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector, useDispatch} from 'react-redux';
import {setLocation} from './locationSlice';
import {setAuthToken} from './authSlice';

//import {AuthContext} from '../components/context';

const Login = () => {
  const [email, onChangeText] = React.useState(null);
  const [password, onChangeNumber] = React.useState(null);
  const dispatch = useDispatch();
  const location = useSelector(state => state);

  //const {signIn} = useContext(AuthContext);

  const getLocation = () => {
    GetLocation?.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log('location ', location);
        dispatch(setLocation(location));
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  const handleLogin = () => {
    dispatch(setAuthToken('drg'));
    //signIn(email, password);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'dodgerblue',
      }}>
      <KeyboardAwareScrollView>
        <Text style={{alignSelf: 'center', fontSize: 26, marginTop: 60}}>
          MyClinicians
        </Text>
        <View style={{marginTop: 100}}>
          <Text style={{paddingLeft: 12}}>Email:</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            placeholder="email"
            value={email}
            autoCapitalize="none"
          />
          <Text style={{paddingLeft: 12}}>Password:</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={password}
            placeholder="password"
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            borderWidth: 1,
            alignSelf: 'center',
            borderColor: 'black',
            padding: 6,
            paddingHorizontal: 10,
            marginTop: 16,
            borderRadius: 4,
            backgroundColor: 'white',
            width: 80,
          }}>
          <Text style={{alignSelf: 'center'}}>Login</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 220,
    margin: 12,
    marginTop: 6,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: 'white',
  },
});
