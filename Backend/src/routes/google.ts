
import { Request, Response, Router } from 'express';
import logger from '../../utils/logger.js';
import 'dotenv/config'
import { getGoogleOAuthTokens } from '../services/userService.js';
const googleRouter = Router();

const redirectURI = "http://localhost:3000/api/sessions/oauth/google"

const getGoogleAuthURL = async () => {
  // const { default: queryString } = await import('query-string');
  const rootURL = "https://accounts.google.com/o/oauth2/v2/auth"
  const options = {
    redirect_uri: `${redirectURI}`,
    client_id: process.env.GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  }

  const qs = new URLSearchParams(options)

  return `${rootURL}?${qs.toString()}`
}

googleRouter.get("/", async (_req: Request, res: Response) => {

  try {
    //get the code form the query string
    const code = _req.query.code as string
    console.log('code: ', code)
    //get the id and access token with the code
    const { id_token, access_token } = await getGoogleOAuthTokens({ code })
    console.log("id token and access token: ", { id_token, access_token })

    //get user with tokens

    //upsert the user

    //create a session

    //create access $ refresh tokens

    //set cookies

    //reditect back to client

  } catch (e) {
    logger.error(e, 'failed to authorize google user')
    return res.redirect(`http://localhost:5173`)
  }

})

export default googleRouter