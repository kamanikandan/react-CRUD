import Raven from "raven-js";

function init() {
  Raven.config("https://572791295fc247f2bf529e4b7f63c1fb@sentry.io/1416300", {
    release: "1-0-0",
    environment: "development-test"
  }).install();
}

function log(error) {
  Raven.captureException(error);
}

export default {
  init,
  log
};
