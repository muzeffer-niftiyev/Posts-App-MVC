export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.loadPosts();

    this.view.deleteButtonHandler(
      (id) => this.model.deletePost(id, this.view.removePost.bind(this.view)),
      this.view.showErrorMessage.bind(this.view)
    );

    this.view.postClickHandler((id) => {
      this.model.showPostData(id, (title, content) => {
        this.view.setValues(title, content);
      });
    });

    
  }

  loadPosts() {
    this.model.getPosts(
      (title, id, hasError) => {
        hasError
          ? this.view.showErrorMessage()
          : this.view.createPost(title, id);
      },
      this.view.showLoader.bind(this.view),
      this.view.hideLoader.bind(this.view)
    );
  }
}
