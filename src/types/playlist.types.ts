import { Track } from './track.types';
import { PaginationResponseProps } from './paginator.types';
import { ExternalUrls, Followers, Image } from './shared.types';
import { Episode } from './episode.types';

interface Owner {
    external_urls?: ExternalUrls;
    followers?: Followers;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
    display_name?: string | null;
}

interface AddedBy {
    external_urls?: ExternalUrls;
    followers?: Followers;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
}

interface PlaylistTracks {
    added_at?: string;
    added_by?: AddedBy;
    is_local?: boolean;
    track?: Track | Episode;
}

export interface SimplifiedPlaylist {
    collaborative?: boolean;
    description?: string | null;
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    images?: Image[];
    name?: string;
    owner?: Owner;
    public?: boolean;
    snapshot_id?: string;
    tracks?: ({items: PlaylistTracks[]} & PaginationResponseProps);
    type?: string;
    uri?: string;
}

export interface Playlist extends SimplifiedPlaylist {
    followers?: Followers;
}

export interface UserPlaylist extends PaginationResponseProps{
    items: SimplifiedPlaylist[];
}

export interface FeaturedPlaylist extends UserPlaylist {
    message?: string;
}