import { fetchOGImage } from "@/actions/images";

export default async function handler(req:any, res:any) {
  const { urls } = req.body;

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: "Invalid request" });
  }

  try {
    const images = await Promise.all(urls.map((url) => fetchOGImage(url)));
    res.status(200).json({ images });
  } catch (error) {
    console.error("Error fetching OG images:", error);
    res.status(500).json({ error: "Failed to fetch OG images" });
  }
}
