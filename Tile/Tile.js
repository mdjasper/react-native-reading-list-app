import React from 'react';
import { 
  Image,
  StyleSheet, 
  Text,   
  TouchableHighlight,
  View
} from 'react-native'

const styles = StyleSheet.create({
  tile: {
    flex:1,
    flexDirection: 'row',
    marginTop: 10
  },
  title: {
    fontSize:20
  },
  read: {
      opacity: 0.5
  }
});

const Tile = ({title, description, image, onClose, onRead, read = false}) => (
    <View style={[styles.tile, read && styles.read]}>
        <Image source={{uri: image}} style={{width: 50, height:50, marginRight:10}} />
        <View style={{flex:1}}>
            <Text style={styles.title}>{title}</Text>
            <Text style={{marginBottom: 10}}>{description}</Text>
            <TouchableHighlight onPress={onClose}><Text style={{fontSize:30, color: '#e00'}}>ⓧ</Text></TouchableHighlight>
            <TouchableHighlight onPress={onRead}><Text style={{fontSize:30, color: '#0e0'}}>✔︎</Text></TouchableHighlight>
        </View>
    </View>
);

export default Tile;