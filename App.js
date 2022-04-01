import React, {useMemo, useEffect, useReducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './Screens/Home';
import Details from './Screens/Details';
import Login from './Screens/Login';
import {store} from './store';
import {Provider} from 'react-redux';
import {useSelector} from 'react-redux';

import {StyleSheet, Alert} from 'react-native';

import {AuthContext} from './Components/context';

const Stack = createNativeStackNavigator();

const BASE_URL = 'https://www.mapquestapi.com/geocoding/v1/reverse?key=';
const API_KEY = 'MkBymDR3RGCyXQ9sVyHnbaUFzLhMJAz2';

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: 'Clinician List'}}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{title: 'Clinician Details'}}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Provider store={store}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </Provider>
  );
};

const App = () => {
  const location = useSelector(state => state.location.location);
  const authToken = useSelector(state => state.auth.authToken);

  const initialState = {
    isLoading: true,
    userToken: null,
    email: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          email: action.email,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          email: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          email: action.email,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialState);

  const authContext = useMemo(
    () => ({
      signIn: async (email, password) => {
        let userToken;
        userToken = null;
        if (email === 'test@gmail.com' && password === 'password') {
          try {
            userToken = 'testToken';
            await AsyncStorage.setItem('userToken', userToken);
          } catch (e) {
            console.log(e);
          }
        } else {
          Alert.alert('invalid password- please try again');
        }
        dispatch({type: 'LOGIN', email: email, token: userToken});
      },
      signOut: async () => {
        try {
          userToken = 'testToken';
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'REGISTER', token: userToken});
    }, 1000);
  }, []);

  return (
    <Provider store={store}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {loginState.userToken ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
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
