const { parse } = require("url");
const NextCors = require("nextjs-cors").default;
const fetch = require("node-fetch");
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
  require("metascraper-youtube")(),
  require("metascraper-soundcloud")(),
  require("metascraper-video")(),
]);
const url = require("url");

function isValidHttpUrl(str) {
  let url;
  try {
    url = new URL(str);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const targetUrl = parse(req.url, true).query?.url;

  if (!targetUrl || !isValidHttpUrl(targetUrl)) {
    res
      .status(400)
      .send('Please provide a valid URL in the "url" query parameter.');
    return;
  }

  try {
    const response = await fetch(targetUrl);
    let html = ``;
    for await (const chunk of response.body) {
      // Stream the response until we find the end of the </head> tag (we don't
      // need to fetch the entire HTML response).
      html += chunk.toString();
      if (html.includes(`</head>`)) break;
    }
    const metadata = await metascraper({ html, url: targetUrl });
    res.setHeader("Cache-Control", "s-maxage=3600");
    res.status(200).json(metadata);
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: `Unable to scrape "${url}".` });
  }
}
