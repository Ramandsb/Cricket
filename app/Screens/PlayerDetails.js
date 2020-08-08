/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, SectionList} from 'react-native';
import axios from 'react-native-axios';
import * as images from '../images';
import {api_key} from '../config/config';

export default class PlayerDetailsScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitleAlign: 'center',
    headerTitle: <Text style={{fontWeight: '700'}}>Player's Details</Text>,
    headerRight: <View />,
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Image source={images.chevronLeft} />
      </TouchableOpacity>
    ),
  });
  state = {
    data: '',
  };
  fetchSummary = async (pid) => {
    axios
      .get(`https://cricapi.com/api/playerStats?apikey=${api_key}&pid=${pid}`)
      .then((response) => {
        console.log('fetchMatches', response);
        this.setState({data: response.data});
      })
      .catch((error) => {
        console.log('Data Error', error);
      });
  };
  componentDidMount = () => {
    const {pid} = this.props.navigation.state.params;
    this.fetchSummary(pid);
  };
  render() {
    const {data} = this.state;
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}>
          <Image
            source={{uri: data.imageURL}}
            style={{width: 100, height: 100, borderRadius: 50}}
          />
          <Text>{data.fullName}</Text>
          <Text>{data.country}</Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
              marginLeft: 10,
              color: 'rgba(0,0,0,0.7)',
            }}>
            Personal Information
          </Text>
        </View>
        <View style={{marginTop: 5}}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              backgroundColor: 'white',
              marginBottom: 1,
            }}>
            <Text style={{flex: 1, color: 'rgba(0,0,0,0.5)'}}>Born</Text>
            <Text style={{flex: 2}}>{data.born}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              backgroundColor: 'white',
              marginBottom: 1,
            }}>
            <Text style={{flex: 1, color: 'rgba(0,0,0,0.5)'}}>
              Batting Style
            </Text>
            <Text style={{flex: 2}}>{data.battingStyle}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              backgroundColor: 'white',
              marginBottom: 1,
            }}>
            <Text style={{flex: 1, color: 'rgba(0,0,0,0.5)'}}>
              Bowling Style
            </Text>
            <Text style={{flex: 2}}>{data.bowlingStyle}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              backgroundColor: 'white',
              marginBottom: 1,
            }}>
            <Text style={{flex: 1, color: 'rgba(0,0,0,0.5)'}}>Major Teams</Text>
            <Text style={{flex: 2}}>{data.majorTeams}</Text>
          </View>
        </View>
      </View>
    );
  }
}
