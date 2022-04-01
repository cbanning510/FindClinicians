# FindClinicians

- Installation Instructions:

creds: 

email: test@gmail.com
password: password

run on ios:

- npm install
- cd ios
- pod install
- cd ..
- npx react-native run-ios

run on android:

- open project folder from within Android Studio
- start emulator
- npx react-native run-android

Implementation:

- ask permission, get and store device location at app start
- get persisted credentials from async storage
- if creds exist, go to AppStack (Home screen, Details screen)
- if creds don't exist,go to AuthStack (Login screen)
- Show Flatlist of Clinicians, filtered by state/device location
- If favorite, show card for favorite clinician above list
- Open details page by clicking on clinician card
- Optionally set a favorite on Details card
- use redux to persist favorite, auth

Libraries:

- react-native-async-storage/async-storagee for persisted credentials/token
- react-navigation for... navigation
- react-native-keyboard-aware-scroll-view to keep focused inputs visible
- react-native-get-location to get device location

![Screen Shot 2022-04-01 at 1 50 15 AM](https://user-images.githubusercontent.com/30067876/161203060-c0d2336d-6b07-443e-a675-65b3d915ee1a.png)


403 error means MapQuest limit of 15000 api calls has been reached
