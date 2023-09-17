export default class Model {
  constructor() {
    this.API = "https://jsonplaceholder.typicode.com/";
  }

  async getPosts(callback, showLoader, hideLoader) {
    try {
      showLoader();
      const api = await fetch(`${this.API}posts`);
      const data = await api.json();
      const edited = data.slice(0, 10);
      
      edited.forEach((post) => callback(post.title, post.id, false));
      hideLoader();
    } catch {
      callback(null, true);
    }
  }

  async deletePost(id, callback) {
    try {
      const api = await fetch(`${this.API}posts/${id}`, {
        method: "DELETE"
      });
      
      if(api.ok) {
        callback(id)
      } 
    } catch {
      throw new Error("Unexpected error occured!");
    }
  }

  async showPostData(id, callback) {
    try{
      const api = await fetch(`${this.API}posts/${id}`);
      const data = await api.json();

      callback(data.title, data.body);
    }catch{
      throw new Error("Unexpected error occured!");
    }
  }

  async getComments(id) {
    try{
      const api = await fetch(`${this.API}comments/${id}`);
      const data = api.json();
      console.log(data);
    }catch{
      throw new Error("Unexpected error occured!");
    }
  }
}
