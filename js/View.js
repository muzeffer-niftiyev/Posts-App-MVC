export default class View {
  constructor() {
    this.header = document.querySelector("header h2");
    this.createBtn = document.querySelector("header button");
    this.postsContainer = document.querySelector(".posts");
    this.loader = document.querySelector(".loader");
    this.mainPage = document.querySelector(".posts_container");
    this.postPage = document.querySelector(".selected_post");
    this.postPageGoBackBtn = document.querySelector(".go_back");
    this.postPageContent = document.querySelector(".post_data");
    this.postPageCommentsContainer = document.querySelector(
      ".comments_container"
    );

    this.postPageGoBackBtn.addEventListener("click", () => {
      this.postPage.classList.add("hidden");
      this.mainPage.classList.remove("hidden");
      this.clearValues.call(this);
    });
  }

  createPost(post, postId) {
    const titleWords = post?.split(" ");
    const editedTitle = `${titleWords.slice(0, 5).join(" ")}...`;
    const html = `
      <div class="post" data-post-id="${postId}">
        <div class="post_title">
          <h3>${editedTitle}</h3>
        </div>

        <div class="delete_btn">
          <button data-post-id="${postId}">&times;</button>
        </div>
      </div>
    `;

    this.postsContainer.insertAdjacentHTML("beforeend", html);
  }

  showLoader() {
    this.loader.style.display = "block";
  }

  hideLoader() {
    this.loader.style.display = "none";
  }

  showErrorMessage() {
    const html = `
    <p>No posts yet!</p>
    `;

    this.postsContainer.innerHTML = html;
  }

  deleteButtonHandler(callback, showError) {
    this.postsContainer?.addEventListener("click", function (e) {
      const deleteBtn = e.target.closest("button");
      if (!deleteBtn) return;

      const postId = deleteBtn.getAttribute("data-post-id");
      callback(postId);

      const allPosts = document.querySelectorAll(".post");
      if (allPosts.length === 1) {
        showError();
      }
    });
  }

  removePost(postId) {
    const postElement = this.postsContainer.querySelector(
      `[data-post-id="${postId}"]`
    );
    if (postElement) {
      postElement.remove();
    }
  }

  postClickHandler(callback) {
    this.postsContainer.addEventListener("click", (e) => {
      const post = e.target.closest(".post");
      const deleteBtn = e.target.closest("button");
      if (deleteBtn || !post) return;

      this.mainPage.classList.add("hidden");
      this.postPage.classList.remove("hidden");

      callback(post.getAttribute("data-post-id"));
    });
  }

  setValues(title, content) {
    const html = `
      <h3>${title}</h3>
        <div>
          <p>${content}</p>
        </div>
    `;

    this.postPageContent.innerHTML = html;
  }

  clearValues() {
    this.postPageContent.innerHTML = null;
  }
}
