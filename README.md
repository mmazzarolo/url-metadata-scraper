# URL Metadata Scraper <img src="./.github/banner.png" width="110" align="left">

Tiny Vercel serverless function to scrape metadata from a URL.  

<br />

Deployed at [url-metadata-scraper.vercel.app](url-metadata-scraper.vercel.app).  
Uses the [Metascraper](https://github.com/microlinkhq/metascraper) library.  

## Setup  

1. Fork this repo
2. Link it to your Vercel dashboard
3. That's it 👍

## Usage

Call `/api/scrape` providing a valid URL to the `url` query parameter to get a JSON response with the URL metadata.  

For example, `https://url-metadata-scraper.vercel.app/api/scrape?url=https://google.com` returns:

```json
{
  "lang": "en",
  "author": null,
  "title": "Google",
  "publisher": null,
  "image": "https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png",
  "audio": null,
  "date": null,
  "description": "Search the world’s information, including webpages, images, videos and more. Google has many special features to help you find exactly what you’re looking for.",
  "video": null,
  "logo": "https://logo.clearbit.com/www.google.com",
  "url": "https://www.google.com/"
}
```

## License

Released undet the [MIT](./LICENSE.md) license.  