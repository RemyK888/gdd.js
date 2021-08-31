import { RestManager } from '../rest/RestManager';
import { GUILDED_API } from '../utils/Constants';
import { errorStyle } from '../utils/Utils';
import { RoleAwardXpOptions } from '../utils/Interfaces';

/**
 * CLass symbolizing a `Group`
 * @class
 */
export class Group {
  /**
   * The group id
   */
  public id: string;

  private _token: string;

  /**
   * Create new Group
   * @param {string} token
   * @constructor
   */
  constructor(id: string, token: string) {
    this._token = token;
    this.id = id;
  }

  /**
   *
   * @param {number} amount
   * @param {RoleAwardXpOptions} options
   * @returns {Promise<void>}
   * @example group.awardRoleXp(20, { roleID: '00000000000000' });
   */
  public async awardRoleXp(amount: number, options: RoleAwardXpOptions): Promise<void> {
    if (!amount || typeof amount !== 'string')
      throw new SyntaxError(errorStyle('Amount XP is required= in order to award XP to a role'));
    if (!options || !options.roleID || typeof options.roleID !== 'string')
      throw new SyntaxError(errorStyle('The role id is required'));
    return await RestManager.prototype.request(`${GUILDED_API}roles/${options.roleID}/xp`, {
      method: 'POST',
      token: this._token,
      data: JSON.stringify({ amount: amount }),
    });
  }

  /**
   * Add a member to a group
   * @param {string} member
   * @returns {Promise<void>}
   * @example group.addMember('00000000000000');
   */
  public async addMember(member: string): Promise<void> {
    if (!member || typeof member !== 'string')
      throw new SyntaxError(errorStyle('The member id is required to add him to the group'));
    return await RestManager.prototype.request(`${GUILDED_API}groups/${this.id}/members/${member}`, {
      method: 'PUT',
      token: this._token,
    });
  }

  /**
   * Remove a member from a group
   * @param {string} member
   * @returns {Promise<void>}
   * @example group.removeMember('00000000000000');
   */
  public async removeMember(member: string): Promise<void> {
    if (!member || typeof member !== 'string')
      throw new SyntaxError(errorStyle('The member id is required to remove him from the group'));
    return await RestManager.prototype.request(`${GUILDED_API}groups/${this.id}/members/${member}`, {
      method: 'DELETE',
      token: this._token,
    });
  }
}
