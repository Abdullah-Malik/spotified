import { SimplifiedAudiobook } from './audiobook.types.js';
import { ExternalUrls, Image, OptionalParams, Restrictions, ResumePoint } from './shared.types.js';

export interface SimplifiedChapter {
  audio_preview_url: string | null;
  available_markets?: string[];
  chapter_number: number;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_playable: boolean;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string;
  resume_point?: ResumePoint;
  type: string;
  uri: string;
  restrictions?: Restrictions;
}

export interface Chapter extends SimplifiedChapter {
  audiobook: SimplifiedAudiobook;
}

export interface Chapters {
  chapters: Chapter[];
}

export type GetChapterOptionalParams = OptionalParams;
