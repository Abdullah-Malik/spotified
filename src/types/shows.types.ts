import { SimplifiedEpisode } from "./episodes.types";
import { PaginationResponseProps } from "./paginator.types";
import { Copyright, ExternalUrls, Image } from "./shared.types";

export interface SimplifiedShow {
    availableMarkets : string[];
    copyrights: Copyright[];
    description: string;
    HTMLdescription: string;
    explicit: boolean;
    externalUrls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    isExternallyHosted: boolean;
    languages: string[];
    mediaType: string;
    name: string;
    publisher: string;
    type: string;
    uri: string;
    totalEpisodes: number;
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