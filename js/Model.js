export default class Model {
  constructor() {}

  async getPosts(callback) {
    try {
      const api = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await api.json();
      
      data.forEach(post => callback(post.title));
    } catch (err) {
      console.log(err);
    }
  }
}
