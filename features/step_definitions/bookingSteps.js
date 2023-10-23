const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
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

Given("I am on the booking page", async function () {
  await this.page.goto("http://qamid.tmweb.ru/client/index.php", { waitUntil: 'networkidle0', timeout: 20000 });
});

Given("I select a movie session", async function () {
  await clickElement(this.page, "a:nth-child(6)");
  await clickElement(this.page, "a.movie-seances__time");
});

When("I choose {string} seat(s)", async function (number) {
  if (number === "1") {
    await clickElement(this.page, "div:nth-child(3) > span:nth-child(5)");
  } else if (number === "2") {
    await clickElement(this.page, "div:nth-child(3) > span:nth-child(5)");
    await clickElement(this.page, "div:nth-child(3) > span:nth-child(6)");
  }
});

When("I proceed to checkout", async function () {
  await clickElement(this.page, "button");
});

Then("I should see the confirmation message", async function () {
  await this.page.waitForSelector("h2");
  const actual = await this.page.$eval("h2", (link) => link.textContent);
  const expected = "Вы выбрали билеты:";
  expect(actual).to.contain(expected);
});

Then("the checkout button should be disabled", async function () {
  await this.page.waitForSelector("button", { timeout: 5000 }); // ожидание кнопки
  const actual = await this.page.$eval("button", (link) => link.getAttribute("disabled"));
  const expected = "true";
  expect(actual).to.equal(expected);
});


