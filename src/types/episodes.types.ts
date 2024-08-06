import { PaginationResponseProps } from "./paginator.types";
import {  ExternalUrls, Image, Restrictions } from "./shared.types";
import { SimplifiedShow } from "./shows.types";

export interface ResumePoint {
    fullyPlayed?: boolean;
    resumePointMS?: number;
}

export interface SimplifiedEpisode {
    audioPreviewUrl: string | null;
    description: string;
    HTMLDescription: string;
    durationMs: number;
    explicit: boolean;
    externalUrls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    isExternallyHosted: boolean;
    isPlayable: boolean;
    languages: string[];
    name: string;
    releaseDate: string;
    releaseDatePrecision: string;    
    resumePoint?: ResumePoint;
    type: string;
    uri: string;
    restrictions: Restrictions;
}

export interface Episode extends SimplifiedEpisode {
    show: SimplifiedShow;
}

export interface Episodes {
    episodes: Episode[];
}

interface SavedEpisode {
    added_at: string;
    episode: Episode;  
}

export interface UserSavedEpisodes extends PaginationResponseProps {
    items: SavedEpisode[];
}