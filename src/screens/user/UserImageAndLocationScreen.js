import React from 'react';
import {
  Image,
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  ToastAndroid,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Heading2Text from '../../components/Heading2Text';
import {useState} from 'react';
import {useEffect} from 'react';

const UserImageAndLocationScreen = (props) => {
  const [currentLat, setCurrentLat] = useState(null);
  const [currentLong, setCurrentLong] = useState(null);
  const {route} = props;
  const {params} = route;
  let {imageUri, location} = params;

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition((position) => {
      const {latitude, longitude} = position.coords;
      setCurrentLat(latitude);
      setCurrentLong(longitude);
    });
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      (async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getCurrentLocation();
          } else {
            ToastAndroid.show(
              'Please grant the permission by visiting settings',
            );
          }
        } catch (e) {
          ToastAndroid.show('Something went wrong');
        }
      })();
    } else {
      getCurrentLocation();
    }
  }, []);

  const onLocationClicked = () => {
    const url = Platform.select({
      ios: `maps:${currentLat}, ${currentLong}?q=${location}`,
      android: `google.navigation:q=${location}`,
    });
    Linking.openURL(url);
  };

  return (
    <View style={styles.parentViewStyle}>
      <Image
        source={{uri: imageUri}}
        resizeMode={'contain'}
        style={styles.imageViewStyle}
      />
      {location ? (
        <TouchableWithoutFeedback onPress={onLocationClicked}>
          <View style={styles.locationTextStyle}>
            <Heading2Text>{location}</Heading2Text>
          </View>
        </TouchableWithoutFeedback>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  parentViewStyle: {
    flex: 1,
    padding: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  imageViewStyle: {flex: 1},
  locationTextStyle: {flex: 1, alignSelf: 'center'},
});

export default UserImageAndLocationScreen;
