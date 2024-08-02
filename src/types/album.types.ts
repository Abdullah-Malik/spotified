import { ExternalUrls, Image, Restrictions } from './shared.types';
import { SimplifiedArtist } from './artist.types';

export interface SimplifiedAlbum {
  album_type: string;
  artists: SimplifiedArtist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: Restrictions;
  total_tracks: number;
  type: string;
  uri: string;
}
