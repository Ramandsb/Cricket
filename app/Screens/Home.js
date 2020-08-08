/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import axios from 'react-native-axios';
import moment from 'moment';
import * as images from '../images';
import {api_key} from '../config/config';

export default class HomeScreen extends Component {
  state = {
    data: '',
  };
  static navigationOptions = ({navigation}) => ({
    headerTitleAlign: 'center',
    headerTitle: <Text style={{fontWeight: '700'}}>Upcoming Matches</Text>,
    headerRight: <View />,
    headerLeft: <View />,
  });
  fetchMatches = async () => {
    axios
      .get(`https://cricapi.com/api/matches?apikey=${api_key}`)
      .then((response) => {
        console.log('Data', response);
        this.setState({data: response.data.matches});
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
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('MatchInfoScreen', {
          item: props.item,
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
                {props.item.item['team-1'].split('')[0]}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 13,
                color: 'black',
                marginLeft: 10,
                fontWeight: '700',
              }}>
              {props.item.item['team-1']}
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
                {props.item.item['team-1'].split('')[0]}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 13,
                color: 'black',
                marginLeft: 10,
                fontWeight: '700',
              }}>
              {props.item.item['team-2']}
            </Text>
          </View>
          <Text style={{marginTop: 10, color: 'rgba(0,0,0,0.4)', fontSize: 12}}>
            {props.item.item.type} {formatDate(props.item.item.date)}
          </Text>
        </View>
        <Image source={images.chevronRight} />
      </View>
    </TouchableOpacity>
  );
};
