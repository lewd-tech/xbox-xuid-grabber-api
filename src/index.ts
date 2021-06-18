import cheerio from 'cheerio'
import express from 'express'

// rest of the code remains same
const app = express()
const PORT = 8000
app.get('/:id', async (req, res) => {
  try {
    const response = await fetch('https://cxkes.me/xbox/xuid')
    const html: any = await response.text()
    const $: cheerio.Root = cheerio.load(html)
    const token: cheerio.Cheerio = $('input[name=_token]')
    // @ts-ignore
    const tokenData: string = token[0].attribs.value

    const gamertag = req.params.id

    const urlencoded = new URLSearchParams()
    urlencoded.append('_token', tokenData)
    urlencoded.append('gamertag', gamertag)
    urlencoded.append('rtnType', '1')

    const xuidPayload = fetch('https://cxkes.me/xbox/xuid', {
      method: 'POST',
      // headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    })

    console.log({ xuidPayload })
    if (req) res.send(`Token ${tokenData}`)
  } catch (e) {
    res.json({
      error: 'Something went wrong',
    })
  }
})
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})
