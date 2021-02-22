export const USER_SCHEMA = 'User';

const UsersSchema = {
  name: USER_SCHEMA,
  properties: {
    name: 'string',
    username: 'string',
    password: 'string',
    bookmarkedRepos: 'GitHubRepos[]',
  },
};

export default UsersSchema;
