const chromium = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')

exports.handler = async function (event, context) {
  let browser = null
  console.log('spawning chrome headless')
  const executablePath = await chromium.executablePath
  browser = await puppeteer.launch({
    args: chromium.args,
    headless: true,
    executablePath,
  })
  const page = await browser.newPage()
  await page.goto('https://unruffled-mccarthy-8ee9c2.netlify.app')
  const pdf = await page.pdf({
    // path: './test.pdf',
    format: 'A4',
    printBackground: true,
  })
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/pdf',
    },
    statusCode: 200,
    body: pdf.toString('base64'),
    isBase64Encoded: true,
  }
}
