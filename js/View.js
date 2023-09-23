export default class View {
  constructor() {
    this.postsContainer = document.querySelector(".posts");
    this.loader = document.querySelector(".loader");
    this.mainPage = document.querySelector(".posts_container");
    this.postPage = document.querySelector(".selected_post");
    this.postPageGoBackBtn = document.querySelector(".go_back");
    this.postPageContent = document.querySelector(".post_data");
    this.postPageCommentsContainer = document.querySelector(
      ".comments_container"
    );
    this.mainPageCreateBtn = document.querySelector(".main_create");
    this.postPageCreateBtn = document.querySelector(".selected_create");
    this.createPageCreateBtn = document.querySelector(".create_btn");
    this.createPostPage = document.querySelector(".create_post");
    this.createPageCancelBtn = document.querySelector(".cancel_btn");
    this.titleInput = document.querySelector(".title_input");
    this.bodyInput = document.querySelector(".body_input");
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
    this.postPageCommentsContainer.innerHTML = null;
  }

  createComments(name, email, body) {
    const formattedName = name.split(" ").slice(0, 2).join(" ");
    const html = `
      <div class="comment">
        <div class="comment_title">
          <p>${formattedName} / ${email}</p>
        </div>
        <h4>${body}</h4>
      </div>
    `;

    this.postPageCommentsContainer.insertAdjacentHTML("beforeend", html);
  }

  moveToCreatePage() {
    this.mainPage.classList.add("hidden");
    this.postPage.classList.add("hidden");
    this.createPostPage.classList.remove("hidden");
  }

  moveToMainPage() {
    this.postPage.classList.add("hidden");
    this.createPostPage.classList.add("hidden");
    this.mainPage.classList.remove("hidden");
  }

  createPostButtonHandler(callback) {
    this.createPageCreateBtn.addEventListener("click", () => {
      let titleData = this.titleInput.value;
      let bodyData = this.bodyInput.value;

      if (!titleData || !bodyData) return;
      callback(titleData, bodyData);

      this.titleInput.value = this.bodyInput.value = null;
      this.moveToMainPage();
    });
  }

  postPageGoBackBtnHandler() {
    this.postPageGoBackBtn.addEventListener("click", () => {
      this.postPage.classList.add("hidden");
      this.mainPage.classList.remove("hidden");
      this.clearValues.call(this);
    });
  }

  mainPageCreateBtnHandler() {
    this.mainPageCreateBtn.addEventListener(
      "click",
      this.moveToCreatePage.bind(this)
    );
  }

  createPageCancelBtnHandler() {
    this.createPageCancelBtn.addEventListener("click", () => {
      this.moveToMainPage();
      this.titleInput.value = this.bodyInput.value = null;
    });
  }

  postPageCreateBtnHandler() {
    this.postPageCreateBtn.addEventListener(
      "click",
      this.moveToCreatePage.bind(this)
    );
  }
}
