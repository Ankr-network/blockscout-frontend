import { LINK_CANONICAL_SELECTOR } from 'uiKit/utils/metatags/useMetatags';

export const removeCanonicalTag = () => {
  const canonicalTag: HTMLLinkElement | null = document.querySelector(
    LINK_CANONICAL_SELECTOR,
  );

  if (canonicalTag) {
    canonicalTag.remove();
  }
};
