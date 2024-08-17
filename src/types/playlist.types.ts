import { ExternalUrls, Followers, Image } from './shared.types';

interface Owner {
    external_urls?: ExternalUrls;
    followers?: Followers;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
    display_name?: string | null;
}

interface PlaylistTracks {
    href?: string;
    total?: number;
}

export interface SimplifiedPlaylist {
    collaborative?: boolean;
    description?: string;
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    images?: Image[];
    name?: string;
    owner?: Owner;
    public?: boolean;
    snapshot_id?: string;
    tracks?: PlaylistTracks | null;
    type?: string;
    uri?: string;
}