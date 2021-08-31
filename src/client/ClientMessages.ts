import { SentChatMessage } from '../structures/SentChatMessage';
import { RestManager } from '../rest/RestManager';
import { GUILDED_API } from '../utils/Constants';
import { errorStyle } from '../utils/Utils';
import { GetMessageOptions, ChatMessage } from '../utils/Interfaces';

/**
 * Class symbolizing a `ClientMessages`
 * @class
 */
export class ClientMessages {
  private _token: string;
  private channelID: string | undefined = undefined;

  /**
   * Create a new ClientMessages
   * @param {string} token
   * @param {string} channelID
   */
  constructor(token: string, channelID?: string) {
    this._token = token;
    if (channelID) this.channelID = channelID;
  }

  /**
   * Get a message
   * @param {string} id
   * @param {GetMessageOptions} options
   * @returns {Promise<SentChatMessage>}
   * @example client.messages.get('000000000000000', { channelID: '000000000000000' });
   */
  public async get(id: string, options?: GetMessageOptions): Promise<SentChatMessage> {
    if (!id || typeof id !== 'string')
      throw new SyntaxError(errorStyle('No message id provided while getting a message'));
    if (!options?.channelID && this.channelID === undefined)
      throw new Error(errorStyle('The channel ID is required to get a message'));
    const res = await RestManager.prototype.request(
      `${GUILDED_API}channels/${this.channelID !== undefined ? this.channelID : options?.channelID}/messages/${id}`,
      {
        method: 'GET',
        token: this._token,
      },
    );
    return new SentChatMessage(await res, this._token);
  }

  /**
   * Get channel messages
   * @param {GetMessageOptions} options
   * @returns {Promise<ChatMessage[]>}
   * @example client.messages.list({ channelID: '000000000000000' });
   */
  public async list(options?: GetMessageOptions): Promise<ChatMessage[]> {
    if (!options?.channelID && this.channelID === undefined)
      throw new Error(errorStyle('The channel ID is required to get channel messages'));
    const res = await RestManager.prototype.request(
      `${GUILDED_API}channels/${this.channelID !== undefined ? this.channelID : options?.channelID}/messages`,
      {
        method: 'GET',
        token: this._token,
      },
    );
    return JSON.parse(await res).messages;
  }
}
