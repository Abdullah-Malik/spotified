import { Copyright, ExternalIds, ExternalUrls, Image, Restrictions } from './shared.types';
import { SimplifiedArtist } from './artist.types';

/* FIXME: check for optional props + add the missing props from 
https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums 
*/

export interface SimplifiedAlbum {
  album_group?: string;
  album_type: string;
  artists: SimplifiedArtist[];
  available_markets: string[];
  copyrights?: Copyright[]; // not exist in simplified form, but is present in the main album
  external_ids?: ExternalIds; // not exist in simplified form, but is present in the main album
  external_urls: ExternalUrls;
  genres?: string[]; // not exist in simplified form, but is present in the main album
  href: string;
  id: string;
  images: Image[];
  label?: string;
  name: string;
  popularity?: number;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
  restrictions?: Restrictions;
}
