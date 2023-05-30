
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { getPixel } from './src/utils'
import Pin from './src/Pin';


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      region:null,
      destLocation: null
    };

  }


  async componentDidMount(){
      await navigator.geolocation.getCurrentPosition(
        async ({ coords:{latitude, longitude} })=>{
          this.setState({
            region:{
              latitude,
              longitude,
              latitudeDelta:0.0015,
              longitudeDelta:0.0121
            },
          });
        },
        ()=>{}, //Erro
        {
           timeout: 3000,
           enableHighAccuracy:true,
           maximumAge: 2000,
        }
      )
  }

  render() {
    const {region} = this.state;

    return (
      <View style={styles.container}>

        <MapView
          ref={(map)=>{this.map = map}}
          style={styles.mapa}
          region={region}
          loadingEnabled
          showsUserLocation>

          {this.state.destLocation &&
            <MapViewDirections
              origin={this.state.region}
              destination={this.state.destLocation}
              apikey="AIzaSyCpdXfzbTuVwwHNNcHLrL66T-to4Fg9EQc"
              strokeWidth={5}
              strokeColor="#000"
              onReady={result => {
                this.map.fitToCoordinates(result.coordinates, {
                  edgePadding:{
                    right: getPixel(50),
                    left:  getPixel(50),
                    top:  getPixel(50),
                    bottom:  getPixel(50)
                  }
                })
              }}
            />
            //latitude:-20.4634685,longitude:-54.6108303
            //latitude:-20.4615409,longitude:-54.5919008
          }

          </MapView>
          
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.box}>
            <View style={styles.localView}>
              <TouchableOpacity style={styles.localBtn} onPress={()=>{
                this.setState({destLocation:{
                  latitude:-20.4634685,
                  longitude:-54.6108303
                }})
              }}>
                <Text style={styles.localText}>Burker king</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.localView}>
              <TouchableOpacity style={styles.localBtn}>
                <Text style={styles.localText}>Shopping</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.localView}>
              <TouchableOpacity style={styles.localBtn} onPress={()=> {
                this.setState({destLocation: {
                  latitude:-20.4615409,
                  longitude:-54.5919008
                }})
              }}>
                <Text style={styles.localText}>Farmacia</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.localView}>
              <TouchableOpacity style={styles.localBtn}>
                <Text style={styles.localText}>Sushi</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.localView}>
              <TouchableOpacity style={styles.localBtn}>
                <Text style={styles.localText}>Trabalho</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.localView}>
              <TouchableOpacity style={styles.localBtn}>
                <Text style={styles.localText}>Restaurante</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapa:{
    flex: 1,
  },
  box:{
    position: 'absolute',
    top: 30,
    margin: 10,
    height: 70
  },
  localView:{
    height: 40,
    padding: 5,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  localBtn:{
    backgroundColor: '#FF0000',
    height: 40,
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  localText:{
    color: '#FFF'
  }
});





