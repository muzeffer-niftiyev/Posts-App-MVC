export default class View {
  constructor() {
    this.header = document.querySelector("header h2");
    this.createBtn = document.querySelector("header button");
    this.postsContainer = document.querySelector(".posts_grid");
  }

  createPost(post) {
    const titleWords = post.split(' ');
    const editedTitle = `${titleWords?.at(0)} ${titleWords?.at(1)}...`
    const html = `
      <div class="post">
        <div class="post_title">
          <h3>${editedTitle}</h3>
        </div>

        <div class="delete_btn">
          <button>&times;</button>
        </div>
      </div>
    `;

    this.postsContainer.insertAdjacentHTML("beforeend", html);
  }
}
