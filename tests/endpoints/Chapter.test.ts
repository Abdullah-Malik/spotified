import { Chapter } from '../../src/endpoints/Chapter';
import { joinIdsArrayToString } from '../../src/utils';
import { GetChapterOptionalParams, Chapter as ChapterDetail } from '../../src/types';

jest.mock('../../src/client/ReadWriteBaseClient');
jest.mock('../../src/utils');

describe('Chapter', () => {
  let chapter: Chapter;

  beforeEach(() => {
    chapter = new Chapter({} as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getChapter', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockId = 'chapter123';
      const mockParams: GetChapterOptionalParams = { market: 'US' };
      const mockResponse: ChapterDetail = {
        id: 'chapter123',
        name: 'Test Chapter',
        description: 'This is a test chapter',
        duration_ms: 1800000,
        chapter_number: 1,
        audiobook: {
          id: 'audiobook123',
          name: 'Test Audiobook',
          type: 'audiobook',
          uri: 'spotify:audiobook:audiobook123',
          href: 'https://api.spotify.com/v1/audiobooks/audiobook123',
          images: [
            {
              url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
              height: 300,
              width: 300,
            },
          ],
          available_markets: ['US', 'GB', 'CA'],
          languages: ['en'],
          explicit: false,
          external_urls: {
            spotify: 'https://open.spotify.com/audiobook/audiobook123',
          },
          html_description: '<p>This is a test audiobook</p>',
          description: 'This is a test audiobook',
          authors: [
            {
              name: 'Test Author',
            },
          ],
          narrators: [
            {
              name: 'Test Narrator',
            },
          ],
          publisher: 'Test Publisher',
          media_type: 'audio',
          total_chapters: 10,
          edition: 'Test Edition',
          copyrights: [],
        },
        release_date: '2023-01-01',
        release_date_precision: 'day',
        resume_point: {
          fully_played: false,
          resume_position_ms: 0,
        },
        html_description: '<p>This is a test chapter</p>',
        available_markets: ['US', 'GB', 'CA'],
        type: 'chapter',
        uri: 'spotify:chapter:chapter123',
        href: 'https://api.spotify.com/v1/chapters/chapter123',
        audio_preview_url: 'https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17',
        explicit: false,
        external_urls: {
          spotify: 'https://open.spotify.com/chapter/chapter123',
        },
        images: [
          {
            url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
            height: 300,
            width: 300,
          },
        ],
        is_playable: true,
        languages: ['en'],
        restrictions: {
          reason: 'market',
        },
      };
      (chapter['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await chapter.getChapter(mockId, mockParams);

      expect(chapter['get']).toHaveBeenCalledWith(`/chapters/${mockId}`, mockParams);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getSeveralChapters', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockIds = ['chapter123', 'chapter456'];
      const mockParams: GetChapterOptionalParams = { market: 'US' };
      const mockResponse: ChapterDetail[] = [
        {
          id: 'chapter123',
          name: 'Test Chapter 1',
          type: 'chapter',
        } as ChapterDetail,
        {
          id: 'chapter456',
          name: 'Test Chapter 2',
          type: 'chapter',
        } as ChapterDetail,
      ];
      (joinIdsArrayToString as jest.Mock).mockReturnValue('chapter123,chapter456');
      (chapter['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await chapter.getSeveralChapters(mockIds, mockParams);

      expect(joinIdsArrayToString).toHaveBeenCalledWith(mockIds);
      expect(chapter['get']).toHaveBeenCalledWith('/chapters', { ids: 'chapter123,chapter456', ...mockParams });
      expect(result).toEqual(mockResponse);
    });
  });
});
