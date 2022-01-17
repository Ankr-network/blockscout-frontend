import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';
import { Spinner } from 'ui';
import { LibraryRoutesConfig } from 'domains/library/LibraryRouterConfig';

const LoadableLessonContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Lesson').then(module => module.Lesson),
  { fallback: <Spinner /> },
);

const LoadableExamContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Exam').then(module => module.Exam),
  { fallback: <Spinner /> },
);

export function LibraryRoutes() {
  return (
    <>
      <Route
        exact
        path={LibraryRoutesConfig.lesson.path}
        component={LoadableLessonContainer}
      />
      <Route
        exact
        path={LibraryRoutesConfig.exam.path}
        component={LoadableExamContainer}
      />
    </>
  );
}
