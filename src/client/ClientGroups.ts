import { Group } from '../structures/Group';
import { errorStyle } from '../utils/Utils';

/**
 * Class symbolizing `ClientGroups`
 * @class
 */
export class ClientGroups {
  private _token: string;

  /**
   * Create a new ClientGroups
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
  public async get(id: string): Promise<Group> {
    if (!id || typeof id !== 'string')
      throw new SyntaxError(errorStyle('The group id is required to get informations about it'));
    return new Group(id, this._token);
  }
}
