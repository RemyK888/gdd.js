import { Channel } from '../structures/Channel';
import { errorStyle } from '../utils/Utils';

/**
 * Class symbolizing a `ClientChannels`
 * @class
 */
export class ClientChannels {
  private _token: string;

  /**
   * Create a new ClientChannels
   * @param {string} token
   * @constructor
   */
  constructor(token: string) {
    this._token = token;
  }

  /**
   * Get a channel by id
   * @param {string} id
   * @returns {Promise<Channel>}
   */
  public async get(id: string): Promise<Channel> {
    if (!id || typeof id !== 'string')
      throw new SyntaxError(errorStyle('The channel id is required to get informations about it'));
    return new Channel(id, this._token);
  }
}
