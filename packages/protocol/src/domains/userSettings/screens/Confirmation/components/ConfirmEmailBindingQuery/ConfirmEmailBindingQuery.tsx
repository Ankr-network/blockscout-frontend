import { useDispatchRequest } from '@redux-requests/react';
import { push } from 'connected-react-router';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { confirmEmailBinding } from 'domains/userSettings/actions/email/confirmEmailBinding';
import { CenterContainer } from 'domains/userSettings/components/CenterContainer';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { Queries } from 'modules/common/components/Queries/Queries';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useAppDispatch } from 'store/useAppDispatch';
import { LinkExpiredCard } from '../LinkExpiredCard';
import {
  checkIsRelatedWallet,
  processError,
} from './ConfirmEmailBindingQueryUtils';

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
  const dispatchRequest = useDispatchRequest();

  const { address } = useAuth();

  useOnMount(() => {
    dispatchRequest(confirmEmailBinding({ code, email, shouldNotify: false }));
  });

  return (
    <Queries<ResponseData<typeof confirmEmailBinding> | null>
      disableEmptyRender
      disableErrorRender
      requestActions={[confirmEmailBinding]}
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

        const isRelatedWallet = checkIsRelatedWallet(data, address as string);

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
