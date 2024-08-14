import { SimplifiedChapter } from './chapter.types';
import { PaginationResponseProps } from './paginator.types';
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

export interface Audiobook extends SimplifiedAudiobook {
    chapters: {items: SimplifiedChapter[]} & PaginationResponseProps;
}

export interface Audiobooks {
    audiobooks: Audiobook[]
}

export interface UserSavedAudiobooks extends PaginationResponseProps {
    items: SimplifiedAudiobook[];
}

export interface AudiobookChapters extends PaginationResponseProps {
    items: SimplifiedChapter[];
}
