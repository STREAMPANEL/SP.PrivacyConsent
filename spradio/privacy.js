// Define language-specific constants
let pureprivacyTitle,
  pureprivacyDesc,
  pureprivacyButtonOk,
  pureprivacyButtonSettings,
  pureprivacyURL;

// Detect the user's language
const getLanguage = () => {
  const userLang = navigator.language || navigator.userLanguage;
  return userLang.split("-")[0]; // Extract language code (e.g., "en" from "en-US")
};

// Set language-specific constants
const setLanguageConstants = (language) => {
  switch (language) {
    case "de": // German
      pureprivacyTitle = "Cookies und SPRadio.eu";
      pureprivacyDesc =
        "Wenn Sie diese Webseite benutzen, stimmen Sie der Verarbeitung von Cookies zu.";
      pureprivacyButtonOk = "Verstanden, alle aktivieren";
      pureprivacyButtonSettings = "Cookie-Einstellungen";
      pureprivacyURL = "https://www.spradio.eu/kontakt/cookies/";
      break;
    default:
      pureprivacyTitle = "Cookies and SPRadio.eu";
      pureprivacyDesc =
        "By using this website, you consent to the processing of cookies.";
      pureprivacyButtonOk = "Understood, enable all";
      pureprivacyButtonSettings = "Cookie settings";
      pureprivacyURL = "https://www.spradio.eu/en/contact/cookies/";
      break;
  }
};

// Apply user's language to set constants
setLanguageConstants(getLanguage());

// Fade in an element
const pureFadeIn = (elem, display) => {
  const el = document.getElementById(elem);
  el.style.opacity = 0;
  el.style.display = display || "block";

  const fade = () => {
    let val = parseFloat(el.style.opacity);
    if (!((val += 0.02) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  };
  fade();
};

// Fade out an element
const pureFadeOut = (elem) => {
  const el = document.getElementById(elem);
  el.style.opacity = 1;

  const fade = () => {
    if ((el.style.opacity -= 0.02) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  };
  fade();
};

// Set a cookie
const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = `${name}=${
    value || ""
  }${expires}; path=/; domain=.spcast.eu`;
};

// Get a cookie
const getCookie = (name) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// Display the privacy consent banner
const privacyConsent = () => {
  if (!getCookie("cookie_consent_level")) {
    // Append consent banner HTML to the body without overwriting existing content
    const consentBannerHTML = `<div class="privacyConsentContainer" id="privacyConsentContainer"><div class="privacyTitle"><a>${pureprivacyTitle}</a></div><div class="privacyDesc"><p>${pureprivacyDesc}</p></div><div class="privacyButton"><a onclick="cookie_consent_level();">${pureprivacyButtonOk}</a></div><div class="privacyButton"><a href="${pureprivacyURL}">${pureprivacyButtonSettings}</a></div></div>`;
    document.body.insertAdjacentHTML("beforeend", consentBannerHTML);
    pureFadeIn("privacyConsentContainer");
  }
};

// Handle cookie consent level setting
const cookie_consent_level = () => {
  setCookie("cookie_consent_level", "targeting", 90);
  pureFadeOut("privacyConsentContainer");
  // Reload the page or re-initialize page components as needed
};

// Initialize privacy consent process when the window has finished loading
window.onload = () => {
  privacyConsent();
};
