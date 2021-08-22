import "react-native-gesture-handler";
import { registerRootComponent } from "expo";

import App from "./src/App";
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC5YilA8JuejPHtFDdqGdT85-rBpl_DCvs",
  authDomain: "recipe-lab-96d4d.firebaseapp.com",
  projectId: "recipe-lab-96d4d",
  storageBucket: "recipe-lab-96d4d.appspot.com",
  messagingSenderId: "466072557074",
  appId: "1:466072557074:web:4d90c4892abfd98929aacb",
};
firebase.initializeApp(firebaseConfig);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
