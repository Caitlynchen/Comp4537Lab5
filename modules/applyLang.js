import {userMessages} from "../lang/messages/en/user.js";

export function applyLang() {
  const elements = document.querySelectorAll("[data-lang]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-lang");
    const text = userMessages?.[key]

    if (text) el.textContent = text;
  });
}
