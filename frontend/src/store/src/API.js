import axios from 'axios';

export class API {
  authorized = false

  headers = {}

  constructor(token) {
    if (token) this.setToken(token);
  }

  setToken = (token) => {
    this.authorized = !!token;
    this.headers.Authorization = token ? `Bearer ${token}` : undefined;
  }

  getStocks = ({ query }) => axios.post('/api/stocks', query, { headers: this.headers })

  getCompanyDetails = ({ market, ticker }) => axios.post('/api/details', { market, ticker })
}
