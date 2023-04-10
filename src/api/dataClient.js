import axios from 'axios';

export default class DataClient {
  constructor() {
    this.httpClient = axios.create({
      baseURL: 'http://localhost:4000/',
      redirect: 'manual'
    });
  }

  async todos() {
    // ASC
    return this.httpClient.get('todo?_sort=createdAt&_order=DESC');
  }

  async update(payload, id) {
    return this.httpClient.patch(`todo/${id}`, payload);
  }

  async post(data, path) {
    return this.httpClient.post(path, data);
  }
  // todo

  async diary() {
    return this.httpClient.get('diary');
  }
  async put(payload, id) {
    return this.httpClient.put(`diary/${id}`, payload);
  }
  async delete(id) {
    return this.httpClient.delete(`diary/${id}`);
  }
}
