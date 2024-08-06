import { ExternalUrls, Image, Restrictions } from "./shared.types";

interface ResumePoint {
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