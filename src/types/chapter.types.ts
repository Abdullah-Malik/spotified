import { SimplifiedAudiobook } from './audiobook.types';
import { OptionalParams, ResumePoint, ExternalUrls, Image, Restrictions } from './shared.types';

export interface Chapter {
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
  audiobook: SimplifiedAudiobook;
}

export type GetChapterOptionalParams = OptionalParams;

export type Chapters = Chapter[];
