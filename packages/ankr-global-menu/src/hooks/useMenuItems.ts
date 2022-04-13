import { AnkrIntl } from 'common';
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
            id: 'protocol',
            title: AnkrIntl.t('global-menu.build.title'),
            items: [
              {
                label: AnkrIntl.t('global-menu.build.item-1'),
                link: '/protocol/public/',
                project: 'protocol',
              },
              {
                label: AnkrIntl.t('global-menu.build.item-2'),
                link: '/protocol/plan/',
                project: 'protocol',
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
            id: 'earn',
            title: AnkrIntl.t('global-menu.earn.title'),
            items: [
              {
                label: AnkrIntl.t('global-menu.earn.item-1'),
                link: '/earn/dashboard/',
                project: 'earn',
              },
              {
                label: AnkrIntl.t('global-menu.earn.item-2'),
                link: '/earn/stake/',
                project: 'earn',
              },
              {
                label: AnkrIntl.t('global-menu.earn.item-3'),
                link: '/earn/defi/trade/',
                project: 'earn',
              },
              {
                label: AnkrIntl.t('global-menu.earn.item-4'),
                link: '/earn/bridge/',
                project: 'earn',
              },
              {
                label: AnkrIntl.t('global-menu.earn.item-5'),
                link: '/earn/switch/',
                project: 'earn',
              },
              {
                label: AnkrIntl.t('global-menu.earn.item-6'),
                link: '/earn/liquid-crowdloan/dot/',
                project: 'earn',
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
