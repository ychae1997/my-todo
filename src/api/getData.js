export default class GetData {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async getTodo(para, today) {
    if (para === 'todo') return this.#getTodos(today);
    if (para === 'incomplete') return this.#getIncompletes(today);
    if (para === 'diary') return this.#getDiaryItems(today);
  }

  async updateTodo(body) {
    const [id, payload] = body;
    return this.apiClient.update(payload, id).then(res => res.data);
  }

  async postTodo(body) {
    return this.apiClient.post(body, 'todo').then(res => res.data);
  }
  async postDiary(body) {
    return this.apiClient.post(body, 'diary').then(res => res.data);
  }

  async #getTodos(today) {
    return this.apiClient.todos().then(res => {
      const filtered = res.data.filter(el => {
        return new Date(el.createdAt) >= new Date(today);
      });
      return filtered;
    });
    // .then(res => res.data.todo.filter(el => el.createdAt >= today));
    // mock data 사용시 res.data.todo
  }

  async #getIncompletes(today) {
    return this.apiClient.todos().then(res => {
      const filtered = res.data
        .map(todo => {
          const items = todo.items.filter(item => item.status === 'active');
          return { ...todo, items };
        })
        .filter(
          el => new Date(el.createdAt) < new Date(today) && el.items.length
        );

      if (filtered.length === 0) return null;
      return filtered;
    });
  }

  async #getDiaryItems(today) {
    return this.apiClient.diary().then(res => res.data);
  }
}
