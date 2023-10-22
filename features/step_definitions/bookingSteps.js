const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { clickElement } = require("../../lib/commands.js");

let browser;
let page;

Before(async function () {
  browser = await puppeteer.launch({ headless: false, slowMo: 50, defaultViewport: null, args: ['--start-maximized'] });
  page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  await this.page.goto(`${string}`, { waitUntil: 'networkidle0', timeout: 20000 });
});

When("user chooses a seat", async function () {
  await clickElement (this.page, "a:nth-child(6)");
  await clickElement (this.page, "a.movie-seances__time");
  await clickElement (this.page, "div:nth-child(3) > span:nth-child(5)");
  await clickElement (this.page, "button");
});

When("user chooses two seats", async function () {
  await clickElement (this.page, "a:nth-child(6)");
  await clickElement (this.page, "a.movie-seances__time");
  await clickElement (this.page, "div:nth-child(3) > span:nth-child(5)");
  await clickElement (this.page, "div:nth-child(3) > span:nth-child(6)");
  await clickElement (this.page, "button");
});

When("user does not choose a seat", async function () {
  await clickElement (this.page, "a:nth-child(6)");
  await clickElement (this.page, "a.movie-seances__time");
});

Then("user sees a message", async function () {
  await this.page.waitForSelector("h2");
  const actual = await this.page.$eval("h2", (link) => link.textContent);
  const expected = "Вы выбрали билеты:";
  expect(actual).to.contain(expected);
});

Then("user sees the button become disabled", async function () {
  const actual = await this.page.$eval("button", (link) => link.getAttribute("disabled"));
  const expected = "true";
  expect(actual).to.equal(expected);
});
