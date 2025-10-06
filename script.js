document.addEventListener("DOMContentLoaded", function () {
  const appContainer = document.querySelector(".app-container");
  const messagesBtn = document.getElementById("messages-btn");

  // --- Event Delegation ---

  // Message button in header navigation
  if (messagesBtn) {
    messagesBtn.addEventListener("click", function () {
      window.location.href = "messages.html";
    });
  }

  // Like button and Create Post functionality using event delegation on the container
  appContainer.addEventListener("click", function (e) {
    // Like button functionality
    if (e.target.matches(".like-btn")) {
      const button = e.target;
      const isLiked = button.getAttribute("aria-pressed") === "true";
      button.setAttribute("aria-pressed", !isLiked);
      button.textContent = !isLiked ? "Liked" : "Like";
      button.classList.toggle("liked", !isLiked);
    }

    // Create post functionality
    if (e.target.matches(".create-post button")) {
      const createPostTextarea = document.querySelector(
        ".create-post textarea"
      );
      const content = createPostTextarea.value.trim();
      if (content) {
        // In a real app, this would send to server and prepend a new post
        alert("Post created: " + content);
        createPostTextarea.value = "";
      } else {
        alert("Please enter some content for your post.");
      }
    }

    // Profile tab switching
    if (e.target.closest(".profile-tab")) {
      const tab = e.target.closest(".profile-tab");
      const tabContainer = tab.closest(".profile-tabs");
      const contentContainer = tab.closest(".profile-content");

      // Update tab active state
      tabContainer
        .querySelectorAll(".profile-tab")
        .forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      // Update content active state
      const tabName = tab.dataset.tab;
      contentContainer
        .querySelectorAll(".profile-tab-content")
        .forEach((c) => c.classList.remove("active"));
      contentContainer
        .querySelector(`#${tabName}-content`)
        .classList.add("active");
    }
  });

  // Reels page video controls using event delegation
  const funContent = document.querySelector(".fun-content");
  if (funContent) {
    funContent.addEventListener("click", function (e) {
      if (e.target.matches("video")) {
        const video = e.target;
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      }
    });
  }
});
