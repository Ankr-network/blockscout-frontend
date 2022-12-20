import { push } from 'connected-react-router';
import { IEmailResponse } from 'multirpc-sdk';

import { CenterContainer } from 'domains/userSettings/components/CenterContainer';
import { LinkExpiredCard } from '../LinkExpiredCard';
import { Queries } from 'modules/common/components/Queries/Queries';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import {
  checkIsRelatedWallet,
  processError,
} from './ConfirmEmailBindingQueryUtils';
import { useAppDispatch } from 'store/useAppDispatch';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useLazyUserSettingsConfirmEmailBindingQuery } from 'domains/userSettings/actions/email/confirmEmailBinding';
import { useOnMount } from 'modules/common/hooks/useOnMount';

const REDIRECT_TIMEOUT = 250;

interface IConfirmEmailBindingQueryProps {
  email: string;
  code: string;
}

export const ConfirmEmailBindingQuery = ({
  email,
  code,
}: IConfirmEmailBindingQueryProps) => {
  const dispatch = useAppDispatch();

  const { address } = useAuth();

  const [confirmEmailBinding, emailBindingState] =
    useLazyUserSettingsConfirmEmailBindingQuery();

  useOnMount(() => {
    confirmEmailBinding({
      params: { email, code },
      shouldNotify: false,
    });
  });

  return (
    <Queries<IEmailResponse>
      disableEmptyRender
      disableErrorRender
      queryStates={[emailBindingState]}
    >
      {({ data, error }) => {
        const { isCodeAlreadyUsed, isConfirmationCodeNotFound, isLinkExpired } =
          processError(error);

        if (isLinkExpired) {
          return (
            <CenterContainer>
              <LinkExpiredCard />
            </CenterContainer>
          );
        }

        const isRelatedWallet = checkIsRelatedWallet(data, address);

        if (
          isRelatedWallet ||
          isCodeAlreadyUsed ||
          isConfirmationCodeNotFound
        ) {
          setTimeout(
            () =>
              dispatch(push(UserSettingsRoutesConfig.settings.generatePath())),
            REDIRECT_TIMEOUT,
          );
        }

        return null;
      }}
    </Queries>
  );
};
