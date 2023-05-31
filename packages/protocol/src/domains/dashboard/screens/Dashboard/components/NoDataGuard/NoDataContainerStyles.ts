import { makeStyles } from 'tss-react/mui';

export const useNoDataContainerStyles = makeStyles<boolean>()(
  (_theme, isEmpty) => ({
    container: isEmpty
      ? {
          display: 'flex',
          flexDirection: 'column',
        }
      : {},
  }),
);
