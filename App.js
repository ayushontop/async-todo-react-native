import * as React from 'react';
import { Text, View, StyleSheet,StatusBar } from 'react-native';


// You can import from local files
import Main from './components/main';
import Header from "./components/Header";


export default function App() {
  return (
    <View style = {styles.container}>
    <StatusBar barStyle={"light-content"} />
    <Header />
    <Main />

    </View>
  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edf7f7",
  },
  
});
