const clearBtn = document.querySelector(".clear-btn");
const message = document.querySelector("#message");
const title = document.querySelector("#title");
clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  message.value = "";
  title.value = "";
});
