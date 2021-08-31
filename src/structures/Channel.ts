import { SentChatMessage } from './SentChatMessage';
import { ClientMessages } from '../client/ClientMessages';
import { RestManager } from '../rest/RestManager';
import { GUILDED_API } from '../utils/Constants';
import { errorStyle } from '../utils/Utils';
import { ThreadForumOptions, ThreadForum, ListItemOptions, ListItem } from '../utils/Interfaces';

/**
 * Class symbolizing a `Channel`
 * @class
 */
export class Channel {
  /**
   * Channel ID
   */
  public id: string;

  /**
   * Channel messages
   */
  public messages!: ClientMessages;

  private _token: string;

  /**
   * Create a new Channel
   * @param {string} id
   * @param {string} token
   * @constructor
   */
  constructor(id: string, token: string) {
    this._token = token;
    this.id = id;
    this.messages = new ClientMessages(this._token, this.id);
  }

  /**
   * Send a message in the message channel
   * @param {string} message
   * @returns {Promise<SentChatMessage>}
   * @example message.channel.send('Hello world!');
   */
  public async send(message: string): Promise<SentChatMessage> {
    if (!message || typeof message !== 'string')
      throw new SyntaxError(errorStyle('No message provided at message.channel.send'));
    const res = await RestManager.prototype.request(`${GUILDED_API}channels/${this.id}/messages`, {
      method: 'POST',
      token: this._token,
      data: JSON.stringify({ content: message }),
    });
    return new SentChatMessage(await res, this._token);
  }

  /**
   * Create a thread forum
   * @param {ThreadForumOptions} options
   * @returns {Promise<ThreadForum>}
   * @example message.channel.createThreadForum({ title: 'thread', content: 'my thread description' });
   */
  public async createThreadForum(options: ThreadForumOptions): Promise<ThreadForum> {
    if (
      !options ||
      !options.title ||
      !options.content ||
      typeof options.title !== 'string' ||
      typeof options.content !== 'string'
    )
      throw new SyntaxError(errorStyle('Invalid thread content at channel.createThreadForum'));
    const res = await RestManager.prototype.request(`${GUILDED_API}channels/${this.id}/forum`, {
      method: 'POST',
      token: this._token,
      data: JSON.stringify({ title: options.title, content: options.content }),
    });
    return JSON.parse(await res).forumThread;
  }

  /**
   * Create list item
   * @param {ListItemOptions} options
   * @returns {Promise<ListItem>}
   * @example message.channel.createListItem({ message: 'List message' });
   */
  public async createListItem(options: ListItemOptions): Promise<ListItem> {
    if (!options || !options.message || typeof options.message !== 'string')
      throw new SyntaxError(errorStyle('No message was provided to create the list item'));
    const res = await RestManager.prototype.request(`${GUILDED_API}channels/${this.id}/list`, {
      method: 'POST',
      token: this._token,
      data:
        options.note && typeof options.note === 'string'
          ? JSON.stringify({ message: options.message, note: options.note })
          : JSON.stringify({ message: options.message }),
    });
    return JSON.parse(await res).listItem;
  }
}
