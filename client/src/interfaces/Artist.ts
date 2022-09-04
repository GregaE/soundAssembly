import { Tag } from "./Tag";
import { Image } from "./Image";

export interface Artist {
  id: string,
  name: string,
  artistTags: Array<Tag>,
  followers: { total: number },
  images: Array<Image>,
  external_urls?: { spotify: string },
  _id?: string,
}