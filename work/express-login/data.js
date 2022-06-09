const users = {
  'Jorts': {
    username: "Jorts",
    message: "This is a simple test message",
  },
};

const addUsers = ({ username, message = "" }) => {
  users.push({ username, message });
};

const data = {
  users,
  addUsers
}

module.exports = data;