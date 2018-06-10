import axios from 'axios';

// Get all data from https://jsonplaceholder.typicode.com for demo purpose only
const URL = "https://jsonplaceholder.typicode.com/users/";

const getUsers = async () => {
  return await axios.get(URL)
    .then((users) => users.data)
    .catch((err) => err);
}

const getUserById = async (id: number) => {
  return await axios.get(`${URL}${id}`)
    .then((user) => user.data)
    .catch((err) => err);
}

export default {
  Query: {
    users: async (parent: any, args: any) => {
      return await getUsers();
    },

    userById: async (parent: any, { id }: any) => {
      return await getUserById(id);
    }
  }
}