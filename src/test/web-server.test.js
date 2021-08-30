/**
 * @difficultyLevel 3
 * @tags async
 */

import got from 'got'
import { basename } from 'path'

const modName = basename(__filename, '.test.js')

const client = got.extend({
  responseType: 'json',
  retry: 0,
  throwHttpErrors: false,
})

describe('web server', () => {
  let webServerFactory
  beforeAll(async () => {
    ;({ webServerFactory } = await import(`../main/${modName}`))
    expect(typeof webServerFactory).toBe('function')
  })
  describe('lifecycle', () => {
    test('should start and stop the server given port value of 3000', async () => {
      // Given
      const webServer = webServerFactory(3000)
      // When
      try {
        await webServer.start()
        // Then
        const { statusCode } = await client(`http://localhost:${webServer.address.port}/notfound`)
        expect(statusCode).toBe(404)
      } finally {
        await webServer.stop()
      }
      // Then
      const promise = client(`http://localhost:${webServer.address.port}/notfound`)
      await expect(promise).toBeRejectedWith({ type: got.RequestError })
    })
    test('should start and stop the server with defaults', async () => {
      // Given
      const webServer = webServerFactory()
      // When
      try {
        await webServer.start()
        // Then
        expect(webServer).toHaveProperty('address')
        const { statusCode } = await client(`http://localhost:${webServer.address.port}/notfound`)
        expect(statusCode).toBe(404)
      } finally {
        await webServer.stop()
      }
      // Then
      if (client) {
        const promise = client(`http://localhost:${webServer.address.port}/notfound`)
        await expect(promise).toBeRejectedWith({ type: got.RequestError })
      }
    })
  })
  describe('started', () => {
    let webServer
    beforeAll(async () => {
      webServer = webServerFactory(3000)
      await webServer.start()
    })
    afterAll(async () => {
      if (webServer) {
        await webServer.stop()
      }
    })
    describe('healthcheck', () => {
      test('should respond to healthcheck endpoint', async () => {
        // When
        const res = await client(`http://localhost:${webServer.address.port}/healthcheck`)
        // Then
        expect(res).toHaveProperty('statusCode', 200)
        expect(res).toHaveProperty('body', { status: 'pass' })
      })
    })
  })
})
