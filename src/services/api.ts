import axios from 'axios';

const apiViaCep = axios.create({
  baseURL: 'https://viacep.com.br/ws',
});

const apiServer = axios.create({
  baseURL: 'http://localhost:5000/',
});

export { apiViaCep, apiServer };
