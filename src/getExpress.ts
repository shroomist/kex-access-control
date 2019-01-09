import express, { Request } from 'express'
import bodyParser from 'body-parser'
import User from './db/models/users'

interface IKexRequest extends Request {
  user?: User
}

export { IKexRequest }
