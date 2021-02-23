import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {useRef} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import SearchBar from 'react-native-search-bar';
import {useDispatch, useSelector} from 'react-redux';
import RepoRowComponent from '../../components/RepoRowComponent';
import {SHARED_PREFERENCE_KEYS} from '../../util/AppConstants';
import {SHARED_PREFERENCE} from '../../util/SharedPreferences';
import {FETCH_BOOKMARKED_REPO_ACTION} from './HomeActions';

const MyBookmarked = (props) => {
  const [userId, setUserId] = useState(0);
  const bookmarkedReposProp = useSelector(
    ({bookmarkedRepos}) => bookmarkedRepos,
  );
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const onSearchTextChange = (newSearchText) => {
    setSearchQuery(newSearchText);
  };
  const onSearchButtonPress = () => {
    if (searchRef) {
      searchRef.current.blur();
    }
  };

  useEffect(() => {
    (async () => {
      const userIdVal = await SHARED_PREFERENCE.accessor.get(
        SHARED_PREFERENCE_KEYS.USER_ID,
      );
      dispatch({
        type: FETCH_BOOKMARKED_REPO_ACTION,
        payload: {
          userId: userIdVal,
        },
      });
      setUserId(userIdVal);
    })();
  }, [dispatch]);
  const onCancelButtonPress = () => {
    if (searchRef) {
      searchRef.current.blur();
    }
  };

  const onRepoClicked = (item) => {
    props.navigation.navigate('RepoDetails', {
      name: item.name,
      owner: item.owner,
      id: item.id,
      description: item.description,
    });
  };

  const renderItem = ({index, item}) => {
    return <RepoRowComponent item={item} onRepoClicked={onRepoClicked} />;
  };

  const keyExtractor = (item, index) => {
    return item.id + '_' + index;
  };

  const onRefresh = () => {
    dispatch({
      type: FETCH_BOOKMARKED_REPO_ACTION,
      payload: {
        userId,
      },
    });
  };

  return (
    <View style={styles.parentStyle}>
      <SearchBar
        ref={searchRef}
        placeholder="Search My repos"
        onChangeText={onSearchTextChange}
        onSearchButtonPress={onSearchButtonPress}
        onCancelButtonPress={onCancelButtonPress}
        textColor={'black'}
      />

      <FlatList
        data={bookmarkedReposProp.repositories}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={() => (
          <View style={styles.flatlistItemSeparatorStyle} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={bookmarkedReposProp.fetchingInProgress}
            onRefresh={onRefresh}
          />
        }
        style={styles.flatlistStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parentStyle: {flex: 1, margin: 5},
  flatlistStyle: {marginTop: 10},
  flatlistItemSeparatorStyle: {margin: 5},
});

export default MyBookmarked;
