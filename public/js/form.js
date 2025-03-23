const clearBtn = document.querySelector(".clear-btn");
const message = document.querySelector("#message");
const title = document.querySelector("#title");
clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  message.value = "";
  title.value = "";
});
const deletePostBtns = document.querySelectorAll(".delete-post-btn");
deletePostBtns.forEach((btn) => {
  btn.addEventListener("mouseover", () => {
    const post = document.querySelector(`[data-message-id='${btn.value}']`);
    post.style.backgroundColor = "#ececf8";
  });
  btn.addEventListener("mouseleave", () => {
    const post = document.querySelector(`[data-message-id='${btn.value}']`);
    post.style.backgroundColor = "white";
  });
});
