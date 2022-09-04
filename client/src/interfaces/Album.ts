import { Image } from "./Image";

export interface Album {
  id: string,
  name: string,
  images: Array<Image>,
  external_urls: { spotify: string },
  release_date: string,
}