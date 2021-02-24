import React from 'react';
import LottieView from 'lottie-react-native';
import {useState} from 'react';
import {useRef} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import SearchBar from 'react-native-search-bar';
import {useDispatch, useSelector} from 'react-redux';
import RepoRowComponent from '../../components/RepoRowComponent';
import {SEARCH_REPO_ACTION} from './HomeActions';

const AllRepos = (props) => {
  const allRepositoriesProp = useSelector(
    ({allRepositories}) => allRepositories,
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
    dispatch({
      type: SEARCH_REPO_ACTION,
      payload: {
        searchQuery,
        page: 1,
        pageSize: 10,
        repositories: allRepositoriesProp.repositories,
      },
    });
  };
  const onCancelButtonPress = () => {
    if (searchRef) {
      searchRef.current.blur();
    }
  };

  const onRepoClicked = (item) => {
    props.navigation.navigate('RepoDetails', {
      name: item.name,
      owner: item.owner.login,
      repoId: item.id,
      description: item.description,
    });
  };

  const renderItem = ({index, item}) => {
    return <RepoRowComponent item={item} onRepoClicked={onRepoClicked} />;
  };

  const keyExtractor = (item, index) => {
    return item.id + '_' + index;
  };

  return (
    <View style={styles.parentStyle}>
      <SearchBar
        ref={searchRef}
        placeholder="Search All Repos"
        onChangeText={onSearchTextChange}
        onSearchButtonPress={onSearchButtonPress}
        onCancelButtonPress={onCancelButtonPress}
        textColor={'black'}
      />
      {allRepositoriesProp.repositories.length === 0 ? (
        <LottieView
          source={require('../../res/lottie/9825-loading-screen-loader-spinning-circle.json')}
          autoPlay
          loop
          style={styles.lottieStyle}
        />
      ) : null}

      <FlatList
        data={allRepositoriesProp.repositories}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={() => (
          <View style={styles.flatlistItemSeparatorStyle} />
        )}
        style={styles.flatlistStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parentStyle: {flex: 1, margin: 5, alignItems: 'stretch'},
  flatlistStyle: {marginTop: 10},
  flatlistItemSeparatorStyle: {margin: 5},
  lottieStyle: {width: 100, height: 100, alignSelf: 'center'},
});

export default AllRepos;
