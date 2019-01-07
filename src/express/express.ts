import express, { Request } from 'express'

interface IKexRequest extends Request {
  user?: { name: string, id: string }
}

const getExpress = () => express()
export { getExpress, IKexRequest }
