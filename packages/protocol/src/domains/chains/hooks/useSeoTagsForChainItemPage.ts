import { useEffect } from 'react';

import {
  LINK_CANONICAL_PARAM,
  LINK_CANONICAL_SELECTOR,
  PROTOCOL_URL,
} from 'uiKit/utils/metatags';
import { ChainsRoutesConfig } from 'domains/chains/routes';

export const useSeoTagsForChainItemPage = () => {
  const { chainId } = ChainsRoutesConfig.chainDetails.useParams();

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
};
