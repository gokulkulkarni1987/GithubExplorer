import React from 'react';
import {useEffect} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Heading1Text from '../../components/Heading1Text';
import Heading2Text from '../../components/Heading2Text';
import Heading4Text from '../../components/Heading4Text';
import {BOOKMARK_REPO_ACTION, FETCH_REPO_ISSUES_ACTION} from './RepoActions';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SHARED_PREFERENCE} from '../../util/SharedPreferences';
import {SHARED_PREFERENCE_KEYS} from '../../util/AppConstants';
import {useState} from 'react';

const RepoDetailsScreen = (props) => {
  const [userId, setUserId] = useState(0);
  const {route} = props;
  const {params} = route;
  const {repository} = params;
  const dispatch = useDispatch();
  const repoDetailsProp = useSelector(({repoDetails}) => repoDetails);
  console.log('repositoryrepository: ', repository);
  useEffect(() => {
    dispatch({
      type: FETCH_REPO_ISSUES_ACTION,
      payload: {
        owner: repository.owner.login,
        repo: repository.name,
      },
    });
  }, [dispatch, repository.owner.login, repository.name]);

  useEffect(() => {
    (async () => {
      const userIdVal = await SHARED_PREFERENCE.accessor.get(
        SHARED_PREFERENCE_KEYS.USER_ID,
      );
      setUserId(userIdVal);
    })();
  });

  const renderItem = ({index, item}) => {
    console.log('item ===> ', item);
    return (
      <View style={styles.rowStyle}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Image
            source={{uri: item.user.avatar_url}}
            style={{width: 60, height: 60}}
          />
          <Heading2Text style={{textAlign: 'center', marginLeft: 5}}>
            {item.title}
          </Heading2Text>
        </View>
        <Text style={{marginTop: 10}}>{item.body}</Text>
      </View>
    );
  };

  const onBookmarkPressed = () => {
    dispatch({
      type: BOOKMARK_REPO_ACTION,
      payload: {
        userId,
        repository,
      },
    });
  };

  return (
    <View style={styles.parentStyle}>
      <View style={styles.mainView}>
        <View style={styles.topViewStyle}>
          <Heading1Text>{repository.name}</Heading1Text>
          <Icon
            name="star"
            size={30}
            color="#900"
            onPress={onBookmarkPressed}
          />
        </View>
        <Heading2Text style={styles.ownerStyle}>Issues</Heading2Text>
        <FlatList
          data={repoDetailsProp.repoIssues}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <View style={styles.flatlistItemSeparatorStyle} />
          )}
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
  rowStyle: {
    padding: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 5,
  },
});

export default RepoDetailsScreen;
