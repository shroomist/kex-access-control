const request = require('supertest')
const app = require('../../src/app')

describe('/', () => {
  it('returns 200', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
  })
})
