import ws from 'ws';
import { EventEmitter } from 'events';

import { ChatMessage } from '../structures/ChatMessage';
import { Channel } from '../structures/Channel';
import { SentChatMessage } from '../structures/SentChatMessage';
import { WEBSOCKET_URL, WEBSOCKET_EVENTS, MESSAGE_EVENTS, CLIENT_EVENTS } from '../utils/Constants';
import { resolveHeadersContent, errorStyle, isNumeric } from '../utils/Utils';
import { WSMessage } from '../utils/Interfaces';
import { TeamXp } from '../structures/TeamXp';

const heartBeatProperties = {
  last: 0,
  lastReceived: Date.now(),
  lastSent: Infinity,
  interval: 0,
  lastPing: Infinity,
};

/**
 * Class symbolizing a `Websocket`
 * @class
 */
export class Websocket {
  /**
   * Websocket ping
   */
  public ping!: number;

  /**
   * Reconnect?
   */
  public reconnect: boolean = false;

  /**
   * Online?
   */
  public online = false;

  private heartbeat = heartBeatProperties;
  private clientEmitter: EventEmitter;
  private socket!: ws;
  private _token!: string;

  /**
   * Create a new WebSocket
   * @param {EventEmitter} emitter
   * @constructor
   */
  constructor(emitter: EventEmitter) {
    this.clientEmitter = emitter;
  }

  /**
   * Init WS connection
   * @param {string} token
   * @returns {Promise<void>}
   */
  public async initConnection(token: string): Promise<void> {
    this._token = token;
    try {
      this.socket = new ws(WEBSOCKET_URL, {
        headers: resolveHeadersContent(token),
      });
    } catch (err) {
      throw new Error(errorStyle('An invalid token was provided'));
    }
    this.socket.on(WEBSOCKET_EVENTS.MESSAGE, async (message) => this.onMessage(message));
    this.socket.once(WEBSOCKET_EVENTS.OPEN, () => {
      this.online = true;
      this.clientEmitter.emit(CLIENT_EVENTS.READY);
    });
    setInterval(() => {
      this.getPing();
    }, 2000);
    this.socket.on(WEBSOCKET_EVENTS.PONG, async () => {
      this.ping = Date.now() - this.heartbeat.lastPing;
    });
    this.socket.on(WEBSOCKET_EVENTS.ERROR, async (err) => {
      throw new Error(errorStyle('Websocket: ' + this.extractErrorStatusCode(err.message)));
    });
    this.socket.on(WEBSOCKET_EVENTS.CLOSE, (code, reason) => {
      throw new Error(errorStyle('Websocket: ' + code + ', ' + reason));
    })
  }

  /**
   * Send to WS
   * @param {number} code
   * @param {any} data
   * @returns {void}
   */
  public sendToWS(code: number, data: any): void {
    if (!this.socket || this.socket.readyState !== ws.OPEN) return;
    this.socket.send(JSON.stringify({ op: code, d: data }));
  }

  private onMessage(message: object | any) {
    let parsedMsg: WSMessage;
    try {
      parsedMsg = JSON.parse(message);
      // console.log(parsedMsg);
    } catch (err) {
      return;
    }
    switch (parsedMsg.t) {
      case MESSAGE_EVENTS.CHAT_MESSAGE_CREATED:
        if (parsedMsg.d.message.content === 'Team channel created' && parsedMsg.d.message.type === 'system')
          return this.clientEmitter.emit(
            CLIENT_EVENTS.TEAM_CHANNEL_CREATED,
            new Channel(parsedMsg.d.message.channelId, this._token),
          );
        return this.clientEmitter.emit(
          CLIENT_EVENTS.CHAT_MESSAGE_CREATED,
          new ChatMessage(parsedMsg.d.message, this._token),
        );
      case MESSAGE_EVENTS.CHAT_MESSAGE_UPDATED:
        return this.clientEmitter.emit(
          CLIENT_EVENTS.CHAT_MESSAGE_UPDATED,
          new SentChatMessage(parsedMsg.d.message, this._token),
        );
      case MESSAGE_EVENTS.CHAT_MESSAGE_DELETED:
        return this.clientEmitter.emit(
          CLIENT_EVENTS.CHAT_MESSAGE_DELETED,
          new ChatMessage(parsedMsg.d.message, this._token),
        );
      case MESSAGE_EVENTS.TEAM_XP_ADDED:
        return this.clientEmitter.emit(CLIENT_EVENTS.TEAM_XP_ADDED, new TeamXp(parsedMsg.d.message, this._token));
    }
  }

  private async getPing(): Promise<void> {
    this.heartbeat.lastPing = Date.now();
    this.socket.ping();
  }

  private extractErrorStatusCode(statusMessage: string): string {
    if (!isNumeric(statusMessage)) return statusMessage;
    const errorCode = statusMessage.replace(/^\D+/g, '');
    switch (Number(errorCode)) {
      case 204:
        return 'No content returned';
      case 400:
        return 'The request was unacceptable, often due to missing parameters';
      case 401:
        return 'The access token is missing or invalid';
      case 403:
        return 'The bot does not have the necessary permissions';
      case 404:
        return 'The requested resource does not exist';
      case 409:
        return 'The request conflicted with another request';
      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
        return 'Something went wrong on our end';
      default:
        return statusMessage;
    }
  }
}
