import { useSetBreadcrumbs } from '../layout/components/Breadcrumbs';
import { useEffect } from 'react';

export const AdminPage = () => {
  useEffect(() => {}, []);

  useSetBreadcrumbs([
    {
      title: 'admin',
    },
  ]);

  return <>AdminPage</>;
};
