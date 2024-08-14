import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';
import { 
    GetTrackParams as GetMarketParams,
    Chapter as ChapterDetails,
    Chapters as ChaptersDetails,
} from '../types';
import joinIdsArrayToString from '../utils';

export class Chapter extends ReadWriteBaseClient{
    /**
     * Get Spotify catalog information for a single audiobook chapter. Chapters are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.
     * https://developer.spotify.com/documentation/web-api/reference/get-a-chapter
     */
    getChapter(chapterId: string, optionalParams?: GetMarketParams){
        return this.get<ChapterDetails>(`/chapters/${chapterId}`,{...optionalParams});
    }

    /**
     * Get Spotify catalog information for several audiobook chapters identified by their Spotify IDs. Chapters are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.
     * https://developer.spotify.com/documentation/web-api/reference/get-several-chapters
     */
    getSeveralChapters(chapterIds: string[], optionalParams?: GetMarketParams){
        return this.get<ChaptersDetails>(`/chapters`,{chapterIds: joinIdsArrayToString(chapterIds), ...optionalParams});
    }
}