import axios from 'axios'
const baseUrl = ''

const getAll = () => {
  const request = axios.get(`${baseUrl}/api/blogs`);
  return request.then(response => response.data)
}


const login = () => {
  const request = axios.post(`${baseUrl}/api/login`);
  return request.then((response) => response.data);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, login }