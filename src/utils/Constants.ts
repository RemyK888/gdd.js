// ENDPOINTS
export const GUILDED_CDN = 'https://img.guildedcdn.com/';
export const WEBSOCKET_URL = 'wss://api.guilded.gg/v1/websocket';
export const GUILDED_API = 'https://www.guilded.gg/api/v1/';

// WEBSOCKET EVENTS
export enum WEBSOCKET_EVENTS {
  MESSAGE = 'message',
  OPEN = 'open',
  CLOSE = 'close',
  ERROR = 'error',
  PONG = 'pong',
}

// MESSAGE EVENTS
export enum MESSAGE_EVENTS {
  CHAT_MESSAGE_CREATED = 'ChatMessageCreated',
  CHAT_MESSAGE_UPDATED = 'ChatMessageUpdated',
  CHAT_MESSAGE_DELETED = 'ChatMessageDeleted',
  TEAM_XP_ADDED = 'TeamXpAdded',
}

// CLIENT EVENTS
export enum CLIENT_EVENTS {
  CHAT_MESSAGE_CREATED = 'chatMessageCreated',
  CHAT_MESSAGE_UPDATED = 'chatMessageUpdated',
  CHAT_MESSAGE_DELETED = 'chatMessageDeleted',
  READY = 'ready',
  WARN = 'warn',
  ERROR = 'error',
  TEAM_XP_ADDED = 'teamXpAdded',
  TEAM_CHANNEL_CREATED = 'teamChannelCreated',
}
