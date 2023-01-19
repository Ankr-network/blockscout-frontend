import { makeStyles } from 'tss-react/mui';

interface StylesProps {
  isCollapsed: boolean;
  isCollapsible: boolean;
}

export const useStyles = makeStyles<StylesProps>()(
  (_theme, props: StylesProps) => ({
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',

      cursor: props.isCollapsible ? 'pointer' : 'default',

      // to avoid blue highlighting on ios devices
      '-webkit-tap-highlight-color': 'transparent',
    },
    icon: {
      transform: !props.isCollapsed ? 'rotate(180deg)' : 'none',
      transformOrigin: '50% 50%',
    },
  }),
);
