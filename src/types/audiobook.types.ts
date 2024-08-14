import { Copyright, ExternalUrls, Image } from './shared.types';

interface Author {
    name?: string;
}

export interface Narrator {
    name?: string;    
}

export interface SimplifiedAudiobook {
    authors: Author[];
    available_markets: string[];
    copyrights: Copyright[];
    description: string;
    html_description: string;
    edition?: string;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    languages: string[];
    media_type: string;
    name: string;
    narrators: Narrator[];
    publisher: string;
    type: string;
    uri: string;
    total_chapters: number;
}