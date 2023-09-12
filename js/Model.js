export default class Model {
  constructor() {}

  async getPosts() {
    try {
      const api = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await api.json();

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
}
