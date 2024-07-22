const axios = require('axios');
const { shortUrl } = require('./shortUrl');

jest.mock('axios');

describe('shortUrl', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules(); // Clears any cache
    process.env = { ...originalEnv }; // Preserves original env variables
  });

  afterAll(() => {
    process.env = originalEnv; // Restores original env variables
  });

  it('should return short URL on success', async () => {
    process.env.SHRTFLY_KEY = 'dummyKey';

    const longUrl = 'https://example.com';
    const alias = ''
    const responseData = {
      status: 'success',
      result: {
        original_url: 'https://example.com',
        shorten_url: 'https://stfly.biz/7byhs',
        stats_url: 'https://shrtfly.com/publisher/stats/16/7byhs',
      },
    };

    axios.get.mockResolvedValue({ data: responseData });

    const result = await shortUrl(longUrl);

    expect(result).toEqual(responseData);
    expect(axios.get).toHaveBeenCalledWith(
      `https://shrtfly.com/api?api=dummyKey&url=${longUrl}&format=json&type=1`
    );
  });

  it('should return API key error', async () => {
    process.env.SHRTFLY_KEY = 'dummyKey';

    const longUrl = 'https://example.com';
    const responseData = {
      status: 'error',
      result: 'API key not valid. Please pass a valid API key.',
    };

    axios.get.mockResolvedValue({ data: responseData });

    try {
      await shortUrl(longUrl);
    } catch (error) {
        console.log("ERRORRR,", error)
      expect(error).toEqual({
        status: 'error',
        result: 'API key not valid. Please pass a valid API key.',
      });
    }
  });

  it('should return URL error', async () => {
    process.env.SHRTFLY_KEY = 'dummyKey';

    const longUrl = 'https://example.com';
    const responseData = {
      status: 'error',
      result: 'Please enter a valid URL.',
    };

    axios.get.mockResolvedValue({ data: responseData });

    try {
      await shortUrl(longUrl);
    } catch (error) {
      expect(error).toEqual({
        status: 'error',
        result: 'Please enter a valid URL.',
      });
    }
  });

  it('should handle axios request error', async () => {
    process.env.SHRTFLY_KEY = 'dummyKey';

    const longUrl = 'https://example.com';
    const errorMessage = 'Network Error';

    axios.get.mockRejectedValue(new Error(errorMessage));

    try {
      await shortUrl(longUrl);
    } catch (error) {
      expect(error).toEqual({
        status: 'error',
        message: errorMessage,
      });
    }
  });
});
