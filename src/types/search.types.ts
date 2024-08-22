import { Track } from './track.types';
import { PaginationParams, PaginationResponseProps } from './shared.types';
import { SimplifiedAlbum } from './album.types';
import { Artist } from './artist.types';
import { SimplifiedPlaylist } from './playlist.types';
import { SimplifiedShow } from './show.types';
import { SimplifiedEpisode } from './episode.types';
import { SimplifiedAudiobook } from './audiobook.types';

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
