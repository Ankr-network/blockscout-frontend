export type Img = {
  src: string;
  alt: string;
  copyright: string;
};

export type ImageBlock = {
  type: 'img';
  img: Img;
};

export type TextBlock = {
  type: 'text';
  messagesList: string[];
};

export type MarkdownBlock = {
  type: 'markdown';
  messagesList: string[];
};

export type UserType = 'ankr' | 'student';

export type MessageBlock = {
  type: UserType;
  messagesList: string[];
};

export type BlockContentType =
  | ImageBlock
  | TextBlock
  | MarkdownBlock
  | MessageBlock;

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
  id: string;
  question: string;
  description?: string;
  controls: AnswerControl[];
  buttonText: string; // is required for instant questions
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

type UserActionNull = {
  type: 'null';
};

type UserActionExamLink = {
  type: 'examLink';
  examId: ExamId;
  buttonText: string;
};

export type ExamQuestions = {
  type: 'examQuestions';
  allowableWrongAnswersCount: number;
  questions: (
    | Omit<UserActionRadio, 'buttonText'>
    | Omit<UserActionCheckbox, 'buttonText'>
  )[];
};

export type UserActionType =
  | UserActionButton
  | UserActionRadio
  | UserActionCheckbox
  | UserActionRate
  | UserActionNull
  | UserActionExamLink;

export type LessonBlockType = {
  id: string;
  blockContent: BlockContentType[];
  userAction: UserActionType;
};

export type ModuleEntityBlockType = {
  id: string;
  blockContent?: BlockContentType[]; // can be not presented in exams
  userAction: UserActionType | ExamQuestions;
};

export type LessonType = {
  id: LessonId;
  nextLessonId?: LessonId; // TODO: add courses, modules and lessons structure
  index: string;
  title: string;
  timeToRead: string;
  imgPreview: string;
  blocks: LessonBlockType[];
};

export type ExamType = {
  id: ExamId;
  moduleId: ModuleId;
  title: string;
  blocks: ModuleEntityBlockType[];
};

type ModuleLessonsType = {
  [lessonIndex in LessonId]: LessonType;
};

type ModuleExamType = {
  [examIndex in ExamId]: ExamType;
};

export type ModuleType = {
  id: ModuleId;
} & ModuleLessonsType &
  ModuleExamType;

type ModuleId = 'module1';
export type LessonId = 'lesson1' | 'lesson2';
export type ExamId = 'exam1';
