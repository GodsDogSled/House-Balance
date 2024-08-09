import config from 'config'
import logger from "../../utils/logger.js";
import axios from 'axios'
import qs from 'querystring'

interface GoogleTokensResult {
  access_token: string,
  expires_in: Number,
  refresh_token: string,
  scope: string,
  id_token: string
}

export async function getGoogleOAuthTokens({ code }: { code: string }): Promise<GoogleTokensResult> {
  const url = 'https://oauth2.googleapis.com/token'
  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    grant_type: 'authorization_code'
  };

  try {
    console.log('querystring: ', qs.stringify(values))
    const res = await axios.post<GoogleTokensResult>(url, qs.stringify(values)
      , {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });
    return res.data

  } catch (error: any) {
    logger.error(error, "failed to fetch google oauth tokens")
    throw new Error(error.message);
  }
}