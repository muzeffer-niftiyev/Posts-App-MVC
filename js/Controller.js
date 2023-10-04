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

      this.model.showComments(id, (name, email, body) => {
        this.view.createComments(name, email, body);
      });
    });

    this.view.createPostButtonHandler((title, body) => this.model.createNewPost(title, body, (title, id) => this.view.createPost(title, id)));

    this.view.postPageGoBackBtnHandler();
    this.view.mainPageCreateBtnHandler();
    this.view.createPageCancelBtnHandler();
    this.view.postPageCreateBtnHandler();
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
