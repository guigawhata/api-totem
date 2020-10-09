import axios from 'axios';

const api = axios.create({
  baseURL: 'https://portal.stg.eugenio.io/api/v1/things',
});

export default api;
