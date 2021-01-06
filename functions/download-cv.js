const puppeteer = require('puppeteer')

exports.handler = async function (event, context) {
  const browser = await puppeteer.launch({ headless: true })
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
