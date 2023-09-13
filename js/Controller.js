export default class Controller{
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    init() {
        this.model.getPosts(this.view.createPost.bind(this.view))
    }
}