import { getContentfulClient } from "../../../lib/contentful";

export default async (req, res) => {
  const id = req.query.id;
  const entry = await getContentfulClient(true).getEntry(id);
  const contentHtml = entry.fields.modoDePreparo;
  res.json({
    id,
    entry,
    contentHtml,
  });
};
