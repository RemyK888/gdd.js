import { RestManager } from '../rest/RestManager';
import { GUILDED_API } from '../utils/Constants';
import { errorStyle } from '../utils/Utils';
import { AmountOptions } from '../utils/Interfaces';

/**
 * Class symbolizing a `MessageMember`
 * @class
 */
export class MessageMember {
  /**
   * Member ID
   */
  private id: string;

  private _token: string;

  /**
   * Create a new MessageMember
   * @param {string} token
   */
  constructor(id: string, token: string) {
    this._token = token;
    this.id = id;
  }

  /**
   * Award Xp to the member
   * @param {number} amount
   * @returns {Promise<AmountOptions>}
   * @example message.member.awardXp(20)
   */
  public async awardXp(amount: number): Promise<AmountOptions> {
    if (!amount || typeof amount !== 'string')
      throw new SyntaxError(errorStyle('Amount XP is required= in order to award XP to a member'));
    const res = await RestManager.prototype.request(`${GUILDED_API}members/${this.id}/xp`, {
      method: 'POST',
      token: this._token,
      data: JSON.stringify({ amount: amount }),
    });
    return JSON.parse(await res);
  }

  /**
   * Add a role to the member
   * @param {string} role
   * @returns {Promise<void>}
   * @example member.assignRole('0000000000');
   */
  public async assignRole(role: string): Promise<void> {
    if (!role || typeof role !== 'string')
      throw new SyntaxError(errorStyle('The role id is required in order to assign a role to the member'));
    return await RestManager.prototype.request(`${GUILDED_API}members/${this.id}/roles/${role}`, {
      method: 'PUT',
      token: this._token,
    });
  }

  /**
   * Remove a role to the member
   * @param {string} role
   * @returns {Promise<void>}
   * @example member.removeRole('0000000000');
   */
  public async removeRole(role: string): Promise<void> {
    if (!role || typeof role !== 'string')
      throw new SyntaxError(errorStyle('The role id is required in order to remove a role to the member'));
    return await RestManager.prototype.request(`${GUILDED_API}members/${this.id}/roles/${role}`, {
      method: 'PUT',
      token: this._token,
    });
  }
}
