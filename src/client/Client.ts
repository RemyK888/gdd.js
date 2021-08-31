import { EventEmitter } from 'events';

import { Websocket } from '../websocket/Websocket';
import { errorStyle } from '../utils/Utils';
import { ChatMessage } from '../structures/ChatMessage';
import { ClientMessages } from './ClientMessages';
import { ClientChannels } from './ClientChannels';
import { ClientMembers } from './ClientMembers';
import { ClientGroups } from './ClientGroups';
import { SentChatMessage } from '../structures/SentChatMessage';
import { TeamXp } from '../structures/TeamXp';
import { Channel } from '../structures/Channel';
import { ClientOptions } from '../utils/Interfaces';

export declare interface Client extends EventEmitter {
  /**
   * Emitted when the client receives a message
   * @param {Message} listener
   * @event Client#chatMessageCreated
   */
  on(event: 'chatMessageCreated', listener: (message: ChatMessage) => any | Promise<any>): this;

  /**
   * Emitted when a message is updated
   * @param {SentChatMessage} listener
   * @event Client#chatMessageUpdated
   */
  on(event: 'chatMessageUpdated', listener: (message: SentChatMessage) => any | Promise<any>): this;

  /**
   * Emitted when a message is deleted
   * @param {ChatMessage} listener
   * @event Client#chatMessageDeleted
   */
  on(event: 'chatMessageDeleted', listener: (message: ChatMessage) => any | Promise<any>): this;

  /**
   * Emitted when XP is added
   * @param {TeamXp} listener
   * @event Client#teamXpAdded
   */
  on(event: 'teamXpAdded', listener: (teamXp: TeamXp) => any | Promise<any>): this;

  /**
   * Emitted when a channel is created
   * @param {Channel} listener
   * @event Client#teamChannelCreated
   */
  on(event: 'teamChannelCreated', listener: (channel: Channel) => any | Promise<any>): this;

  /**
   * Emitted when the client is ready
   * @event Client#ready
   */
  on(event: 'ready', listener: () => void): this;

  /**
   * Emitted when an error occures
   * @param {Error} listener
   * @event Client#error
   */
  on(event: 'error', listener: (error: Error) => void): this;

  /**
   * Emitted when a warn occured
   * @event Client#warn
   */
  on(event: 'warn', listener: (warn: string) => void): this;

  /**
   * Emitted when the client is trying to reconnect itself
   * @param {string} listener
   * @event Client#reconnecting
   */
  on(event: 'reconnecting', listener: (statusCode: string) => void): this;
}

/**
 * Class symbolizing a `Client`
 * @class
 */
export class Client extends EventEmitter {
  /**
   * Client messages
   */
  public messages!: ClientMessages;

  /**
   * Client channels
   */
  public channels!: ClientChannels;

  /**
   * Client groups
   */
  public groups!: ClientGroups;

  /**
   * Client members
   */
  public members!: ClientMembers;

  private WS: Websocket;
  private _token!: string;

  /**
   * Create a new Client
   * @param {ClientOptions} options
   * @constructor
   */
  constructor(options?: ClientOptions) {
    super();
    this.WS = new Websocket(this);
    options && options.reconnect && typeof options.reconnect === 'boolean'
      ? (this.WS.reconnect = options?.reconnect)
      : (this.WS.reconnect = false);
  }

  /**
   * The client ping
   * @returns {number}
   */
  public get ping(): number {
    return Number(this.WS.ping);
  }

  /**
   * Connect your Guilded bot
   * @param {string} token
   * @example client.connect('');
   * @returns {Promise<void>}
   */
  public async connect(token: string): Promise<void> {
    if (!token || typeof token !== 'string') throw new SyntaxError(errorStyle('No authentification token provided'));
    this._token = token;
    this.patchData();
    await this.WS.initConnection(token);
  }

  /**
   * @ignore
   * @private
   * @returns {void}
   */
  private patchData(): void {
    this.messages = new ClientMessages(this._token);
    this.channels = new ClientChannels(this._token);
  }
}
