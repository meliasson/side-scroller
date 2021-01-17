'use strict';

describe('Start page', async function () {
  it('renders title', async function () {
    await page.goto(`${host}`);
    const result = await page.$eval('h1', e => e.textContent);

    expect(result).to.eq('Express');
  });

  it('renders paragraph', async function () {
    await page.goto(`${host}`);
    const result = await page.$eval('p', e => e.textContent);

    expect(result).to.eq('Welcome to Express');
  });
});
