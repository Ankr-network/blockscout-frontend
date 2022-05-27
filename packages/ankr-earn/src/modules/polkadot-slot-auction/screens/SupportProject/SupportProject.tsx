import { IconButton, Typography } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import { useHistory, useParams } from 'react-router';

import { t } from 'common';

import { useInitEffect } from 'modules/common/hooks/useInitEffect';
import { RoutesConfig } from 'modules/polkadot-slot-auction/Routes';
import { CancelIcon } from 'uiKit/Icons/CancelIcon';
import { NavLink } from 'uiKit/NavLink';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';

import { fetchCrowdloanById } from '../../actions/fetchCrowdloanById';
import { useCrowdloanById } from '../../hooks/useCrowdloans';
import { useSlotAuctionSdk } from '../../hooks/useSlotAuctionSdk';

import { SupportProjectForm } from './components/SupportProjectForm/SupportProjectForm';
import { useSupportProjectStyles } from './useSupportProjectStyles';

export const SupportProject = (): JSX.Element => {
  const classes = useSupportProjectStyles();
  const dispatch = useDispatchRequest();

  const history = useHistory();

  const { network, id } = useParams<{ network: string; id: string }>();

  const { isConnected } = useSlotAuctionSdk();

  const ParachainBondsCrowdloansPath =
    RoutesConfig.crowdloans.generatePath(network);
  const loanId = Number.parseInt(id, 10);

  const { crowdloan, isLoading } = useCrowdloanById(loanId);

  useInitEffect((): void => {
    dispatch(fetchCrowdloanById(loanId));
  });

  const goToParachainBondsCrowdloans = () => {
    history.push(ParachainBondsCrowdloansPath);
  };

  if (Number.isNaN(loanId) || !isConnected) {
    goToParachainBondsCrowdloans();
  }

  return isLoading ? (
    <QueryLoadingCentered />
  ) : (
    <div className={classes.container}>
      <IconButton className={classes.close}>
        <NavLink href={ParachainBondsCrowdloansPath}>
          <CancelIcon size="md" />
        </NavLink>
      </IconButton>

      <Typography className={classes.title} variant="h3">
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
