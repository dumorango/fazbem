import * as contentful from "contentful";

const IS_PREVIEW_ENV = Boolean(process.env.IS_PREVIEW);

const contentfulClient = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const contentfulPreviewClient = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  host: "preview.contentful.com",
});

export const getContentfulClient = (isPreview) =>
  isPreview || IS_PREVIEW_ENV ? contentfulPreviewClient : contentfulClient;

export default (req, res) => {
  res.statusCode = 200;
  res.json({ name: "Eduard Alves" });
};
