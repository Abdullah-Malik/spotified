import { ReadWriteBaseClient } from "../client/ReadWriteBaseClient";
import { 
    GetTrackParams as GetMarketParams,
    Chapter as ChapterDetails,
    Chapters as ChaptersDetails,
} from "../types";
import joinIdsArrayToString from "../utils";

export class Chapter extends ReadWriteBaseClient{
    
    getChapter(chapterId: string, optionalParams?: GetMarketParams){
        return this.get<ChapterDetails>(`/chapters/${chapterId}`,{...optionalParams});
    }

    getSeveralChapters(chapterIds: string[], optionalParams?: GetMarketParams){
        return this.get<ChaptersDetails>(`/chapters`,{chapterIds: joinIdsArrayToString(chapterIds), ...optionalParams});
    }
}