'use strict';

const { expect } = require('chai');
const puppeteer = require('puppeteer');

Object.assign(global, {
  expect
});

let appServer;
let browser;
let env;

const launchPuppeteer = async function (debugEnabled) {
  const opts = {};
  if (process.env.DEBUG_PUPPETEER === 'true') {
    const debugOpts = {
      headless: false,
      slowMo: 500,
      devtools: true,
    };
    Object.assign(opts, debugOpts);
  }
  return await puppeteer.launch(opts);
};

exports.mochaHooks = {
  beforeAll: [
    async function () {
      const app = await require('../app');
      appServer = app.listen(0);
      browser = await launchPuppeteer();
      Object.assign(global, {
        host: `http://127.0.0.1:${appServer.address().port}`
      });
    },
  ],
  beforeEach: [
    async function () {
      const context = await browser.createIncognitoBrowserContext();
      const page = await context.newPage()
      Object.assign(global, {
        page: page
      });
    }
  ],
  afterAll: [
    async function () {
      await browser.close();
      appServer.close();
    },
  ],
};
