import { rm } from 'fs/promises'
import { createConnection } from 'net'
import { tmpdir } from 'os'
import { basename } from 'path'
import { resolve } from 'path'
import { promisify } from 'util'

/**
 * @factor 3
 * @level 4
 * @tags async, chat
 */

const modName = basename(__filename, '.test.js')

describe('chat', () => {
  const chatterNames = ['Bob', 'Jane', 'Anna']
  let mod
  let ipcSocketPath
  const rmFileSilently = async (path) => {
    if (!path) {
      return false
    }
    try {
      await rm(path)
      return true
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err
      }
      return false
    }
  }
  beforeAll(async () => {
    mod = await import(`../main/${modName}`)
    ipcSocketPath = resolve(tmpdir(), `${modName}.sock`)
    await rmFileSilently(ipcSocketPath)
  })
  beforeEach(() => {
    jest.resetAllMocks()
  })
  afterAll(async () => {
    await rmFileSilently(ipcSocketPath)
  })
  describe('chat server', () => {
    let ChatServer
    beforeAll(() => {
      ;({ ChatServer } = mod)
    })
    describe('constructor', () => {
      test('should return a default chat server instance', () => {
        // When
        const chatServer = new ChatServer()
        // Then
        expect(chatServer).toHaveProperty('options', { port: 0 })
        expect(chatServer).toHaveProperty('socketsMap', {})
        expect(chatServer).toHaveProperty('port', undefined)
      })
      test('should return a custom chat server instance', () => {
        // Given
        const options = { port: 3456 }
        // When
        const chatServer = new ChatServer(options)
        // Then
        expect(chatServer).toHaveProperty('options', options)
        expect(chatServer).toHaveProperty('socketsMap', {})
        expect(chatServer).toHaveProperty('port', undefined)
      })
      test('should not be able to modify properties', () => {
        // When
        const chatServer = new ChatServer()
        expect(() => {
          chatServer.address = 1234
        }).toHaveFailedWith({
          message: 'Cannot set property address of #<ChatServer> which has only a getter',
          type: Error,
        })
        expect(() => {
          chatServer.options = { foo: 'bar' }
        }).toHaveFailedWith({
          message: 'Cannot set property options of #<ChatServer> which has only a getter',
          type: Error,
        })
        expect(() => {
          chatServer.socketsMap = undefined
        }).toHaveFailedWith({
          message: 'Cannot set property socketsMap of #<ChatServer> which has only a getter',
          type: Error,
        })
      })
    })
    describe('instance', () => {
      let chatServer
      let socket1, socket2
      beforeAll(() => {
        chatServer = new ChatServer({ path: ipcSocketPath })
      })
      afterAll(async () => {
        if (socket1) {
          await promisify(socket1.end.bind(socket1))()
        }
        if (socket2) {
          await promisify(socket2.end.bind(socket2))()
        }
        if (chatServer) {
          await chatServer.stop()
        }
      })
      test('should start the chat server and forward message received from a client to others', async () => {
        // When
        await chatServer.start()
        // Then
        const options =
          typeof chatServer.address === 'string' ? chatServer.address : chatServer.address.port
        socket1 = createConnection(options)
        socket1.setEncoding('utf8')
        await promisify(socket1.once.bind(socket1))('ready')
        socket2 = createConnection(options)
        socket2.setEncoding('utf8')
        await promisify(socket2.once.bind(socket2))('ready')
        const msgPromise = new Promise((resolve) => socket2.once('data', resolve))
        await promisify(socket1.write.bind(socket1))('hello')
        const message = await msgPromise
        expect(message).toBe('hello')
      })
    })
  })
  describe('chat server and clients', () => {
    describe('chat conversation', () => {
      let serverDataHandler
      let chatServer
      let chatClients
      beforeAll(async () => {
        const { ChatClient, ChatServer } = mod
        serverDataHandler = jest.fn()
        chatServer = new ChatServer(undefined, serverDataHandler)
        await chatServer.start()
        const options =
          typeof chatServer.address === 'string' ? chatServer.address : chatServer.address.port
        chatClients = chatterNames.map((name) => new ChatClient(name, options, jest.fn()))
        await Promise.all(chatClients.map((chatClient) => chatClient.start()))
      })
      afterAll(async () => {
        await Promise.all(chatClients.map((chatClient) => chatClient.stop()))
        await chatServer.stop()
      })
      test.each([
        { senderName: 'Bob', targetNames: ['Jane', 'Anna'].join(' and ') },
        // { senderName: 'Jane', targetNames: ['Bob', 'Anna'].join(' and ') },
        // { senderName: 'Anna', targetNames: ['Bob', 'Jane'].join(' and ') },
      ])('should broadcast message from $senderName to $targetNames', async ({ senderName }) => {
        // Given
        const message = 'hello'
        const senderIndex = chatterNames.findIndex((name) => name === senderName)
        expect(senderIndex).toBeGreaterThanOrEqual(0)
        const sender = chatClients[senderIndex]
        const targets = chatClients.filter((__, index) => index !== senderIndex)
        const serverReceivePromise = new Promise((resolve) =>
          serverDataHandler.mockImplementation((data) => {
            resolve(data)
          }),
        )
        const clientReceivePromises = Promise.all(
          targets.map(
            (target) =>
              new Promise((resolve) =>
                target.messageHandler.mockImplementation((data) => resolve(data)),
              ),
          ),
        )
        // When
        await sender.say(message)
        // Then
        expect(await serverReceivePromise).toBe(message)
        expect(await clientReceivePromises).toEqual([...targets].fill(message))
        expect(sender.messageHandler).not.toHaveBeenCalled()
        targets.forEach((target) => {
          expect(target.messageHandler).toHaveBeenNthCalledWith(1, message)
        })
      })
    })
  })
})
