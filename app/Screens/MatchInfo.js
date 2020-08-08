/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import moment from 'moment';
import * as images from '../images';

export default class MatchInfoScreen extends Component {
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
  render() {
    const formatDate = (date) => {
      return moment(date, 'YYYY-MM-DDTHH:mm:00.000Z').format('ddd, DD MMM - HH:mm');
    };
    const {item} = this.props.navigation.state.params.item;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            height: 40,
            backgroundColor: 'rgba(0,0,0,0.1)',
            justifyContent: 'center',
          }}>
          <Text style={{marginLeft: 20, fontWeight: '500'}}>SQUADS</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SquadsScreen')}>
            <View
              style={{
                height: 40,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{marginLeft: 20}}>{item['team-1']}</Text>
              <Image source={images.chevronRight} />
            </View>
          </TouchableOpacity>
          <View style={{height: 1, backgroundColor: 'rgba(0,0,0,0.1)'}} />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SquadsScreen')}>
            <View
              style={{
                height: 40,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{marginLeft: 20}}>{item['team-2']}</Text>
              <Image source={images.chevronRight} />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 40,
            backgroundColor: 'rgba(0,0,0,0.1)',
            justifyContent: 'center',
          }}>
          <Text style={{marginLeft: 20, fontWeight: '500'}}>INFO</Text>
        </View>
        <View style={{width: '100%'}}>
          <View
            style={{
              height: 40,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{marginLeft: 20, flex: 1, color: 'rgba(0,0,0,0.7)'}}>
              Match
            </Text>
            <Text style={{marginLeft: 20, flex: 1}}>{item.type} Series</Text>
          </View>
          <View style={{height: 1, backgroundColor: 'rgba(0,0,0,0.1)'}} />
          <View
            style={{
              height: 40,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{marginLeft: 20, flex: 1, color: 'rgba(0,0,0,0.7)'}}>
              Series
            </Text>
            <Text style={{marginLeft: 20, flex: 1}}>
              {item['team-1']} tour of {item['team-2']}
            </Text>
          </View>
          <View style={{height: 1, backgroundColor: 'rgba(0,0,0,0.1)'}} />
          <View
            style={{
              height: 40,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{marginLeft: 20, flex: 1, color: 'rgba(0,0,0,0.7)'}}>
              Match Type
            </Text>
            <Text style={{marginLeft: 20, flex: 1}}>{item.type}</Text>
          </View>
          <View style={{height: 1, backgroundColor: 'rgba(0,0,0,0.1)'}} />
          <View
            style={{
              height: 40,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{marginLeft: 20, flex: 1, color: 'rgba(0,0,0,0.7)'}}>
              Date
            </Text>
            <Text style={{marginLeft: 20, flex: 1}}>
              {moment(item.date, 'YYYY-MM-DDTHH:mm:00.000Z').format(
                'ddd, DD MMM',
              )}
            </Text>
          </View>
          <View style={{height: 1, backgroundColor: 'rgba(0,0,0,0.1)'}} />
          <View
            style={{
              height: 40,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{marginLeft: 20, flex: 1, color: 'rgba(0,0,0,0.7)'}}>
              Time
            </Text>
            <Text style={{marginLeft: 20, flex: 1}}>
              {moment(item.date, 'YYYY-MM-DDTHH:mm:00.000Z').format('hh:mm a')}
            </Text>
          </View>
          <View style={{height: 1, backgroundColor: 'rgba(0,0,0,0.1)'}} />
        </View>
      </View>
    );
  }
}
