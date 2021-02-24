import React from 'react';
import {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Heading1Text from '../../components/Heading1Text';
import Heading2Text from '../../components/Heading2Text';
import {
  BOOKMARK_REPO_ACTION,
  FETCH_REPO_ISSUES_ACTION,
  CHECK_USER_BOOKMARK_ACTION,
} from './RepoActions';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SHARED_PREFERENCE} from '../../util/SharedPreferences';
import {SHARED_PREFERENCE_KEYS} from '../../util/AppConstants';
import {useState} from 'react';
import IssueRowComponent from '../../components/IssueRowComponent';

const RepoDetailsScreen = (props) => {
  const [userId, setUserId] = useState(0);
  const {route} = props;
  const {params} = route;
  const {repoId, id, name, description, owner} = params;
  console.log('============> ', params);
  const dispatch = useDispatch();
  const repoDetailsProp = useSelector(({repoDetails}) => repoDetails);
  useEffect(() => {
    dispatch({
      type: FETCH_REPO_ISSUES_ACTION,
      payload: {
        owner: owner,
        repo: name,
      },
    });
  }, [dispatch, owner, name]);

  useEffect(() => {
    (async () => {
      const userIdVal = await SHARED_PREFERENCE.accessor.get(
        SHARED_PREFERENCE_KEYS.USER_ID,
      );
      setUserId(userIdVal);
      dispatch({
        type: CHECK_USER_BOOKMARK_ACTION,
        payload: {
          userId: userIdVal,
          repoId: repoId,
        },
      });
    })();
  }, [dispatch, repoId]);

  const onIssuePress = (item) => {
    props.navigation.navigate('UserImageAndLoction', {
      imageUri: item.user.avatar_url,
      location: item.user.location,
    });
  };

  const renderItem = ({index, item}) => {
    // console.log('item ===> ', item);
    return <IssueRowComponent item={item} onIssuePress={onIssuePress} />;
  };

  const keyExtractor = (item, index) => {
    return item.id + '_' + index;
  };

  const onBookmarkPressed = () => {
    dispatch({
      type: BOOKMARK_REPO_ACTION,
      payload: {
        userId,
        repoId,
        name,
        description,
        owner,
      },
    });
  };

  console.log(
    'repoDetailsProp.isRepoBookmarked: ',
    repoDetailsProp.isRepoBookmarked,
  );

  return (
    <View style={styles.parentStyle}>
      <View style={styles.mainView}>
        <View style={styles.topViewStyle}>
          <Heading1Text>{name}</Heading1Text>
          {repoDetailsProp.isRepoBookmarked ? (
            <Icon name="star" size={30} color="#FFAD35" />
          ) : (
            <Icon
              name="star-o"
              size={30}
              color="#FFAD35"
              onPress={onBookmarkPressed}
            />
          )}
        </View>
        <Heading2Text style={styles.ownerStyle}>Issues</Heading2Text>
        {repoDetailsProp.repoIssues.length === 0 &&
        repoDetailsProp.fetchingIssues ? (
          <LottieView
            source={require('../../res/lottie/9825-loading-screen-loader-spinning-circle.json')}
            autoPlay
            loop
            style={styles.lottieStyle}
          />
        ) : null}
        <FlatList
          data={repoDetailsProp.repoIssues}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <View style={styles.flatlistItemSeparatorStyle} />
          )}
          keyExtractor={keyExtractor}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentStyle: {flex: 1},
  mainView: {
    padding: 10,
    flex: 1,
  },
  topViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5,
  },
  ownerStyle: {marginTop: 10},
  flatlistItemSeparatorStyle: {margin: 5},
  lottieStyle: {width: 100, height: 100, alignSelf: 'center'},
});

export default RepoDetailsScreen;
