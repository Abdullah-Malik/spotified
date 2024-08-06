import { ExternalUrls, Followers, Image } from "./shared.types";

interface Owner {
    externalUrls?: ExternalUrls;
    followers?: Followers;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
    displayName?: string | null;
}

interface PlaylistTracks {
    href?: string;
    total?: number;
}

export interface SimplifiedPlaylist {
    collaborative?: boolean;
    description?: string;
    externalUrls?: ExternalUrls;
    href?: string;
    id?: string;
    images?: Image[];
    name?: string;
    owner?: Owner;
    public?: boolean;
    snapshotId?: string;
    tracks?: PlaylistTracks | null;
    type?: string;
    uri?: string;
}