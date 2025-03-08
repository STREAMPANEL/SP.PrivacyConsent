// Define language-specific constants
let pureprivacyTitle, pureprivacyDesc, pureprivacyButtonOk, pureprivacyButtonSettings, pureprivacyURL;

// Detect the user's language
const getLanguage = () => {
  const userLang = navigator.language || navigator.userLanguage;
  return userLang.split("-")[0]; // Extract language code (e.g., "en" from "en-US")
};

// Language dictionary
const translations = {
  de: {
    title: "Cookies und WebradioTop100.de",
    desc: "Wenn Sie diese Webseite benutzen, stimmen Sie der Verarbeitung von Cookies zu.",
    buttonOk: "Verstanden, alle aktivieren",
    buttonSettings: "Cookie-Einstellungen",
    url: "https://www.webradiotop100.de/cookies/",
  },
  en: {
    title: "Cookies and WebradioTop100.de",
    desc: "By using this website, you consent to the processing of cookies.",
    buttonOk: "Understood, enable all",
    buttonSettings: "Cookie settings",
    url: "https://www.webradiotop100.de/cookies/",
  },
};

// Apply user's language
const setLanguageConstants = (language) => {
  const selectedLang = translations[language] || translations["en"];
  pureprivacyTitle = selectedLang.title;
  pureprivacyDesc = selectedLang.desc;
  pureprivacyButtonOk = selectedLang.buttonOk;
  pureprivacyButtonSettings = selectedLang.buttonSettings;
  pureprivacyURL = selectedLang.url;
};
setLanguageConstants(getLanguage());

// Fade in an element
const pureFadeIn = (elem, display = "block") => {
  const el = document.getElementById(elem);
  if (!el) return;
  el.style.opacity = 0;
  el.style.display = display;

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
  if (!el) return;
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

// Cookie Manager to avoid naming conflicts
const CookieManager = {
  set: (name, value, days) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${value || ""}${expires}; path=/; domain=.webradiotop100.de`;
  },

  get: (name) => {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(";");
    for (let c of cookies) {
      c = c.trim();
      if (c.startsWith(nameEQ)) return c.substring(nameEQ.length);
    }
    return null;
  },
};

// Display the privacy consent banner
const privacyConsent = () => {
  if (!CookieManager.get("cookie_consent_level")) {
    const consentBannerHTML = `
      <div class="privacyConsentContainer" id="privacyConsentContainer">
        <div class="privacyTitle"><a>${pureprivacyTitle}</a></div>
        <div class="privacyDesc"><p>${pureprivacyDesc}</p></div>
        <div class="privacyButton">
          <a href="#" onclick="setCookieConsent();">${pureprivacyButtonOk}</a>
        </div>
        <div class="privacyButton">
          <a href="${pureprivacyURL}" target="_blank" rel="noopener noreferrer">${pureprivacyButtonSettings}</a>
        </div>
      </div>`;
    document.body.insertAdjacentHTML("beforeend", consentBannerHTML);
    pureFadeIn("privacyConsentContainer");
  }
};

// Handle cookie consent level setting
const setCookieConsent = () => {
  CookieManager.set("cookie_consent_level", "targeting", 90);
  pureFadeOut("privacyConsentContainer");
};

// Initialize privacy consent when DOM is ready
document.addEvent;
