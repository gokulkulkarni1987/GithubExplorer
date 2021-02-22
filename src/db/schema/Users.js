const UsersSchema = {
  name: 'User',
  properties: {
    name: 'String',
    username: 'String',
    pwd: 'String',
    bookmarkedRepos: 'GitHubRepos[]',
  },
};

export default UsersSchema;
