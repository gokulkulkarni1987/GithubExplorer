import AsyncStorage from '@react-native-community/async-storage';
import {SHARED_PREFERENCE_KEYS} from './AppConstants';

let instance = null;
class SharedPreferences {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }
  async put(key, val) {
    try {
      await AsyncStorage.setItem(key, val);
    } catch (error) {
      console.log('Unable to save in preferences: ', error);
    }
  }

  async remove(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log('Unable to save in preferences: ', error);
    }
  }

  async removeAll() {
    try {
      const keys = [
        SHARED_PREFERENCE_KEYS.USER_ID,
        SHARED_PREFERENCE_KEYS.USER_NAME,
      ];
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.log('Unable to save in preferences: ', error);
    }
  }

  async get(key) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.log('Unable to get from preferences: ', error);
    }
  }

  getMultiple(keys, callback) {
    AsyncStorage.multiGet(keys, (err, stores) => {
      if (!err) {
        const keyVals = {};
        stores.map((result, i, store) => {
          keyVals[`${result[0]}`] = result[1];
        });
        callback(keyVals);
      } else {
        callback([]);
      }
    });
  }

  async getMultipleSync(keys) {
    try {
      let values = await AsyncStorage.multiGet(keys);
      const keyVals = {};
      values.map((result, i, store) => {
        keyVals[`${result[0]}`] = result[1];
      });
      return keyVals;
    } catch (error) {
      console.log('error while fetching sync');
    }
  }
}

const sharedPreference = new SharedPreferences();

export const SHARED_PREFERENCE = {
  accessor: sharedPreference,
};
