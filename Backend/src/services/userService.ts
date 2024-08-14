import config from 'config'
import logger from "../../utils/logger.js";
import UserModel from '../models/user.js';
import axios from 'axios'
import qs from 'querystring'
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import mongoose from 'mongoose';


interface GoogleTokensResult {
  access_token: string,
  expires_in: Number,
  refresh_token: string,
  scope: string,
  id_token: string
}

interface GoogleUserResult {
  id: string,
  email: string,
  verified_email: boolean,
  name: string,
  given_name: string,
  family_name: string,
  picture: string,
  locale: string
}

interface UserDocument extends mongoose.Document {
  email: string,
  name: string,
  password: string,
  createdAt: Date,
  updatedAt: Date,
  comparePassword(candidatePassword: string): Promise<Boolean>
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

export async function getGoogleUser({ id_token, access_token }): Promise<GoogleUserResult> {
  try {
    const res = await axios.get<GoogleUserResult>(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
      headers: {
        Authorization: `Bearer ${id_token}`
      }
    })
    return res.data
  } catch (error: any) {
    logger.error(error, "Error fetching google user")
    throw new Error(error.message)
  }
}

export async function findAndUpdateUser(query: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>, options: QueryOptions = {}) {
  const existingOrNewUser = UserModel.findOneAndUpdate(query, update, options)
  return existingOrNewUser
}