import express, { Request } from 'express'
import bodyParser from 'body-parser'

interface IKexRequest extends Request {
  user?: { name: string, id: string }
}

const getExpress = () => express().use(bodyParser.json())
export { getExpress, IKexRequest }
