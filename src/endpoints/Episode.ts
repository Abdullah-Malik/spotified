import { ReadWriteBaseClient } from "../client/ReadWriteBaseClient";
import { 
    GetTrackParams as GetMarketParams,
    OptionalUserSavedTrackParams as GetSavedEpisodeParams,
    Episode as EpisodeDetails,
    Episodes as EpisodesDetails,
    UserSavedEpisodes, 
} from "../types";
import joinIdsArrayToString from "../utils";

export class Episode extends ReadWriteBaseClient {

    getEpisode(episodeId: string, optionalParams?: GetMarketParams){
        return this.get<EpisodeDetails>(`/episodes/${episodeId}`,optionalParams);
    }

    getSeveralEpisodes(episodeIds: string[], optionalParams?: GetMarketParams){
        return this.get<EpisodesDetails>(`/episodes`, { episodeIds: joinIdsArrayToString(episodeIds), ...optionalParams });
    }

    getUsersSavedEpisodes(optionalParams?: GetSavedEpisodeParams){
        this.get<UserSavedEpisodes>(`/me/episodes`,optionalParams);
    }

    saveEpisodesForUser(episodeIds: string[]){
        return this.put(`/me/episodes`, { episodeIds: joinIdsArrayToString(episodeIds) });
    }//not good

    removeUsersEpisodes(episodeIds: string[]){
        return this.delete(`/me/episodes`, { episodeIds: joinIdsArrayToString(episodeIds) });
    }//not good, the join should be with %2c check track too

    checkUsersSavedEpisodes(episodeIds: string[]){
        return this.get<Array<boolean>>(`/me/episodes/contains`, { episodeIds: joinIdsArrayToString(episodeIds) });
    }
}
