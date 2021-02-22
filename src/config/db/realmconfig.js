import Realm from 'realm';

// Returns the shared instance of the Realm app.
export function getRealmApp() {
  const appConfig = {
    timeout: 10000,
  };
  return new Realm.App(appConfig);
}
