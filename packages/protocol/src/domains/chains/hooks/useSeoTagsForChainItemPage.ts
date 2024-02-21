import { useEffect } from 'react';

import {
  LINK_CANONICAL_PARAM,
  LINK_CANONICAL_SELECTOR,
  META_ROBOTS_CONTENT_PARAM,
  META_ROBOTS_SELECTOR,
  PROTOCOL_URL,
} from 'uiKit/utils/metatags';
import { ChainsRoutesConfig } from 'domains/chains/routes';

export const useSeoTagsForChainItemPage = () => {
  const { chainId, netId } = ChainsRoutesConfig.chainDetails.useParams();

  /* this useEffect should reassign canonical tags for chains pages */
  useEffect(() => {
    const canonicalTag: HTMLLinkElement | null = document.querySelector(
      LINK_CANONICAL_SELECTOR,
    );

    if (canonicalTag) {
      canonicalTag.remove();
    }

    const canonicalHref = `${PROTOCOL_URL}/${chainId}/`;
    const linkCanonicalElement = document.createElement('link');

    linkCanonicalElement.rel = LINK_CANONICAL_PARAM;
    linkCanonicalElement.href = canonicalHref;

    document.head.appendChild(linkCanonicalElement);
  }, [chainId]);

  /* this useEffect should reassign meta robots tags for subchain pages */
  useEffect(() => {
    const metaRobotsElement = document.querySelector(META_ROBOTS_SELECTOR);

    if (metaRobotsElement) {
      /* we should set nofollow param for subchains */
      if (netId) {
        metaRobotsElement.setAttribute(META_ROBOTS_CONTENT_PARAM, 'nofollow');
      }
    }
  }, [netId]);
};
