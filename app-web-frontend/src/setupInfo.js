const SERVER_ADDRESS_LINE = 'localhost:8080'
export const SERVER_ADDRESS = 'http://' + SERVER_ADDRESS_LINE
export const SERVER_WS_ADDRESS = 'wss://' + SERVER_ADDRESS_LINE

export function prepareRequest(method, jsonStringBody) {
    return {
        method: method,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonStringBody,
      }
}
