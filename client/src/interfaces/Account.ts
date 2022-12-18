import { Artist } from "./Artist";
import { Tag } from "./Tag";

export interface Account {
  _id: string,
  username: string,
  artists: Array<Artist>,
  tags: Array<Tag>,
}