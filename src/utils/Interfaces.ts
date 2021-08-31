// WEBSOCKET
export interface WSMessage {
  op: number;
  t: WSEvent;
  d: any;
  s: string;
}
export type WSEvent = 'ChatMessageCreated' | 'ChatMessageUpdated' | 'ChatMessageDeleted' | 'TeamXpAdded';

// RESTMANAGER
export type MethodOptions = 'GET' | 'PATCH' | 'POST' | 'DELETE' | 'PUT';

export interface RestOptions {
  /**
   * Method
   */
  method?: MethodOptions;

  /**
   * Data
   */
  data?: object | any;

  /**
   * Client token?
   */
  token?: string;
}

// MESSAGE
export type MessageType = 'default' | 'system';

export interface EmojisOptions {
  /**
   * Emoji id
   */
  id: string;

  /**
   * Created by
   */
  createdBy: string;

  /**
   * If created by bot
   */
  createdByBotId?: string;

  /**
   * If created by webhook
   */
  createdByWebhookId?: string;
}

// CHANNEL MESSAGE
export interface GetMessageOptions {
  /**
   * The message channel ID
   */
  channelID: string;
}

export interface ChatMessage {
  /**
   * Message ID
   */
  id: string;

  /**
   * Message type
   */
  type: MessageType;

  /**
   * Message channel ID
   */
  channelId: string;

  /**
   * Message content
   */
  content: string;

  /**
   * Message created by
   */
  createdBy: string;

  /**
   * Is message was created by bot
   */
  createdByBotId?: string;

  /**
   * If message was created by webhook
   */
  createdByWebhookId?: string;

  /**
   * If the message was updated
   */
  updatedAt?: string;
}

// CHANNEL
export interface ThreadForumOptions {
  /**
   * Thread title
   */
  title: string;

  /**
   * Thread content
   */
  content: string;
}

export interface ThreadForum {
  /**
   * Thread ID
   */
  id: string;

  /**
   * Thread created at
   */
  createdAt: string;

  /**
   * Thread created by
   */
  createdBy: string;

  /**
   * If thread was created by bot
   */
  createdByBotId?: string;

  /**
   * If thr thread was created by webhook
   */
  createdByWebhookId?: string;
}

export interface ListItemOptions {
  /**
   * The message of the list item
   */
  message: string;

  /**
   * The note of the list item
   */
  note?: string;
}

export interface ListItem {
  /**
   * List item ID
   */
  id: string;

  /**
   * List item message
   */
  message: string;

  /**
   * List item note?
   */
  note?: string;

  /**
   * List item created at
   */
  createdAt: string;

  /**
   * List item created by
   */
  createdBy: string;

  /**
   * If created by bot
   */
  createdByBotId?: string;

  /**
   * If created by webhook
   */
  createdByWebhookId?: string;
}

// CHAT MESSAGE
export interface AmountOptions {
  /**
   * Total member XP
   */
  total: number;
}

// GROUP

export interface RoleAwardXpOptions {
  /**
   * The role id
   */
  roleID: string;
}

// CLIENT
export interface ClientOptions {
  /**
   * Reconnect?
   */
  reconnect: true;
}
