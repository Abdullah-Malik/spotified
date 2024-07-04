import { encodeStringArrayToURI, generateQueryParametersString } from '../../src/utils'; 

describe('encodeStringArrayToURI', () => {
  it('should encode an array of strings to a URI', () => {
    const input = ['hello', 'world'];
    const expectedOutput = 'hello,world';
    expect(encodeStringArrayToURI(input)).toBe(expectedOutput);
  });

  it('should encode an array of strings to a URI-encoded string', () => {
    const input = ['hello', 'world', 'test'];
    const result = encodeStringArrayToURI(input);
    expect(result).toBe('hello,world,test');
  });

  it('should handle an empty array', () => {
    const input: string[] = [];
    const expectedOutput = '';
    expect(encodeStringArrayToURI(input)).toBe(expectedOutput);
  });

  it('should encode special characters', () => {
    const input = ['hello world', 'foo&bar'];
    const expectedOutput = 'hello%20world,foo%26bar';
    expect(encodeStringArrayToURI(input)).toBe(expectedOutput);
  });

  it('should encode special characters in a different test case', () => {
    const input = ['hello world', 'test/slash', 'question?mark'];
    const result = encodeStringArrayToURI(input);
    expect(result).toBe('hello%20world,test%2Fslash,question%3Fmark');
  });
});

describe('generateQueryParametersString', () => {
  it('should generate a query string from a parameters object', () => {
    const input = {
      param1: 'value1',
      param2: 'value2',
      param3: 3,
      param4: true,
    };
    const expectedOutput = '?param1=value1&param2=value2&param3=3&param4=true';
    expect(generateQueryParametersString(input)).toBe(expectedOutput);
  });

  it('should generate a query string from an object', () => {
    const input = { name: 'John', age: 30, active: true };
    const result = generateQueryParametersString(input);
    expect(result).toBe('?name=John&age=30&active=true');
  });

  it('should handle undefined values', () => {
    const input = {
      param1: 'value1',
      param2: undefined,
      param3: 'value3',
    };
    const expectedOutput = '?param1=value1&param3=value3';
    expect(generateQueryParametersString(input)).toBe(expectedOutput);
  });

  it('should ignore undefined values', () => {
    const input = { name: 'John', age: undefined, active: true };
    const result = generateQueryParametersString(input);
    expect(result).toBe('?name=John&active=true');
  });

  it('should return an empty string for an empty object', () => {
    const input = {};
    const expectedOutput = '';
    expect(generateQueryParametersString(input)).toBe(expectedOutput);
  });

  it('should handle special characters', () => {
    const input = {
      'param1': 'hello world',
      'param2': 'foo&bar',
    };
    const expectedOutput = '?param1=hello world&param2=foo&bar';
    expect(generateQueryParametersString(input)).toBe(expectedOutput);
  });

  it('should handle different types of values', () => {
    const input = { string: 'text', number: 42, boolean: false };
    const result = generateQueryParametersString(input);
    expect(result).toBe('?string=text&number=42&boolean=false');
  });
});
