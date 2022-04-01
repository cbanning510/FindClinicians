import React, {useEffect, useContext} from 'react';
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
import {useDispatch} from 'react-redux';
import {setLocation} from './locationSlice';
import {setAuthToken} from './authSlice';

import {AuthContext} from '../Components/context';

const Login = () => {
  const [email, onChangeText] = React.useState(null);
  const [password, onChangeNumber] = React.useState(null);
  const dispatch = useDispatch();

  const {signIn} = useContext(AuthContext);

  const getLocation = () => {
    GetLocation?.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        dispatch(setLocation(location));
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  const handleLogin = () => {
    dispatch(setAuthToken('drg'));
    signIn(email, password);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <Text style={styles.title}>FindClinicians</Text>
        <View style={{marginTop: 100}}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            placeholder="email"
            value={email}
            autoCapitalize="none"
          />
          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={password}
            placeholder="password"
            secureTextEntry
          />
        </View>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'dodgerblue',
  },
  title: {alignSelf: 'center', fontSize: 26, marginTop: 60},
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
  button: {
    borderWidth: 1,
    alignSelf: 'center',
    borderColor: 'black',
    padding: 6,
    paddingHorizontal: 10,
    marginTop: 16,
    borderRadius: 4,
    backgroundColor: 'white',
    width: 80,
  },
  buttonText: {alignSelf: 'center'},
  label: {paddingLeft: 12},
});
