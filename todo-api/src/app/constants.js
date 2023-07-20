const REST_OAUTH_CLIENT = 'RestOAuthClient';
const REST_OAUTH_SECRET = 'CUgJN8RcZOIJ1k641C8At5Wv';
const AM_URL = 'https://cdk.example.com/am';
const REALM_PATH = 'root';

const CONFIDENTIAL_CLIENT = Buffer.from(
  `${REST_OAUTH_CLIENT}:${REST_OAUTH_SECRET}`,
).toString('base64');

module.exports = {
  REST_OAUTH_CLIENT,
  REST_OAUTH_SECRET,
  AM_URL,
  REALM_PATH,
  CONFIDENTIAL_CLIENT
};
