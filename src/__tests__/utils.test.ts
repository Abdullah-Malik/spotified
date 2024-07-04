import { joinIdsArrayToString, generateQueryParametersString } from '../utils';

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
});
