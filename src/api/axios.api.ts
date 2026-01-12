import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.artic.edu/api/v1',
  timeout: 10000,
});

