import React from 'react';
import {
  Image,
  Linking,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Heading2Text from '../../components/Heading2Text';

const UserImageAndLocationScreen = (props) => {
  const {route} = props;
  const {params} = route;
  const {imageUri, location} = params;

  const url = Platform.select({
    ios: 'maps:?q=Bangalore, India',
    android: 'google.navigation:q=Bangalore, India',
  });

  const onLocationClicked = () => {
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
