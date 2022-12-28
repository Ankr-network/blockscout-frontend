import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { t } from 'modules/i18n/utils/intl';
import { web3Api } from 'store/queries';

const ONE_MINUTE_LIFETIME = 60 * 1000;
const ONE_HOUR_LIFETIME = 60 * ONE_MINUTE_LIFETIME;
const ONE_WEEK_HOURS = 7 * 24;
const LIFETIME = ONE_HOUR_LIFETIME * ONE_WEEK_HOURS;

export const {
  useInfrastructureAuthorizeProviderQuery,
  endpoints: { infrastructureAuthorizeProvider },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    infrastructureAuthorizeProvider: build.query<string, void>({
      queryFn: createNotifyingQueryFn(async () => {
        const service = await MultiService.getWeb3Service();

        const accessToken = await service.getAuthorizationToken(LIFETIME);

        if (!accessToken) {
          throw new Error(t('error.access-token-error'));
        }

        return { data: accessToken };
      }),
    }),
  }),
});
