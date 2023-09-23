export default class Model {
  constructor() {
    this.API = "https://jsonplaceholder.typicode.com/";
    this.posts = [];
  }

  async getPosts(callback, showLoader, hideLoader) {
    try {
      showLoader();
      const api = await fetch(`${this.API}posts`);
      const data = await api.json();
      const edited = data.slice(0, 20);

      this.posts = edited;

      this.posts.forEach((post) => callback(post.title, post.id, false));
      hideLoader();
    } catch {
      callback(null, true);
    }
  }

  async deletePost(id, callback) {
    try {
      const api = await fetch(`${this.API}posts/${id}`, {
        method: "DELETE",
      });

      if (api.ok) {
        callback(id);
      }
    } catch {
      throw new Error("Unexpected error occured!");
    }
  }

  async showPostData(id, callback) {
    try {
      const api = await fetch(`${this.API}posts/${id}`);
      const data = await api.json();

      callback(data.title, data.body);
    } catch {
      throw new Error("Unexpected error occured!");
    }
  }

  async showComments(id, callback) {
    try {
      const api = await fetch(`${this.API}comments`);
      const data = await api.json();
      const postComments = data.filter((post) => post.postId === +id);

      postComments.forEach((comment) =>
        callback(comment.name, comment.email, comment.body)
      );
    } catch {
      throw new Error("Unexpected error occured!");
    }
  }

  async createNewPost(title, body, callback) {
    try {
      const api = await fetch(`${this.API}posts`, {
        method: "POST",
        body: JSON.stringify({
          title,
          body,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await api.json();
      this.posts.push(data);
      callback(data.title, data.id)
    } catch {
      throw new Error("Unexpected error occured!");
    }
  }
}
