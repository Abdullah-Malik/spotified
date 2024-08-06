import { ReadWriteBaseClient } from "client";
import { 
    GetTrackParams as GetMarketParams,
    OptionalUserSavedTrackParams as GetSavedEpisodeParams, 
} from "types";
import { 
    Episode as EpisodeDetails,
    Episodes as EpisodesDetails,
    UserSavedEpisodes,
} from "types/episodes.types";
import joinIdsArrayToString from "utils";

export class Episode extends ReadWriteBaseClient {

    getEpisode(episodeId: string, optionalParams?: GetMarketParams){
        return this.get<EpisodeDetails>(`/episodes/${episodeId}`,optionalParams);
    }

    getSeveralEpisodes(episodeIds: string[], optionalParams?: GetMarketParams){
        return this.get<EpisodesDetails>(`/tracks`, { episodeIds: joinIdsArrayToString(episodeIds), ...optionalParams });
    }

    getUsersSavedEpisodes(optionalParams?: GetSavedEpisodeParams){
        this.get<UserSavedEpisodes>(`/me/episodes`,optionalParams);
    }

    saveEpisodesforUser(episodeIds: string[]){
        return this.put(`/me/episodes`, { episodeIds: joinIdsArrayToString(episodeIds) });
    }

    removeUsersEpisodes(episodeIds: string[]){
        return this.delete(`/me/episodes`, { episodeIds: joinIdsArrayToString(episodeIds) });
    }

    checkUsersSavedEpisodes(episodeIds: string[]){
        return this.get<Array<boolean>>(`/me/episodes/contains`, { episodeIds: joinIdsArrayToString(episodeIds) });
    }
}
