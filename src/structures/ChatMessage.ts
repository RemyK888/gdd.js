import { Channel } from './Channel';
import { Author } from './Author';
import { RestManager } from '../rest/RestManager';
import { GUILDED_API } from '../utils/Constants';
import { errorStyle, isEmoji } from '../utils/Utils';
import { MessageType, EmojisOptions } from '../utils/Interfaces';

/**
 * Class symbolizing a `ChatMessage`
 * @class
 */
export class ChatMessage {
  /**
   * Message ID
   */
  public id!: string;

  /**
   * Message type
   */
  public type!: MessageType;

  /**
   * Message channel
   */
  public channel!: Channel;

  /**
   * Message content
   */
  public content!: string;

  /**
   * Message created at
   */
  public createdAt!: string;

  /**
   * Message author
   */
  public author!: Author;

  /**
   * If the message was created by bot
   */
  public createdByBotId: string | undefined = undefined;

  /**
   * If the message was created by webhook
   */
  public createdByWebhookId: string | undefined = undefined;

  /**
   * If the message updated
   */
  public updatedAt: string | undefined = undefined;

  private _token: string;

  /**
   * Create a new ChatMessage
   * @param {object} data
   * @param {string} token
   * @constructor
   */
  constructor(data: object, token: string) {
    this._token = token;
    this.patchData(data);
  }

  /**
   * Delete the message **(timeout is optional but in SECONDS)**
   * @param {number} timeout
   * @returns {Promise<void>}
   * @example message.delete(5);
   */
  public async delete(timeout?: number): Promise<void> {
    if (timeout && typeof timeout === 'number') {
      setTimeout(async () => {
        return await RestManager.prototype.request(`${GUILDED_API}channels/${this.channel.id}/messages/${this.id}`, {
          method: 'DELETE',
          token: this._token,
        });
      }, timeout * 1000);
    } else {
      return await RestManager.prototype.request(`${GUILDED_API}channels/${this.channel.id}/messages/${this.id}`, {
        method: 'DELETE',
        token: this._token,
      });
    }
  }

  /**
   * React to the message
   * @param {string} emoji The emoji ID
   * @returns {Promise<EmojisOptions>}
   */
  public async react(emoji: string): Promise<EmojisOptions> {
    if (!emoji || typeof emoji !== 'string') throw new SyntaxError(errorStyle('No emoji provided to add reaction'));
    if (isEmoji(emoji)) throw new Error(errorStyle("Emojis aren't supported, use the moji id instead"));
    const res = await RestManager.prototype.request(
      `${GUILDED_API}channels/${this.channel.id}/content/${this.id}/emotes/${emoji}`,
      {
        method: 'PUT',
        token: this._token,
      },
    );
    return JSON.parse(await res).emote;
  }

  /**
   * @ignore
   * @private
   * @param {any} data
   * @returns {void}
   */
  private patchData(data: any): void {
    this.id = data.id;
    this.type = data.type;
    this.channel = new Channel(data.channelId, this._token);
    this.content = data.content;
    this.createdAt = data.createdAt;
    this.author = new Author(data.createdBy, this._token);
    this.createdByBotId = data.createdByBotId || undefined;
    this.createdByWebhookId = data.createdByWebhookId || undefined;
    this.updatedAt = data.updatedAt || undefined;
  }
}
