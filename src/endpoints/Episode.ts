import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';
import { 
    GetTrackParams as GetMarketParams,
    OptionalUserSavedTrackParams as GetSavedEpisodeParams,
    Episode as EpisodeDetails,
    Episodes as EpisodesDetails,
    UserSavedEpisodes, 
} from '../types';
import joinIdsArrayToString from '../utils';

export class Episode extends ReadWriteBaseClient {
    /**
     * Get Spotify catalog information for a single episode identified by its unique Spotify ID.
     * https://developer.spotify.com/documentation/web-api/reference/get-an-episode
     */
    getEpisode(episodeId: string, optionalParams?: GetMarketParams){
        return this.get<EpisodeDetails>(`/episodes/${episodeId}`,optionalParams);
    }

    /**
     * Get Spotify catalog information for several episodes based on their Spotify IDs.
     * https://developer.spotify.com/documentation/web-api/reference/get-multiple-episodes
     */
    getSeveralEpisodes(episodeIds: string[], optionalParams?: GetMarketParams){
        return this.get<EpisodesDetails>(`/episodes`, { episodeIds: joinIdsArrayToString(episodeIds), ...optionalParams });
    }

    /**
     * Get a list of the episodes saved in the current Spotify user's library. This API endpoint is in beta and could change without warning.
     * https://developer.spotify.com/documentation/web-api/reference/get-users-saved-episodes
     */
    getUsersSavedEpisodes(optionalParams?: GetSavedEpisodeParams){
        this.get<UserSavedEpisodes>(`/me/episodes`,optionalParams);
    }

    /**
     * Save one or more episodes to the current user's library. This API endpoint is in beta and could change without warning.
     * https://developer.spotify.com/documentation/web-api/reference/save-episodes-user
     */
    saveEpisodesForUser(episodeIds: string[]){
        return this.put(`/me/episodes`, { episodeIds: joinIdsArrayToString(episodeIds) });
    }//not good

    /**
     * Remove one or more episodes from the current user's library. This API endpoint is in beta and could change without warning.
     * https://developer.spotify.com/documentation/web-api/reference/remove-episodes-user
     */
    removeUsersEpisodes(episodeIds: string[]){
        return this.delete(`/me/episodes`, { episodeIds: joinIdsArrayToString(episodeIds) });
    }//not good, the join should be with %2c check track too

    /**
     * Check if one or more episodes is already saved in the current Spotify user's 'Your Episodes' library. This API endpoint is in beta and could change without warning.
     * https://developer.spotify.com/documentation/web-api/reference/check-users-saved-episodes
     */
    checkUsersSavedEpisodes(episodeIds: string[]){
        return this.get<Array<boolean>>(`/me/episodes/contains`, { episodeIds: joinIdsArrayToString(episodeIds) });
    }
}
