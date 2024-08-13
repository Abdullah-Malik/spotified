import { SimplifiedEpisode } from "./episode.types";
import { PaginationResponseProps } from "./paginator.types";
import { Copyright, ExternalUrls, Image } from "./shared.types";

export interface SimplifiedShow {
    available_markets : string[];
    copyrights: Copyright[];
    description: string;
    html_description: string;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    is_externally_hosted: boolean;
    languages: string[];
    media_type: string;
    name: string;
    publisher: string;
    type: string;
    uri: string;
    total_episodes: number;
}

export interface Show extends SimplifiedShow {
    episodes: (SimplifiedEpisode[] & PaginationResponseProps)
}

export interface Shows {
    shows: SimplifiedShow[];
}

export interface ShowEpisodes extends PaginationResponseProps {
    items: SimplifiedEpisode[];
}

interface SavedShows {
    added_at: string;
    show: SimplifiedShow;  
}

export interface UserSavedShows extends PaginationResponseProps {
    items: SavedShows[];
}