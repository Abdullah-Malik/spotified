import joinIdsArrayToString from '../utils';
import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';
import { 
    GetTrackParams as GetMarketParams,
    PaginationParams,
    Show as ShowDetails,
    Shows as ShowsDetails,
    UserSavedShows, 
} from "../types";

export class Show extends ReadWriteBaseClient{
    /**
     * Get Spotify catalog information for a single show identified by its unique Spotify ID.
     * https://developer.spotify.com/documentation/web-api/reference/get-a-show
     */
    getShow(showId: string, optionalParams?: GetMarketParams){
        return this.get<ShowDetails>(`/episodes/${showId}`,optionalParams);
    }

    /**
     * Get Spotify catalog information for several shows based on their Spotify IDs.
     * https://developer.spotify.com/documentation/web-api/reference/get-multiple-shows
     */
    getSeveralShows(showIds: string[], optionalParams?: GetMarketParams){
        return this.get<ShowsDetails>(`/shows`, { showIds: joinIdsArrayToString(showIds), ...optionalParams });
    }

    /**
     * Get Spotify catalog information about an show’s episodes. Optional parameters can be used to limit the number of episodes returned.
     * https://developer.spotify.com/documentation/web-api/reference/get-a-shows-episodes
     */
    getShowsEpisodes(){}

    /**
     * Get a list of shows saved in the current Spotify user's library. Optional parameters can be used to limit the number of shows returned.
     * https://developer.spotify.com/documentation/web-api/reference/get-users-saved-shows
     */
    getUsersSavedShows(optionalParams?: PaginationParams){
        this.get<UserSavedShows>(`/me/shows`,optionalParams);
    }

    /**
     * Save one or more shows to current Spotify user's library.
     * https://developer.spotify.com/documentation/web-api/reference/save-shows-user
     */
    saveShowsForUser(){}

    /**
     * Delete one or more shows from current Spotify user's library.
     * https://developer.spotify.com/documentation/web-api/reference/remove-shows-user
     */
    removeUsersShows(){}

    /**
     * Check if one or more shows is already saved in the current Spotify user's library.
     * https://developer.spotify.com/documentation/web-api/reference/check-users-saved-shows
     */
    checkUsersSavedShows(showIds: string[]){
        return this.get<Array<boolean>>(`/me/episodes/contains`, { showIds: joinIdsArrayToString(showIds) });
    }//this also need %2c instead of , that joinIdsArray does, this needs something like query parameter sruff, check track,search,episodes for the same thing 
}