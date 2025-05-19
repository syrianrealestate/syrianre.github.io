// generate-sitemap.js
const {
  SitemapStream,
  streamToPromise,
} = require("sitemap");
const {
  createWriteStream,
} = require("fs");

// Replace this with your real domain
const hostname =
  "https://syrianre.com";

// List of all the routes you want in the sitemap
const pages =
  [
    "/",
  ];

// Create a sitemap stream
const sitemap =
  new SitemapStream(
    {
      hostname,
    }
  );

// Pipe the stream to a file
const writeStream =
  createWriteStream(
    "./public/sitemap.xml"
  );
sitemap.pipe(
  writeStream
);

// Add each URL
pages.forEach(
  (
    page
  ) => {
    sitemap.write(
      {
        url: page,
        changefreq:
          "weekly",
        priority: 0.8,
      }
    );
  }
);

sitemap.end();

// Optional: Confirm completion
streamToPromise(
  sitemap
).then(
  () => {
    console.log(
      "✅ Sitemap generated at ./public/sitemap.xml"
    );
  }
);
