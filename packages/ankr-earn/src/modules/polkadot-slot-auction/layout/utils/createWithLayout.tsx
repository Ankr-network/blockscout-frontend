import React from 'react';
import { DefaultLayout } from '../../components/DefautLayout';

interface IOptionsProps {}

export const createWithLayout =
  <T extends Record<string, unknown>>(
    Component: React.ComponentType<T>,
    options: IOptionsProps = {},
  ) =>
  (props: T) =>
    (
      <DefaultLayout {...options}>
        <Component {...props} />
      </DefaultLayout>
    );
