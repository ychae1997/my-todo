import axios from 'axios';

export default class FakeClient {
  async todos() {
    return axios.get('/data/todo.json');
  }
}
