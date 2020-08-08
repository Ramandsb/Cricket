/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import axios from 'react-native-axios';
import * as images from '../images';
import {api_key} from '../config/config';
import {Card} from 'react-native-paper';

export default class SearchPlayersScreen extends Component {
  state = {
    query: '',
    data: [],
  };
  static navigationOptions = ({navigation}) => ({
    headerTitleAlign: 'center',
    headerTitle: <Text style={{fontWeight: '700'}}>Search Players</Text>,
    headerRight: <View />,
    headerLeft: <View />,
  });
  fetchMatches = async () => {
    axios
      .get(
        `https://cricapi.com/api/playerFinder?apikey=${api_key}&name=${this.state.query}`,
      )
      .then((response) => {
        console.log('Data', response);
        const filteredData = response.data.data.filter((item) => {
          if (item.name !== '') {
            return item;
          }
        });
        this.setState({data: filteredData});
      })
      .catch((error) => {
        console.log('Data Error', error);
      });
  };
  componentDidMount = () => {
    // this.fetchMatches();
  };
  getRandomColor = () => {
    return (
      'rgb(' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ')'
    );
  };
  onChangeText = (text) => {
    this.setState({query: text});
  };
  handleOnPress = () => {
    this.fetchMatches();
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            marginLeft: 20,
            marginTop: 20,
            marginBottom: 10
          }}>
          <Card
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              width: '80%',
              height: 50,
            }}>
            <View style={{marginLeft: 20}}>
              <TextInput
                onChangeText={this.onChangeText}
                placeholder={'Search'}
                value={this.state.query}
              />
            </View>
          </Card>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              marginLeft: 10,
            }}
            onPress={this.handleOnPress}>
            <Image source={images.arrowRight} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.data}
          renderItem={(item) => {
            return (
              <ListRow
                item={item}
                color={this.getRandomColor}
                navigation={this.props.navigation}
              />
            );
          }}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={() => (
            <View style={{height: 0.75, backgroundColor: 'rgba(0,0,0,0.1)'}} />
          )}
        />
      </View>
    );
  }
}
const ListRow = (props) => {
  const {item} = props.item;
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('PlayerDetailsScreen', {
          pid: item.pid,
        })
      }>
      <View
        style={{
          width: '100%',
          backgroundColor: 'white',
          height: 100,
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                borderRadius: 20,
                backgroundColor: props.color(),
                height: 40,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 15, color: 'white'}}>
                {item.name.split('')[0]}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 13,
                color: 'black',
                marginLeft: 10,
                fontWeight: '700',
              }}>
              {item.name}
            </Text>
          </View>
        </View>
        <Image source={images.chevronRight} />
      </View>
    </TouchableOpacity>
  );
};
