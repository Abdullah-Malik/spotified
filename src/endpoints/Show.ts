import joinIdsArrayToString from "utils";
import { ReadWriteBaseClient } from "../client/ReadWriteBaseClient";
import { 
    GetTrackParams as GetMarketParams,
    PaginationParams,
    Show as ShowDetails,
    Shows as ShowsDetails,
    UserSavedShows, 
} from "../types";

export class Show extends ReadWriteBaseClient{
    getShow(showId: string, optionalParams?: GetMarketParams){
        return this.get<ShowDetails>(`/episodes/${showId}`,optionalParams);
    }

    getSeveralShows(showIds: string[], optionalParams?: GetMarketParams){
        return this.get<ShowsDetails>(`/shows`, { showIds: joinIdsArrayToString(showIds), ...optionalParams });
    }

    getShowsEpisodes(){}

    getUsersSavedShows(optionalParams?: PaginationParams){
        this.get<UserSavedShows>(`/me/shows`,optionalParams);
    }

    saveShowsForUser(){}

    removeUsersShows(){}

    checkUsersSavedShows(showIds: string[]){
        return this.get<Array<boolean>>(`/me/episodes/contains`, { showIds: joinIdsArrayToString(showIds) });
    }//this also need %2c instead of , that joinIdsArray does, this needs something like query parameter sruff, check track,search,episodes for the same thing 
}