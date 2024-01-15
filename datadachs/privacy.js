// Declare variables for language-specific constants
var pureprivacyTitle,
  pureprivacyDesc,
  pureprivacyButtonOk,
  pureprivacyButtonSettings,
  pureprivacyURL;

// Function to detect the user's language
function getLanguage() {
  const userLang = navigator.language || navigator.userLanguage;
  return userLang.split("-")[0]; // Extract the language code (e.g., "en" from "en-US")
}

// Function to set the language-specific constants
function setLanguageConstants(language) {
  switch (language) {
    case "de": // German language
      // Set constants for German language
      pureprivacyTitle = "Cookies und DataDachs.eu";
      pureprivacyDesc =
        "Wenn Sie diese Webseite benutzen, stimmen Sie der Verarbeitung von Cookies zu.";
      pureprivacyButtonOk = "Verstanden, alle aktivieren";
      pureprivacyButtonSettings = "Cookie-Einstellungen";
      pureprivacyURL = "https://www.datadachs.eu/kontakt/cookies/";
      break;
    default:
      // Default to English language
      // Set constants for English language
      pureprivacyTitle = "Cookies and DataDachs.eu";
      pureprivacyDesc =
        "By using this website, you consent to the processing of cookies.";
      pureprivacyButtonOk = "Understood, enable all";
      pureprivacyButtonSettings = "Cookie settings";
      pureprivacyURL = "https://www.datadachs.eu/en/contact/cookies/";
      break;
  }
}

// Get user language
const userLanguage = getLanguage();

// Set language-specific constants
setLanguageConstants(userLanguage);

// Function to fade in an element
function pureFadeIn(elem, display) {
  var el = document.getElementById(elem);
  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += 0.02) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

// Function to fade out an element
function pureFadeOut(elem) {
  var el = document.getElementById(elem);
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= 0.02) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

// Function to set a cookie
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie =
    name + "=" + (value || "") + expires + "; path=/; domain=.datadachs.eu";
}

// Function to get a cookie
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Function to display the privacy consent banner
function privacyConsent() {
  if (!getCookie("cookie_consent_level")) {
    document.body.innerHTML +=
      '<div class="privacyConsentContainer" id="privacyConsentContainer"><div class="privacyTitle"><a>' +
      pureprivacyTitle +
      '</a></div><div class="privacyDesc"><p>' +
      pureprivacyDesc +
      '</p></div><div class="privacyButton"><a onClick="cookie_consent_level();">' +
      pureprivacyButtonOk +
      '</a></div><div class="privacyButton"><a href="' +
      pureprivacyURL +
      '">' +
      pureprivacyButtonSettings +
      "</a></div></div>";
    pureFadeIn("privacyConsentContainer");
  }
}

// Function to handle the cookie consent level
function cookie_consent_level() {
  setCookie("cookie_consent_level", "targeting", 90);
  pureFadeOut("privacyConsentContainer");
}

// Execute the privacyConsent function when the window has finished loading
window.onload = function () {
  privacyConsent();
};
