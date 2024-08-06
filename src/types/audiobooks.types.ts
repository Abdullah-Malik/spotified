import { Copyright, ExternalUrls, Image } from "./shared.types";

interface Author {
    name?: string;
}

export interface Narrator {
    name?: string;    
}

export interface SimplifiedAudiobook {
    authors: Author[];
    availableMarkets: string[];
    copyrights: Copyright[];
    description: string;
    HTMLDescription: string;
    edition?: string;
    explicit: boolean;
    externalUrls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    languages: string[];
    mediaType: string;
    name: string;
    narrators: Narrator[];
    publisher: string;
    type: string;
    uri: string;
    totalChapters: number[]
}