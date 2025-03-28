import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();
monday.setApiVersion("2023-10");

const COOKIE_KEY = "cookieConsent";

// Check if running inside monday.com
const isMondayEnv = () => window.location !== window.parent.location;

export const checkCookieConsent = async () => {
  try {
    if (isMondayEnv()) {
      const res = await monday.storage.getItem(COOKIE_KEY);
      return res?.data?.value === "true";
    } else {
      return localStorage.getItem(COOKIE_KEY) === "true";
    }
  } catch (error) {
    console.error("Error fetching cookie consent:", error);
    return false;
  }
};

export const setCookieConsent = async () => {
  try {
    if (isMondayEnv()) {
      await monday.storage.setItem(COOKIE_KEY, "true");
    } else {
      localStorage.setItem(COOKIE_KEY, "true");
    }
  } catch (error) {
    console.error("Error setting cookie consent:", error);
  }
};

export const resetCookiesOnUninstall = () => {
  try {
    monday.listen("context", async (res) => {
      if (!res?.data?.instanceId) {
        console.log("App uninstalled. Resetting cookies...");
        await monday.storage.deleteItem(COOKIE_KEY);
      }
    });

    // Local testing: Clear localStorage when user manually clears storage
    if (!isMondayEnv()) {
      window.addEventListener("beforeunload", () => {
        localStorage.removeItem(COOKIE_KEY);
      });
    }
  } catch (error) {
    console.error("Error resetting cookies on uninstall:", error);
  }
};

