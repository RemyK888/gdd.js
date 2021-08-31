import { MessageMember } from '../structures/MessageMember';
import { errorStyle } from '../utils/Utils';

/**
 * Class symbolizing a `ClientMembers`
 * @class
 */
export class ClientMembers {
  private _token: string;

  /**
   * Create a new ClientMembers
   * @param {string} token
   * @constructor
   */
  constructor(token: string) {
    this._token = token;
  }

  /**
   * Get a member by id
   * @param {string} id
   * @returns {Promise<Channel>}
   */
  public async get(id: string): Promise<MessageMember> {
    if (!id || typeof id !== 'string')
      throw new SyntaxError(errorStyle('The member id is required to get informations about him'));
    return new MessageMember(id, this._token);
  }
}
