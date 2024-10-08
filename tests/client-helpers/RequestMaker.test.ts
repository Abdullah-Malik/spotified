import fetchMock from 'fetch-mock';
import RequestMaker from '../../src/client-helpers/RequestMaker';
import { NetworkError, SpotifyApiError } from '../../src/errors';

const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

describe('RequestMaker', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should set bearer token in constructor', () => {
    const token = { bearerToken: 'test_token' };
    const requestMaker = new RequestMaker(token);
    expect(requestMaker['bearerToken']).toBe('test_token');
  });

  it('should set bearer token using setBearerToken method', () => {
    const requestMaker = new RequestMaker();
    requestMaker.setBearerToken('new_token');
    expect(requestMaker['bearerToken']).toBe('new_token');
  });

  it('should send a request with default headers', async () => {
    const requestMaker = new RequestMaker({ bearerToken: 'test_token' });

    fetchMock.mock(`${SPOTIFY_API_URL}/test`, {
      status: 200,
      body: { message: 'success' },
    });

    const response = await requestMaker.makeRequest({
      url: '/test',
      method: 'GET',
    });

    expect(response.data).toEqual({ message: 'success' });
    expect(fetchMock.calls()).toHaveLength(1);
    expect(fetchMock.lastCall()?.[1]?.headers).toMatchObject({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer test_token',
    });
    expect(fetchMock.lastCall()?.[0]).toBe(`${SPOTIFY_API_URL}/test`);
  });

  it('should override default headers with custom headers', async () => {
    const requestMaker = new RequestMaker({ bearerToken: 'test_token' });

    fetchMock.mock(`${SPOTIFY_API_URL}/test`, {
      status: 200,
      body: { message: 'success' },
    });

    const response = await requestMaker.makeRequest({
      url: '/test',
      method: 'GET',
      headers: {
        'Content-Type': 'application/xml',
        'Authorization': 'CustomAuth',
      },
    });

    expect(response.data).toEqual({ message: 'success' });
    expect(fetchMock.calls()).toHaveLength(1);
    expect(fetchMock.lastCall()?.[1]?.headers).toMatchObject({
      'Content-Type': 'application/xml',
      'Authorization': 'CustomAuth',
    });
  });

  it('should send a request with complete URL', async () => {
    const requestMaker = new RequestMaker({ bearerToken: 'test_token' });

    fetchMock.mock('https://custom-url.com/api/endpoint', {
      status: 200,
      body: { message: 'success' },
    });

    const response = await requestMaker.makeRequest({
      url: 'https://custom-url.com/api/endpoint',
      method: 'GET',
    });

    expect(response.data).toEqual({ message: 'success' });
    expect(fetchMock.calls()).toHaveLength(1);
    expect(fetchMock.lastCall()?.[0]).toBe('https://custom-url.com/api/endpoint');
  });

  it('should send application/x-www-form-urlencoded data correctly', async () => {
    const requestMaker = new RequestMaker({ bearerToken: 'test_token' });

    fetchMock.mock(`${SPOTIFY_API_URL}/test`, {
      status: 200,
      body: { message: 'success' },
    });

    await requestMaker.makeRequest({
      url: '/test',
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: { key1: 'value1', key2: 'value2' },
    });

    const lastCall = fetchMock.lastCall();
    expect(lastCall?.[1]?.body).toBe('key1=value1&key2=value2');
    expect(lastCall?.[1]?.headers).toMatchObject({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
  });

  it('should send application/json data correctly', async () => {
    const requestMaker = new RequestMaker({ bearerToken: 'test_token' });

    fetchMock.mock(`${SPOTIFY_API_URL}/test`, {
      status: 200,
      body: { message: 'success' },
    });

    await requestMaker.makeRequest({
      url: '/test',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: { key1: 'value1', key2: 'value2' },
    });

    const lastCall = fetchMock.lastCall();
    expect(JSON.parse(lastCall?.[1]?.body as string)).toEqual({ key1: 'value1', key2: 'value2' });
    expect(lastCall?.[1]?.headers).toMatchObject({
      'Content-Type': 'application/json',
    });
  });

  it('should use JSON.stringify by default if no Content-Type is specified', async () => {
    const requestMaker = new RequestMaker({ bearerToken: 'test_token' });

    fetchMock.mock(`${SPOTIFY_API_URL}/test`, {
      status: 200,
      body: { message: 'success' },
    });

    await requestMaker.makeRequest({
      url: '/test',
      method: 'POST',
      data: { key1: 'value1', key2: 'value2' },
    });

    const lastCall = fetchMock.lastCall();
    expect(JSON.parse(lastCall?.[1]?.body as string)).toEqual({ key1: 'value1', key2: 'value2' });
    expect(lastCall?.[1]?.headers).toMatchObject({
      'Content-Type': 'application/json',
    });
  });

  it('should handle empty data', async () => {
    const requestMaker = new RequestMaker({ bearerToken: 'test_token' });

    fetchMock.mock(`${SPOTIFY_API_URL}/test`, {
      status: 200,
      body: { message: 'success' },
    });

    await requestMaker.makeRequest({
      url: '/test',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const lastCall = fetchMock.lastCall();
    expect(lastCall?.[1]?.body).toBeUndefined();
  });

  it('should throw SpotifyApiError on non-200 response', async () => {
    const requestMaker = new RequestMaker({ bearerToken: 'test_token' });

    fetchMock.mock(`${SPOTIFY_API_URL}/test`, {
      status: 400,
      body: { error: 'bad request' },
    });

    await expect(
      requestMaker.makeRequest({
        url: '/test',
        method: 'GET',
      })
    ).rejects.toThrow(SpotifyApiError);
  });

  it('should handle network errors', async () => {
    const requestMaker = new RequestMaker({ bearerToken: 'test_token' });

    fetchMock.mock(`${SPOTIFY_API_URL}/test`, {
      throws: new TypeError('Failed to fetch'),
    });

    await expect(
      requestMaker.makeRequest({
        url: '/test',
        method: 'GET',
      })
    ).rejects.toThrow(NetworkError);
  });
});
