const { parse } = require("url");
const got = require("got");
const metascraper = require("metascraper")([
  require("metascraper-amazon")(),
  require("metascraper-audio")(),
  require("metascraper-author")(),
  require("metascraper-date")(),
  require("metascraper-description")(),
  require("metascraper-image")(),
  require("metascraper-instagram")(),
  require("metascraper-lang")(),
  require("metascraper-logo")(),
  require("metascraper-clearbit-logo")(),
  require("metascraper-logo-favicon")(),
  require("metascraper-publisher")(),
  require("metascraper-readability")(),
  require("metascraper-spotify")(),
  require("metascraper-title")(),
  require("metascraper-telegram")(),
  require("metascraper-url")(),
  require("metascraper-logo-favicon")(),
  require("metascraper-amazon")(),
  require("metascraper-youtube")(),
  require("metascraper-soundcloud")(),
  require("metascraper-video")(),
]);

export default async function handler(req, res) {
  const targetUrl = parse(req.url, true).query?.url;

  console.log('asdf', parse(req.url || ""));
  console.log('targetUrl', targetUrl);

  if (!targetUrl) {
    res
      .status(401)
      .send('Please provide a valid URL in the "url" query parameter.');
    return;
  }

  try {
    const { body: html, url } = await got(targetUrl);
    const metadata = await metascraper({ html, url });
    res.setHeader("Cache-Control", "s-maxage=3600");
    res.status(200).json(metadata);
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: `Unable to scrape "${url}".` });
  }
}
