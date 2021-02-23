import React from 'react';
import {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import Heading1Text from '../../components/Heading1Text';
import Heading4Text from '../../components/Heading4Text';
import {FETCH_REPO_ISSUES_ACTION} from './RepoActions';

const RepoDetailsScreen = (props) => {
  const {route} = props;
  const {params} = route;
  const {repository} = params;
  const dispatch = useDispatch();
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
  return (
    <View style={styles.parentStyle}>
      <View style={styles.mainView}>
        <View style={styles.topViewStyle}>
          <Heading1Text>{repository.name}</Heading1Text>
          <Text>{repository.private ? 'Private' : 'Public'}</Text>
        </View>
        <Heading4Text style={styles.ownerStyle}>
          {repository.owner.login}
        </Heading4Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentStyle: {flex: 1, backgroundColor: 'white'},
  mainView: {
    padding: 10,
    backgroundColor: 'white',
  },
  topViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ownerStyle: {marginTop: 10},
});

export default RepoDetailsScreen;
