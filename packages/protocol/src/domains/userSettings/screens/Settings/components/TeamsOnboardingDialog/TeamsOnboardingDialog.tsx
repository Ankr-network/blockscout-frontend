import { Typography } from "@mui/material";
import { t } from "@ankr.com/common";

import { Dialog } from "uiKit/Dialog";
import { ANKR_DOCS_TEAM_ACCOUNTS_LINK } from "modules/common/constants/const";

import image from './assets/image.png';
import { useTeamsOnboardingDialogStyles } from "./useTeamsOnboardingDialogStyles";

interface ITeamsOnboardingDialogProps {
  isOpened: boolean;
  onClose: () => void;
}

export const TeamsOnboardingDialog = ({
  isOpened,
  onClose,
}: ITeamsOnboardingDialogProps) => {
  const { classes } = useTeamsOnboardingDialogStyles();

  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      closeButtonClassName={classes.closeButton}
      paperClassName={classes.root}
    >
      <div className={classes.bg} />
      <div className={classes.content}>
        <img alt='team logo' src={image} className={classes.image} />

        <Typography variant="h6" className={classes.title}>
          {t('teams.onboarding.title')}
        </Typography>

        <Typography
          variant="body2"
          component='p'
          className={classes.description}
        >
          {t('teams.onboarding.description')}
        </Typography>

        <a
          target="_blank"
          rel="noreferrer"
          href={ANKR_DOCS_TEAM_ACCOUNTS_LINK}
          className={classes.link}
        >
          {t('teams.onboarding.link')}
        </a>
      </div>
    </Dialog>
  )
}