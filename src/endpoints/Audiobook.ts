import joinIdsArrayToString from '../utils';
import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';
import {
    OptionalUserSavedTrackParams as OptionalMarketParams, 
    Audiobook as AudiobookDetails,
    Audiobooks as AudiobooksDetails,
} from '../types';

export class Audiobook extends ReadWriteBaseClient{
    /**
     * Get Spotify catalog information for a single audiobook. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.
     * https://developer.spotify.com/documentation/web-api/reference/get-an-audiobook
     */
    getAudiobook(id: string, optionalParams?: OptionalMarketParams) {
        return this.get<AudiobookDetails>(`/audiobooks/${id}`, optionalParams);
    }

    /**
     * Get Spotify catalog information for several audiobooks identified by their Spotify IDs. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.
     * https://developer.spotify.com/documentation/web-api/reference/get-multiple-audiobooks
     */
    getAudiobooks(ids: string[], optionalParams?: OptionalMarketParams) {
        return this.get<AudiobooksDetails>(`/audiobooks`,{ids: joinIdsArrayToString(ids), ...optionalParams});
    }


}