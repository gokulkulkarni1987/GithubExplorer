import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {useRef} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import SearchBar from 'react-native-search-bar';
import {useDispatch, useSelector} from 'react-redux';
import Heading1Text from '../../components/Heading1Text';
import Heading4Text from '../../components/Heading4Text';
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

  const renderItem = ({index, item}) => {
    return (
      <View style={styles.rowStyle}>
        <Heading1Text>{item.name}</Heading1Text>
        <Text>{item.private ? 'Private' : 'Public'}</Text>
        <Text>{item.owner.login}</Text>
      </View>
    );
  };

  const keyExtractor = (item, index) => {
    return item.id + '_' + index;
  };

  return (
    <View style={{flex: 1, margin: 5}}>
      <SearchBar
        ref={searchRef}
        placeholder="Search All Repos"
        onChangeText={onSearchTextChange}
        onSearchButtonPress={onSearchButtonPress}
        onCancelButtonPress={onCancelButtonPress}
        textColor={'black'}
      />

      <FlatList
        data={allRepositoriesProp.repositories}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={() => <View style={{margin: 5}} />}
        style={{marginTop: 10}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default AllRepos;
