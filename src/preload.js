const { ipcRenderer } = require("electron");

const timer = {
  minutes: localStorage.getItem("t") - 0 || 30,
  t: null,
  setMinutes(m) {
    localStorage.setItem("t", m);
    timer.minutes = +m;
  },
  start() {
    clearTimeout(timer.t);
    timer.t = setTimeout(() => {
      const notification = {
        title: "喝水",
        body: "活动一下, 脖子省着点用哇",
      };
      new window.Notification(notification.title, notification);
      timer.start();
    }, timer.minutes * 60 * 1000);
  },
};

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  timer.start();
  rangeInput.value = timer.minutes;
  rangeValue.innerText = timer.minutes;

  rangeInput.addEventListener("change", () => {
    rangeValue.innerText = rangeInput.value;
    timer.setMinutes(rangeInput.value);
    timer.start();
  });

  exitApp.addEventListener("click", () => {
    ipcRenderer.send("exitApp");
  });
});
