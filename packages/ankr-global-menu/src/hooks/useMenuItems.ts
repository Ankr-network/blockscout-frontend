import { AnkrIntl } from '@ankr.com/common';
import { useMemo } from 'react';
import { IGlobalMenuItem, IGlobalMenuProject } from '../types';

export interface IUseMenuItemsParams {
  locale: string;
  project: IGlobalMenuProject;
}

export const useMenuItems = ({
  locale,
  project,
}: IUseMenuItemsParams): IGlobalMenuItem[] => {
  return useMemo(
    () =>
      (
        [
          {
            id: 'rpc',
            title: AnkrIntl.t('global-menu.build.title'),
            items: [
              {
                label: AnkrIntl.t('global-menu.build.item-1'),
                link: '/rpc/',
                project: 'rpc',
              },
              {
                label: AnkrIntl.t('global-menu.build.item-2'),
                link: '/rpc/account/',
                project: 'rpc',
              },
              {
                label: AnkrIntl.t('global-menu.build.item-3'),
                link: 'https://ankrscan.io',
                project: 'ankrscan',
              },
              {
                label: AnkrIntl.t('global-menu.build.item-4'),
                link: '/build/nodes/',
                project: 'landing',
              },
              {
                label: AnkrIntl.t('global-menu.build.item-5'),
                link: '/enterprise/',
                project: 'landing',
              },
            ],
          },
          {
            id: 'staking',
            title: AnkrIntl.t('global-menu.staking.title'),
            items: [
              {
                label: AnkrIntl.t('global-menu.staking.item-1'),
                link: '/staking/dashboard/',
                project: 'staking',
              },
              {
                label: AnkrIntl.t('global-menu.staking.item-2'),
                link: '/staking/stake/',
                project: 'staking',
              },
              {
                label: AnkrIntl.t('global-menu.staking.item-3'),
                link: '/staking/defi/',
                project: 'staking',
              },
              {
                label: AnkrIntl.t('global-menu.staking.item-4'),
                link: '/staking/bridge/',
                project: 'staking',
              },
              {
                label: AnkrIntl.t('global-menu.staking.item-5'),
                link: '/staking/switch/',
                project: 'staking',
              },
              {
                label: AnkrIntl.t('global-menu.staking.item-6'),
                link: '/staking/liquid-crowdloan/dot/',
                project: 'staking',
              },
            ],
          },
          {
            id: 'gaming',
            title: AnkrIntl.t('global-menu.gaming.title'),
            items: [
              {
                label: AnkrIntl.t('global-menu.gaming.item-1'),
                link: '/gaming/',
                project: 'landing',
              },
            ],
          },
          {
            id: 'docs',
            title: AnkrIntl.t('global-menu.docs.title'),
            items: [
              {
                label: AnkrIntl.t('global-menu.docs.item-1'),
                link: '/docs/',
                project: 'docs',
                isExternal: true,
              },
            ],
          },
        ] as IGlobalMenuItem[]
      ).sort(a => (a.id === project ? -1 : 0)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale, project],
  );
};
