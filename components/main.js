import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity,Keyboard } from 'react-native';
import { TextInput, Button,List,Card, Colors} from 'react-native-paper';
import { v4 as uuidv4 } from 'uuid';
import { AsyncStorage,ScrollView } from 'react-native';
import {useState,componentDidMount} from 'react';

import 'react-native-get-random-values';

export default class Main extends React.Component {

arr = []
id = 0
state={
  text: '',
  item:[
    {id: 1 , data: 'loading...'}
    ]
};

addTodo = async ()=>{
  if(this.state.text!==""){
  Keyboard.dismiss();
  this.arr.push({id:uuidv4(), data: this.state.text});
  this.setState({text:""});
  await AsyncStorage.setItem('todos',JSON.stringify(this.arr));

  this.setState(
    {item: JSON.parse(await AsyncStorage.getItem("todos"))}
    )
  }
  
}

//function for loading the todos that are in async storage 
async componentDidMount(){
  let asyncTodos = JSON.parse(await AsyncStorage.getItem("todos"));
  if(asyncTodos === null){
    this.setState(
          {item: [] }
    )
  }
  else{
    this.setState(
          {item: asyncTodos}
    )
  }
    this.arr = this.state.item;
}


//function for deleting the item that has been tapped
async deleteItem(key){
    let newArray = JSON.parse(await AsyncStorage.getItem("todos"));
    this.arr = newArray.filter(item=>{
      return item.id !== key;
    })

    await AsyncStorage.setItem("todos",JSON.stringify(this.arr));
    this.setState(
          {item: this.arr}
    )

    
  
}
 


render(){
  let renderList= '';
  
  
  if(this.state.item.length>0  ){
    renderList = this.state.item.map((item)=>{
    return(
      <View key={item.id} style={styles.listCard}>
          <List.Item
        title={item.data}
        right={() => <TouchableOpacity onPress={()=>this.deleteItem(item.id)}><List.Icon icon="delete" color={Colors.blue500}/></TouchableOpacity>}
       
  />
  </View>
    )})
  }
  else{
    renderList = <Text style={styles.nothingText}>Nothing to show add new todo's...</Text>
  }



  return (
    <ScrollView keyboardShouldPersistTaps >
    <View style={styles.container}>
        <Card style={styles.inputCard}>
        <TextInput
      label="Todos"
      onChangeText={(text) => {this.setState({text})}}
      value= {this.state.text}
      mode= "outlined"
      style= {styles.input}
    />
      <Button mode="contained" onPress={this.addTodo} style={{backgroundColor:"#1498f7"}}>
      Add Todo
  </Button>
  </Card>

  
  
  <Card style={styles.listView}>
  {renderList}
  </Card>

  
  
  </View>
  
  </ScrollView>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    
    
  },
  inputCard: {
    marginTop: 10,
    marginBottom: 10,
    paddingVertical:20,
    paddingHorizontal: 12,
    
  },
  input: {
    marginBottom: 15,
    borderColor: "#1498f7"
  },
  listView:{
    marginVertical: 15,
    paddingBottom: 30,
    paddingTop: 15,
    paddingHorizontal: 13,

  },
 
  nothingText:{
    fontSize: 17,
    textAlign:"center",
  },
 
  listCard: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#1498f7",
    borderRadius: 10,
  }
  
  
});
