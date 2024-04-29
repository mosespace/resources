"use server";
import { parse } from "node-html-parser";
import fetch from "node-fetch";

// Function to fetch OG image from URL
export async function fetchOGImage(url: string) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const root = parse(html);
    // console.log(root);
    const ogImageElement = root.querySelector('meta[property="og:image"]');

    if (ogImageElement) {
      return ogImageElement.getAttribute("content");
    }
  } catch (error) {
    console.error("Error fetching OG image:", error);
  }
  return null;
}
