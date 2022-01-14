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

export type UserActionAnswerControlType = 'checkbox' | 'radio';

export type AnswerControl = {
  isCorrect: boolean; // has to be at least one correct (true) in controls array
  label: string;
  value: string;
};

type UserActionQuiz = {
  question: string;
  controls: AnswerControl[];
  buttonText: string;
};

type UserActionRadio = {
  type: 'radio';
} & UserActionQuiz;

type UserActionCheckbox = {
  type: 'checkbox';
} & UserActionQuiz;

type UserActionRate = {
  type: 'rate';
};

type UserActionNext = {
  type: 'next';
};

export type UserActionType =
  | UserActionButton
  | UserActionRadio
  | UserActionCheckbox
  | UserActionRate
  | UserActionNext;

export type LessonBlockType = {
  id: string;
  blockContent: BlockContentType[];
  userAction: UserActionType;
};

export type LessonType = {
  id: LessonId;
  nextLessonId: LessonId; // TODO: add courses, modules and lessons structure
  index: string;
  title: string;
  timeToRead: string;
  imgPreview: string;
  blocks: LessonBlockType[];
};

export type ModuleType = {
  [lessonIndex in LessonId]: LessonType;
};

export type LessonId = 'lesson1' | 'lesson2';
