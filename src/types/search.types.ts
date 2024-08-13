import { Tracks } from "./track.types";
import { PaginationParams } from "./shared.types";
import { PaginationResponseProps } from "./paginator.types";
import { SimplifiedAlbum } from "./album.types";
import { Artists } from "./artist.types";
import { SimplifiedPlaylist } from "./playlist.types";
import { SimplifiedShow } from "./show.types";
import { SimplifiedEpisode } from "./episode.types";
import { SimplifiedAudiobook } from "./audiobook.types";

export interface searchOptionalParams extends PaginationParams{
    market?: string;
    includeExternal?: string;
}

export interface searchResponse {
    track?: (Tracks & PaginationResponseProps);
    artist?: (Artists & PaginationResponseProps);
    albums?: (SimplifiedAlbum[] & PaginationResponseProps);
    playlists?: (SimplifiedPlaylist[] & PaginationResponseProps);
    shows?: (SimplifiedShow[] & PaginationResponseProps);
    episodes?: (SimplifiedEpisode[] & PaginationResponseProps);
    audiobooks?: (SimplifiedAudiobook[] & PaginationResponseProps);
}