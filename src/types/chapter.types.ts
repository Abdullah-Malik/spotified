import { SimplifiedAudiobook } from "./audiobooks.types";
import { ResumePoint } from "./episodes.types";
import { ExternalUrls, Image, Restrictions } from "./shared.types";

export interface Chapter {
    audioPreviewUrl: string | null;
    availableMarkets?: string[];
    chapterNumber: number;
    description: string;
    HTMLDescription: string;
    durationMs: number;
    explicit: boolean;
    externalUrls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    isPlayable: boolean;
    languages: string[];
    name: string;
    releaseDate: string;
    releaseDatePrecision: string;    
    resumePoint?: ResumePoint;
    type: string;
    uri: string;
    restrictions?: Restrictions;
    audiobook: SimplifiedAudiobook;
}

export type Chapters = Chapter[];