export interface Log extends Message {
  timestamp: number;
}

export interface Message {
  data?: unknown;
  type: MessageType;
}

export enum MessageType {
  Error,
  Info,
  Input,
  Success,
  Time,
}
