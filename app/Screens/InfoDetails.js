/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, SectionList} from 'react-native';
import axios from 'react-native-axios';
import * as images from '../images';
import {api_key} from '../config/config';

export default class InfoDetailsScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitleAlign: 'center',
    headerTitle: <Text style={{fontWeight: '700'}}>Match Details</Text>,
    headerRight: <View />,
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Image source={images.chevronLeft} />
      </TouchableOpacity>
    ),
  });
  state = {
    score: '',
    battingData: [],
  };
  fetchScore = async (unique_id) => {
    axios
      .get(
        `https://cricapi.com/api/cricketScore?apikey=${api_key}&unique_id=${unique_id}`,
      )
      .then((response) => {
        console.log('fetchScore', response);
        this.setState({score: response.data});
      })
      .catch((error) => {
        console.log('Data Error', error);
      });
  };
  fetchSummary = async (unique_id) => {
    axios
      .get(
        `https://cricapi.com/api/fantasySummary?apikey=${api_key}&unique_id=${unique_id}`,
      )
      .then((response) => {
        console.log('fetchMatches', response);
        const batting = response.data.data.batting;
        var arr = [];
        for (let i in batting) {
          arr.push({
            title: batting[i].title,
            data: batting[i].scores,
          });
        }
        this.setState({battingData: arr});
      })
      .catch((error) => {
        console.log('Data Error', error);
      });
  };
  componentDidMount = () => {
    const {unique_id} = this.props.navigation.state.params;

    this.fetchSummary(unique_id);
    this.fetchScore(unique_id);
  };
  render() {
    const {score} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{padding: 10, backgroundColor: 'rgba(145,223,123,0.3)'}}>
          <Text style={{fontWeight: '700'}}>Score</Text>
        </View>
        <Text
          style={{
            fontSize: 15,
            color: 'black',
            marginLeft: 10,
            fontWeight: '700',
            marginTop: 10,
          }}>
          {score.score}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: 'black',
            marginLeft: 10,
            fontWeight: '300',
            marginTop: 5,
          }}>
          {score.stat}
        </Text>
        <View
          style={{
            padding: 10,
            backgroundColor: 'rgba(145,223,123,0.3)',
            marginTop: 20,
          }}>
          <Text style={{fontWeight: '700'}}>Stats</Text>
        </View>
        <SectionList
          sections={this.state.battingData}
          keyExtractor={(item, index) => item + index}
          ItemSeparatorComponent={() => (
            <View style={{height: 0.75, backgroundColor: 'rgba(0,0,0,0.1)'}} />
          )}
          renderItem={({item}) => <ListItem item={item} />}
          renderSectionHeader={({section: {title}}) => (
            <ListHeader title={title} />
          )}
        />
      </View>
    );
  }
}
const ListHeader = (props) => {
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: '#F0F0F0',
      }}>
      <Text style={{fontWeight: '700'}}>Batting {props.title}</Text>
      <View style={{flexDirection: 'row', flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            height: 30,
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text>Batsman</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            height: 30,
            marginTop: 10,
            alignItems: 'center',
          }}>
          <Text style={{flex: 1}}>R</Text>
          <Text style={{flex: 1}}>B</Text>
          <Text style={{flex: 1}}>4s</Text>
          <Text style={{flex: 1}}>6s</Text>
          <Text style={{flex: 1}}>SR</Text>
        </View>
      </View>
    </View>
  );
};
const ListItem = (props) => {
  const {item} = props;
  return (
    <View
      style={{
        padding: 10,
      }}>
      <Text style={{fontWeight: '700'}}>{}</Text>
      <View style={{flexDirection: 'row', flex: 1}}>
        <View
          style={{
            flex: 1,
            height: 30,
            justifyContent: 'center',
          }}>
          <Text>{item.batsman}</Text>
          <Text style={{color: 'rgba(0,0,0,0.5)', marginBottom: 10}}>
            {item['dismissal-info']}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            height: 30,
            alignItems: 'center',
            paddingBottom: 10
          }}>
          <Text style={{flex: 1}}>{item.R}</Text>
          <Text style={{flex: 1}}>{item.B}</Text>
          <Text style={{flex: 1}}>{item['4s']}</Text>
          <Text style={{flex: 1}}>{item['6s']}</Text>
          <Text style={{flex: 1}}>{item.SR}</Text>
        </View>
      </View>
    </View>
  );
};
