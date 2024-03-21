export const SERVER_ADDRESS = 'http://localhost:8080'

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
