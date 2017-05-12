import React from 'react';
import { 
  ScrollView,
  StyleSheet, 
  Text,   
  TextInput, 
  View
} from 'react-native';
import Tile from './Tile';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffa"
  },
  input:{
    height: 40, 
    backgroundColor: "#fff"
  },
  title: {
    fontSize:50, 
    justifyContent: 'center'
  }
});

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      books: [],
      query: 'The Cat In The Hat'
    }
  }

  componentDidMount() {
    this.search();
  }

  search(){
    fetch(`https://www.googleapis.com/books/v1/volumes?q=title:${this.state.query}`)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(res => res.items[0])
      .then(book => ({
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks.thumbnail,
        key: book.id,
        read: false
      }))
      .then(res => this.setState(state => ({books: [res, ...state.books], query: ''})));
  }

  remove(key){
    this.setState(state => ({
      books: state.books.filter(b => b.key != key)
    }))
  }

  read(key){
    this.setState(state => ({
        books: state.books.map(b => {
          if(key === b.key){
            return {...b, read: !b.read}
          } else{
            return b;
          }
        })
      }
    ))
  }

  render(){

    return (
      <View style={styles.container}>
        <View>
          <Text>Book Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={(query) => this.setState({query})}
            onSubmitEditing={this.search.bind(this)}
            value={this.state.query}
          />

        </View>
        <Text style={styles.title}>My Book List</Text>
        <ScrollView>
          {
            this.state.books.map(book => 
              <Tile 
                {...book} 
                onClose={this.remove.bind(this, book.key)}
                onRead={this.read.bind(this, book.key)} 
              />
            )
          }
        </ScrollView>
      </View>
    );
  }
}