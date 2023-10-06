import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useEmptyListStyles } from './useEmptyListStyles';
import securityIcon from './assets/security.png';
import { DescriptionCase } from '../DescriptionCase';
import {
  AddWhitelistMenuButton,
  IAddWhitelistMenuButtonProps,
} from '../AddWhitelistMenuButton';

const intlKey = 'projects.new-project.step-3.empty-list';

interface IEmptyListProps
  extends Pick<IAddWhitelistMenuButtonProps, 'onWhitelistDialogOpen'> {
  isAddingDomainDisabled: boolean;
  isAddingIPDisabled: boolean;
  isAddingSmartContractDisabled: boolean;
}

export const EmptyList = ({
  isAddingDomainDisabled,
  isAddingIPDisabled,
  isAddingSmartContractDisabled,
  onWhitelistDialogOpen,
}: IEmptyListProps) => {
  const { classes } = useEmptyListStyles();

  return (
    <div className={classes.root}>
      <img src={securityIcon} alt="security" className={classes.image} />

      <Typography variant="h5" className={classes.title}>
        {t(`${intlKey}.title`)}
      </Typography>

      <div className={classes.descriptionRoot}>
        <Typography variant="body1" color="textSecondary">
          {t(`${intlKey}.feel-secure`)}
        </Typography>

        <div>
          <DescriptionCase text={t(`${intlKey}.secure-project`)} />
          <DescriptionCase text={t(`${intlKey}.control-interaction`)} />
          <DescriptionCase text={t(`${intlKey}.know-users`)} />
        </div>
      </div>

      <AddWhitelistMenuButton
        isSetupMode
        isAddingDomainDisabled={isAddingDomainDisabled}
        isAddingIPDisabled={isAddingIPDisabled}
        isAddingSmartContractDisabled={isAddingSmartContractDisabled}
        onWhitelistDialogOpen={onWhitelistDialogOpen}
      />
    </div>
  );
};
