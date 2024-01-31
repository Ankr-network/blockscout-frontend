import { makeStyles } from 'tss-react/mui';

export const useCreateTeamSectionStyles = makeStyles()(theme => ({
  createTeamPaper: {
    padding: theme.spacing(15, 5),
    textAlign: 'center',
  },
  createTeamInner: {
    maxWidth: 460,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(6),
  },
  teamNameInputWrapper: {
    display: 'flex',
    gap: theme.spacing(3),
    alignItems: 'flex-end',
  },
}));
