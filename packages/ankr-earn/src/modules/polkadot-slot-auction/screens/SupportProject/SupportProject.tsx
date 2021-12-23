import { IconButton, Typography } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import { useInitEffect } from 'modules/common/hooks/useInitEffect';
import { t } from 'modules/i18n/utils/intl';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { CancelIcon } from 'uiKit/Icons/CancelIcon';
import { NavLink } from 'uiKit/NavLink';
import { QueryLoading } from 'uiKit/QueryLoading';
import { fetchCrowdloanById } from '../../actions/fetchCrowdloanById';
import { useCrowdloanById } from '../../hooks/useCrowdloans';
import { useSlotAuctionSdk } from '../../hooks/useSlotAuctionSdk';
import { RoutesConfig } from '../../Routes';
import { SupportProjectForm } from './components/SupportProjectForm/SupportProjectForm';
import { useSupportProjectStyles } from './useSupportProjectStyles';

export interface FormPayload {
  agreement: boolean;
  contributeValue: string;
}

export const SupportProject = () => {
  const classes = useSupportProjectStyles();
  const dispatch = useDispatchRequest();

  const history = useHistory();

  const { network, id } = useParams<{ network: string; id: string }>();

  const { isConnected } = useSlotAuctionSdk();

  const ParachainBondsCrowdloansPath =
    RoutesConfig.crowdloans.generatePath(network);
  const loanId = Number.parseInt(id);

  const goToParachainBondsCrowdloans = () => {
    history.push(ParachainBondsCrowdloansPath);
  };

  if (Number.isNaN(loanId) || !isConnected) {
    goToParachainBondsCrowdloans();
  }

  const { crowdloan, isLoading } = useCrowdloanById(loanId);

  useInitEffect((): void => {
    dispatch(fetchCrowdloanById(loanId));
  });

  return isLoading ? (
    <QueryLoading />
  ) : (
    <div className={classes.container}>
      <IconButton className={classes.close}>
        <NavLink href={ParachainBondsCrowdloansPath}>
          <CancelIcon size="md" />
        </NavLink>
      </IconButton>

      <Typography variant="h3" className={classes.title}>
        {t('polkadot-slot-auction.support-project-form.title', {
          value: crowdloan.projectName,
        })}
      </Typography>

      <SupportProjectForm
        crowdloan={crowdloan}
        goToParachainBondsCrowdloans={goToParachainBondsCrowdloans}
      />
    </div>
  );
};
