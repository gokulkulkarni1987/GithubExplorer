import {put} from 'redux-saga/effects';
import db from '../../db/config';
import {SHARED_PREFERENCE_KEYS} from '../../util/AppConstants';
import {SHARED_PREFERENCE} from '../../util/SharedPreferences';
import {
  LOGIN_ACTION_FAIL,
  LOGIN_ACTION_SUCCESS,
  REGISTER_SUCCESS_ACTION,
  REGISTER_FAIL_ACTION,
} from './AuthActions';

export function* loginSaga(action) {
  const {username, password} = action.payload;
  try {
    const userDetails = yield getfromDB(username, password);
    console.log('userDetailsuserDetailsuserDetails', userDetails);
    SHARED_PREFERENCE.accessor.put(
      SHARED_PREFERENCE_KEYS.USER_ID,
      userDetails.id.toString(),
    );
    SHARED_PREFERENCE.accessor.put(
      SHARED_PREFERENCE_KEYS.USER_NAME,
      userDetails.name,
    );
    put({type: LOGIN_ACTION_SUCCESS});
  } catch (e) {
    put({type: LOGIN_ACTION_FAIL});
  }
}

export function* registerSaga(action) {
  const {username, password} = action.payload;
  console.log('values:', username, ' ', password);
  try {
    const valuesReceived = yield insertIntoDB(username, password);
    console.log('valuesReceivedvaluesReceived: ', valuesReceived);
    SHARED_PREFERENCE.accessor.put(
      SHARED_PREFERENCE_KEYS.USER_ID,
      valuesReceived.insertId.toString(),
    );
    SHARED_PREFERENCE.accessor.put(SHARED_PREFERENCE_KEYS.USER_NAME, username);
    yield put({type: REGISTER_SUCCESS_ACTION});
  } catch (e) {
    console.log('unable to insert user: ', e);
    yield put({type: REGISTER_FAIL_ACTION});
  }
}

const insertIntoDB = (username, password) => {
  return new Promise((resolve, reject) => {
    db.executeSql(
      'INSERT INTO users(name, password) values(?, ?);',
      [username, password],
      (arg) => {
        resolve(arg);
      },
      (e) => {
        reject(e);
      },
    );
  });
};

const getfromDB = (username, password) => {
  return new Promise((resolve, reject) => {
    db.executeSql(
      `select * from users where name='${username}' and password='${password}';`,
      [],
      (tx, results) => {
        console.log('tx: ', tx);
        let resultsLen = tx.rows.length;
        if (resultsLen !== 1) {
          reject();
        } else {
          for (let i = 0; i < resultsLen; i++) {
            console.log(tx.rows.item(i));
          }
          resolve(tx.rows.item(0));
        }
      },
      (e) => {
        console.log('error occured while fetching: ', e);
        reject();
      },
    );
  });
};
