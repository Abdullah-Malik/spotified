import { ReadWriteBaseClient } from "client";
import { GetTrackParams as GetMarketParams } from "types";
import { 
    Chapter as ChapterDetails,
    Chapters as ChaptersDetails,
} from "types/chapter.types";
import joinIdsArrayToString from "utils";

export class Chapter extends ReadWriteBaseClient{
    getChapter(chapterId: string, optionalParams?: GetMarketParams){
        return this.get<ChapterDetails>(`/chapters/${chapterId}`,{...optionalParams});
    }

    getSeveralChapters(chapterIds: string[], optionalParams?: GetMarketParams){
        return this.get<ChaptersDetails>(`/chapters`,{chapterIds: joinIdsArrayToString(chapterIds), ...optionalParams});
    }
}