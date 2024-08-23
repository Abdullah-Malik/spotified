import { Track } from './track.types.js';
import { PaginationParams, PaginationResponseProps } from './shared.types.js';
import { SimplifiedAlbum } from './album.types.js';
import { Artist } from './artist.types.js';
import { SimplifiedPlaylist } from './playlist.types.js';
import { SimplifiedShow } from './show.types.js';
import { SimplifiedEpisode } from './episode.types.js';
import { SimplifiedAudiobook } from './audiobook.types.js';

export interface SearchOptionalParams extends PaginationParams {
  market?: string;
  include_external?: string;
}

export interface SearchResponse {
  tracks?: { items: Track[] } & PaginationResponseProps;
  artists?: { items: Artist[] } & PaginationResponseProps;
  albums?: { items: SimplifiedAlbum[] } & PaginationResponseProps;
  playlists?: { items: SimplifiedPlaylist[] } & PaginationResponseProps;
  shows?: { items: SimplifiedShow[] } & PaginationResponseProps;
  episodes?: { items: SimplifiedEpisode[] } & PaginationResponseProps;
  audiobooks?: { items: SimplifiedAudiobook[] } & PaginationResponseProps;
}
