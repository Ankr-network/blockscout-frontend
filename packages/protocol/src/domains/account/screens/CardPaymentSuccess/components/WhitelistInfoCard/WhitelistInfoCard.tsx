import { t, tHTML } from '@ankr.com/common';
import { useHistory } from 'react-router';
import { useCallback } from 'react';

import { InfoCard } from 'domains/userSettings/components/InfoCard';
import { LoadingButton } from 'uiKit/LoadingButton';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { useEnableWhitelist } from 'domains/projects/hooks/useEnableWhitelist';

import { useWhitelistInfoCardStyles } from './useWhitelistInfoCardStyles';
import success from '../../assets/success.png';

interface WhitelistInfoCardProps {
  isLoading?: boolean;
  className?: string;
}

export const WhitelistInfoCard = ({
  isLoading,
  className = '',
}: WhitelistInfoCardProps) => {
  const history = useHistory();
  const { handleResetConfig } = useEnableWhitelist();

  const onClick = useCallback(() => {
    history.push(ProjectsRoutesConfig.projects.generatePath());
    handleResetConfig();
  }, [history, handleResetConfig]);

  const { classes } = useWhitelistInfoCardStyles();

  return (
    <InfoCard
      align="center"
      descriptionClassName={classes.description}
      title={tHTML(`account.card-payment-success.whitelist.title`)}
      titleClassName={classes.title}
      className={className}
      imgUrl={success}
      description={tHTML(
        `account.card-payment-success.whitelist.description${
          isLoading ? '-loading' : ''
        }`,
      )}
    >
      <LoadingButton
        onClick={onClick}
        size="large"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
      >
        {isLoading ? '' : t(`account.card-payment-success.whitelist.button`)}
      </LoadingButton>
    </InfoCard>
  );
};
