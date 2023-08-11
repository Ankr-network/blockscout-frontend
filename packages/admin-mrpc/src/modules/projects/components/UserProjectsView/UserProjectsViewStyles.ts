import { makeStyles } from 'tss-react/mui';

export const useUserProjectsViewStyles = makeStyles()(theme => {
  return {
    projectsRoot: {
      width: '100%',
    },
    projectsTitleWrapper: {
      display: 'flex',
      marginBottom: theme.spacing(4),
      alignItems: 'center',
    },
    projectsTitle: {
      display: 'inline-flex',
      marginRight: theme.spacing(4),
    },
    projectsList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: theme.spacing(2),
    },
    projectItem: {
      padding: theme.spacing(5),
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2),
    },
    projectValue: {
      width: 'auto',
    },
    deleteProjectButton: {
      marginTop: 'auto',
    },
  };
});
