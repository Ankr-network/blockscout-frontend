import { generatePath, useParams } from 'react-router-dom';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import { LessonId } from './screens/Lesson/types';

const PATH_LIBRARY = '/library';
const PATH_LESSON = '/lesson/:lessonId';

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
  },
  PATH_LIBRARY,
);
