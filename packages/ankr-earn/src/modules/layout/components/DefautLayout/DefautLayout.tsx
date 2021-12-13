import { ThemeProvider } from '@material-ui/styles';
import classNames from 'classnames';
import { ReactNode, useMemo } from 'react';
import { getTheme } from '../../../common/utils/getTheme';
import { Themes } from '../../../themes/types';
import { Footer } from '../Footer/index';
import { Header } from '../Header/index';
import { useDefaultLayoutStyles as useStyles } from './useDefaultLayoutStyles';
import { MainNavigationMobile } from '../MainNavigationMobile';

export interface IDefaultLayout {
  children?: ReactNode;
  theme?: Themes;
  isLayoutDefaultColor?: boolean;
  withNoReactSnap?: boolean;
}

export const DefaultLayout = ({
  children,
  theme = Themes.light,
}: IDefaultLayout) => {
  const classes = useStyles();
  const isDarkTheme = theme === Themes.dark;
  const currentTheme = useMemo(() => getTheme(theme), [theme]);

  return (
    <div className={classNames(classes.root, isDarkTheme && classes.darkTheme)}>
      <ThemeProvider theme={currentTheme}>
        <Header navigationSlot={<MainNavigationMobile />} />
        {children}
        <Footer />
      </ThemeProvider>
    </div>
  );
};
