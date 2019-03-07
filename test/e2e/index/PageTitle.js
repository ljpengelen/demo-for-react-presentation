module.exports = {
  "Title on page": function(browser) {
    browser.url(browser.launch_url).assert.title("Front-end demo");
    browser.end();
  }
};
