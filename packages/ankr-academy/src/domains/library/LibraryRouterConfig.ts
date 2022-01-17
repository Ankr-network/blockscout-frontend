import { generatePath, useParams } from 'react-router-dom';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import { ExamId, LessonId } from './types';

const PATH_LIBRARY = '/library';
const PATH_LESSON = '/lesson/:lessonId';
const PATH_EXAM = '/exam/:examId';

export const LibraryRoutesConfig = createRouteConfig(
  {
    library: {
      path: PATH_LIBRARY,
      generatePath: () => PATH_LIBRARY,
    },
    lesson: {
      path: PATH_LESSON,
      generatePath: (lessonId: LessonId) =>
        generatePath(PATH_LESSON, { lessonId }),
      useParams: () => {
        const { lessonId } = useParams<{ lessonId: LessonId }>();

        return {
          lessonId,
        };
      },
    },
    exam: {
      path: PATH_EXAM,
      generatePath: (examId: ExamId) => generatePath(PATH_EXAM, { examId }),
      useParams: () => {
        const { examId } = useParams<{ examId: ExamId }>();

        return {
          examId,
        };
      },
    },
  },
  PATH_LIBRARY,
);
