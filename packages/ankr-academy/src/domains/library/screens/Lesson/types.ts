export type Img = {
  src: string;
  alt: string;
  copyright: string;
};

export type ImageBlock = {
  type: 'img';
  img: Img;
};

export type UserType = 'ankr' | 'student';
export type ContentType = 'text';
export type MessageType = UserType | ContentType;

export type MessageBlock = {
  type: MessageType;
  messagesList: string[];
};

export type BlockContentType = ImageBlock | MessageBlock;

type UserActionButton = {
  type: 'button';
  buttonText: string;
};

export type RadioButton = {
  isCorrect: boolean;
  label: string;
  value: string;
};
type UserActionRadio = {
  type: 'radio';
  question: string;
  controls: RadioButton[];
  buttonText: string;
};
type UserActionRate = {
  type: 'rate';
};
type UserActionNext = {
  type: 'next';
};
export type UserActionType =
  | UserActionButton
  | UserActionRadio
  | UserActionRate
  | UserActionNext;
export type LessonBlockType = {
  id: string;
  blockContent: BlockContentType[];
  userAction: UserActionType;
};

export type LessonType = {
  title: string;
  blocks: LessonBlockType[];
};
