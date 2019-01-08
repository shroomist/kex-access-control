import express, { Request } from 'express'
import bodyParser from 'body-parser'
import User from '../db/models/users'

interface IKexRequest extends Request {
  user?: User
}

const getExpress = () => express().use(bodyParser.json())
export { getExpress, IKexRequest }
