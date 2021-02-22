import SQLite from 'react-native-sqlite-storage';

const errorCB = (err) => {
  console.log('SQL Error: ' + err);
};

const openCB = () => {
  console.log('Database OPENED');
};

var db = SQLite.openDatabase(
  'githubexplorer.db',
  '1.0',
  'Github Explorer',
  200000,
  openCB,
  errorCB,
);

// db.executeSql('drop table github_repos;');

db.executeSql(
  'CREATE TABLE IF NOT EXISTS github_repos(id INTEGER PRIMARY KEY AUTOINCREMENT, github_id varchar(1000));',
  [],
  () => {
    console.log('github table created');
  },
  (e) => {
    console.log('unable to create github repo: ', e);
  },
);

db.executeSql(
  'CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(1000), password varchar(1000));',
  [],
  () => {
    console.log('user table created');
  },
  (e) => {
    console.log('unable to create user repo: ', e);
  },
);

// db.executeSql('drop table users_repos;');
db.executeSql(
  'CREATE TABLE IF NOT EXISTS users_repos(id INTEGER PRIMARY KEY AUTOINCREMENT, user INTEGER, repo INTEGER, ' +
    'FOREIGN KEY(user) REFERENCES users(id) ' +
    'FOREIGN KEY(repo) REFERENCES github_repos(id));',
  [],
  () => {
    console.log('user association table created');
  },
  (e) => {
    console.log('unable to create user association repo: ', e);
  },
);

export default db;
