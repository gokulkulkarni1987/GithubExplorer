import React from 'react';
import {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import ButtonComponent from '../../components/ButtonComponent';
import InputComponent from '../../components/InputComponent';
import {CREATE_ISSUE_ACTION, CREATE_ISSUE_CLEAR_ACTION} from './IssueActions';

const CreateIssueScreen = (props) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const {route} = props;
  const {params} = route;
  const dispatch = useDispatch();
  const createIssueProp = useSelector(({createIssue}) => createIssue);
  const {repo, owner} = params;

  const onTitleChanged = (newTitle) => {
    setTitle(newTitle);
  };

  const onBodyChanged = (newBody) => {
    setBody(newBody);
  };

  const onCreateIssueClicked = () => {
    dispatch({
      type: CREATE_ISSUE_ACTION,
      payload: {
        name: repo,
        owner,
        title,
        body,
      },
    });
  };

  if (createIssueProp.issueCreationStatus === 'SUCCESS') {
    Alert.alert('Success!!!', 'Issue created succesfully', [
      {
        text: 'OK',
        onPress: () => {
          dispatch({
            type: CREATE_ISSUE_CLEAR_ACTION,
          });
        },
      },
    ]);
  } else if (createIssueProp.issueCreationStatus === 'FAIL') {
    Alert.alert('Fail!!!', 'Unable to create issue', [
      {
        text: 'OK',
        onPress: () => {
          dispatch({
            type: CREATE_ISSUE_CLEAR_ACTION,
          });
        },
      },
    ]);
  }

  return (
    <View style={styles.parentStyle}>
      <InputComponent
        onChangeText={onTitleChanged}
        placeholder={'Title'}
        value={title}
        style={styles.inputStyle}
      />
      <InputComponent
        onChangeText={onBodyChanged}
        placeholder={'Body'}
        value={body}
        style={styles.inputBodyStyle}
        multiline
        numberOfLines={7}
      />
      {createIssueProp.issueCreateInProgress ? (
        <LottieView
          source={require('../../res/lottie/9825-loading-screen-loader-spinning-circle.json')}
          autoPlay
          loop
          style={styles.lottieStyle}
        />
      ) : (
        <ButtonComponent
          title="Create Issue"
          buttonStyle={styles.createIssueButtnStyle}
          onPress={onCreateIssueClicked}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  parentStyle: {
    flex: 1,
    padding: 10,
  },
  inputStyle: {marginTop: 10},
  inputBodyStyle: {marginTop: 10, minHeight: 150},
  createIssueButtnStyle: {marginTop: 10},
  lottieStyle: {width: 40, height: 40, alignSelf: 'center'},
});

export default CreateIssueScreen;
