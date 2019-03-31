import _ from 'underscore';

let server = process.env.REACT_APP_LOCAL_AIP_SERVER
let initOptions = {
  method: 'GET',
  mode: 'cors',
}

if (process.env.NODE_ENV !== 'development') {
  server = process.env.REACT_APP_API_SERVER;
}

export class ServerAdapter {

  static async get(url=''){
    console.log('get')
    const fetchURL = server + url;
    const response = await fetch(fetchURL, initOptions).then(res => {
      return res;
    });
    return this._parseJson(response);
  }

  static async post(url='', param){
    console.log('post')
    const fetchURL = server + url;
    const init = _.clone(initOptions);
    init.method = 'POST';
    init.headers = {"Content-Type": "application/x-www-form-urlencoded"}
    init.body = JSON.stringify(param)
    const response = await fetch(fetchURL, init).then(res => {
      return res;
    });
    return this._parseJson(response);
  }

  static async call(callback, param) {
    
  }

  static _parseJson(response){
    let result = {}
    try{
      result = response.json();
    } catch (e){
      console.error('[parse error] : failed to parse response to json.');
      console.error(e)
    }
    return result;
  }
}

// export async function ServerAdapter(url) {
//   const response = await fetch(url, {}).then(res => {
//     return res.json()
//   });
//   return response
// }


//websocket adapter
//i don't use this meanwhile.
const WEBSOCKETSERVER = 'ws://localhost:8888/ws/sample'
export const WebSocketAdapter = () => {
    let connection = new WebSocket(WEBSOCKETSERVER);
    console.log('WebSocket connection is succeeded. now, you are connecting with ' + WEBSOCKETSERVER);
    return connection;
}