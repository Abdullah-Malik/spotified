import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';
import { GetChapterOptionalParams, Chapter as ChapterDetail } from '../types';
import joinIdsArrayToString from '../utils';

export default class Chapter extends ReadWriteBaseClient {
  /**
   * Get Spotify catalog information for a single audiobook chapter. Chapters are only available within
   * the US, UK, Canada, Ireland, New Zealand and Australia markets.
   * https://developer.spotify.com/documentation/web-api/reference/get-a-chapter
   */
  getChapter(id: string, optionalParams?: GetChapterOptionalParams) {
    return this.get<ChapterDetail>(`/chapters/${id}`, optionalParams);
  }

  /**
   * Get Spotify catalog information for several audiobook chapters identified by their Spotify IDs.
   * Chapters are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.
   * https://developer.spotify.com/documentation/web-api/reference/get-several-chapters
   */
  getSeveralChapters(ids: string[], optionalParams?: GetChapterOptionalParams) {
    return this.get<ChapterDetail[]>(`/chapters`, { ids: joinIdsArrayToString(ids), ...optionalParams });
  }
}
