(function () {
  function showToast(message) {
    var toast = document.querySelector(".copy-toast");

    if (!toast) {
      toast = document.createElement("div");
      toast.className = "copy-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 1800);
  }

  function fallbackCopy(text) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () {
        fallbackCopy(text);
      });
    }

    fallbackCopy(text);
    return Promise.resolve();
  }

  document.addEventListener("click", function (event) {
    var trigger = event.target.closest("[data-copy]");

    if (!trigger) {
      return;
    }

    var text = trigger.getAttribute("data-copy");
    var label = trigger.getAttribute("data-copy-label") || "内容";

    copyText(text)
      .then(function () {
        showToast(label + "已复制：" + text);
      })
      .catch(function () {
        showToast("复制失败，请手动复制：" + text);
      });
  });
})();
