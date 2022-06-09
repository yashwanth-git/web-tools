const users = {
  'Jorts': {
    username: "Jorts",
    message: "This is a simple test message",
  },
};

const sessions = {}

const addUsers = ({ username, message = "" }) => {
  users.push({ username, message });
};

const data = {
  users,
  sessions,
  addUsers
}

module.exports = data;