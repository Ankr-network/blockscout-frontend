import { OverlaySpinner } from '@ankr.com/ui';

import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { Placeholder } from 'modules/common/components/Placeholder';
import { selectIsAuthorizing } from 'modules/common/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

import { Initializer } from './components/Initializer';
import { Routes } from './Routes';

export const AppRouter = () => {
  const isAuthorizing = useAppSelector(selectIsAuthorizing);

  return (
    <>
      <Initializer />
      <Placeholder
        hasPlaceholder={isAuthorizing}
        placeholder={<OverlaySpinner />}
      >
        <DefaultLayout>
          <Routes />
        </DefaultLayout>
      </Placeholder>
    </>
  );
};
