import * as React from 'react';
import { Appbar } from 'react-native-paper';
import {StyleSheet} from "react-native";

const Header = () => {
  

  return (
    <Appbar.Header dark= {true} style= {styles.header}>
      <Appbar.Content title="MyTodo's" titleStyle={{textAlign: 'center',fontSize: 22}} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#1498f7",
  }
})

export default Header