import { joinIdsArrayToString, generateQueryParametersString, encodeStringToBase64 } from '../src/utils';

describe('utils', () => {
  describe('joinIdsArrayToString', () => {
    it('should encode an array of strings to a URI-compatible string', () => {
      const input = ['item1', 'item2', 'item3'];
      const expected = 'item1,item2,item3';
      const result = joinIdsArrayToString(input);
      expect(result).toBe(expected);
    });

    it('should handle an empty array', () => {
      const input: string[] = [];
      const expected = '';
      const result = joinIdsArrayToString(input);
      expect(result).toBe(expected);
    });
  });

  describe('generateQueryParametersString', () => {
    it('should generate a query string from an object of parameters', () => {
      const input = {
        param1: 'value1',
        param2: 123,
        param3: true,
      };
      const expected = '?param1=value1&param2=123&param3=true';
      const result = generateQueryParametersString(input);
      expect(result).toBe(expected);
    });

    it('should generate a query string from an object with one param', () => {
      const input = { param1: 'value1' };
      const expected = '?param1=value1';
      const result = generateQueryParametersString(input);
      expect(result).toBe(expected);
    });

    it('should handle parameters with undefined values', () => {
      const input = {
        param1: 'value1',
        param2: undefined,
        param3: false,
      };
      const expected = '?param1=value1&param3=false';
      const result = generateQueryParametersString(input);
      expect(result).toBe(expected);
    });

    it('should return an empty string for an empty object', () => {
      const input = {};
      const expected = '';
      const result = generateQueryParametersString(input);
      expect(result).toBe(expected);
    });
  });

  describe('encodeStringToBase64', () => {
    const originalBuffer = global.Buffer;
    const originalBtoa = global.btoa;

    afterEach(() => {
      global.Buffer = originalBuffer;
      global.btoa = originalBtoa;
    });

    it('should encode string to base64 using Buffer in Node.js environment', () => {
      const input = 'test string';
      const expected = 'dGVzdCBzdHJpbmc=';

      const result = encodeStringToBase64(input);

      expect(result).toBe(expected);
    });

    it('should encode string to base64 using btoa in browser environment', () => {
      (global as any).Buffer = undefined;
      global.btoa = jest.fn().mockReturnValue('bW9jayBlbmNvZGVkIHN0cmluZw==');

      const input = 'test string';
      const expected = 'bW9jayBlbmNvZGVkIHN0cmluZw==';

      const result = encodeStringToBase64(input);

      expect(result).toBe(expected);
      expect(global.btoa).toHaveBeenCalledWith(input);
    });

    it('should handle empty string', () => {
      const input = '';
      const expected = '';

      const result = encodeStringToBase64(input);

      expect(result).toBe(expected);
    });

    it('should handle string with special characters', () => {
      const input = 'Hello, World! 123 #$%';
      const expected = 'SGVsbG8sIFdvcmxkISAxMjMgIyQl';

      const result = encodeStringToBase64(input);

      expect(result).toBe(expected);
    });

    it('should handle Unicode characters', () => {
      const input = '你好, world! 🌍';
      const expected = '5L2g5aW9LCB3b3JsZCEg8J+MjQ==';

      const result = encodeStringToBase64(input);

      expect(result).toBe(expected);
    });
  });
});
