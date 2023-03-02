import { Discord, Doc, Globe } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { Card } from './types';

export const intlRoot = 'chain-item.debug-menu.learn-more';

export const cards: Card[] = [
  {
    Icon: Globe,
    descriptions: [
      t(`${intlRoot}.blog.description-1`),
      t(`${intlRoot}.blog.description-2`),
    ],
    link: 'https://ankr.hashnode.dev/',
    linkText: t(`${intlRoot}.blog.link`),
    title: t(`${intlRoot}.blog.title`),
  },
  {
    Icon: Doc,
    descriptions: [
      t(`${intlRoot}.docs.description-1`),
      t(`${intlRoot}.docs.description-2`),
    ],
    link: 'https://www.ankr.com/docs/',
    linkText: t(`${intlRoot}.docs.link`),
    title: t(`${intlRoot}.docs.title`),
  },
  {
    Icon: Discord,
    descriptions: [
      t(`${intlRoot}.discord.description-1`),
      t(`${intlRoot}.discord.description-2`),
    ],
    link: 'https://discord.com/invite/ankr/',
    linkText: t(`${intlRoot}.discord.link`),
    title: t(`${intlRoot}.discord.title`),
  },
];
