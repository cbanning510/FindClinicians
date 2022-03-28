import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Screens/Home';
import Details from './Screens/Details';
import Login from './Screens/Login';
import {store} from './store';
import {Provider} from 'react-redux';
import {useSelector, useDispatch} from 'react-redux';

import {StyleSheet} from 'react-native';

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

  useEffect(() => {
    console.log('location is ', location);
  }, [location]);

  return (
    <NavigationContainer>
      {authToken ? <AppStack /> : <AuthStack />}
      {/* <AppStack /> */}
      {/* <AuthStack /> */}
    </NavigationContainer>
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
