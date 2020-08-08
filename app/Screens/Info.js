/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import axios from 'react-native-axios';
import moment from 'moment';
import * as images from '../images';
import {api_key} from '../config/config';

export default class InfoScreen extends Component {
  state = {
    data: '',
  };
  static navigationOptions = ({navigation}) => ({
    headerTitleAlign: 'center',
    headerTitle: <Text style={{fontWeight: '700'}}>Current Matches</Text>,
    headerRight: <View />,
    headerLeft: <View />,
  });
  fetchMatches = async () => {
    axios
      .get(`https://cricapi.com/api/cricket?apikey=${api_key}`)
      .then((response) => {
        console.log('Data', response);
        this.setState({data: response.data.data});
      })
      .catch((error) => {
        console.log('Data Error', error);
      });
  };
  componentDidMount = () => {
    this.fetchMatches();
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
  render() {
    const {data} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{padding: 10, backgroundColor: 'rgba(145,223,123,0.5)'}}>
          <Text style={{fontWeight: '700'}}>International</Text>
        </View>
        <FlatList
          data={data}
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

const formatDate = (date) => {
  return moment(date, 'YYYY-MM-DDTHH:mm:00.000Z').format(
    'ddd, DD MMM - hh:mm a',
  );
};
const ListRow = (props) => {
  const {item} = props.item;
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('InfoDetailsScreen', {
          unique_id: item.unique_id,
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
                borderRadius: 10,
                backgroundColor: props.color(),
                height: 20,
                width: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 10, color: 'white'}}>
                {item.title.split('v')[0].split('')[0]}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 13,
                color: 'black',
                marginLeft: 10,
                fontWeight: '700',
              }}>
              {item.title.split(' v ')[0]}
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: props.color(),
                height: 20,
                width: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 10, color: 'white'}}>
                {item.title.split(' v ')[1].split('')[0]}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 13,
                color: 'black',
                marginLeft: 10,
                fontWeight: '700',
              }}>
              {item.title.split(' v ')[1]}
            </Text>
          </View>
          <Text style={{marginTop: 10, color: 'rgba(0,0,0,0.4)', fontSize: 12}}>
            {item.description}
          </Text>
        </View>
        <Image source={images.chevronRight} />
      </View>
    </TouchableOpacity>
  );
};
