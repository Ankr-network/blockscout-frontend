import {
  removeCanonicalTag,
  LINK_CANONICAL_PARAM,
  PROJECT_LOCATION_HOSTNAME,
} from 'uiKit/utils/metatags';

const getCanonicalPath = (location: Location) => {
  const canonicalPath = `${PROJECT_LOCATION_HOSTNAME}${location.pathname}${
    location.pathname.endsWith('/') ? '' : '/'
  }`;

  return canonicalPath;
};

export const setCanonicalTags = () => {
  const { location } = window;

  removeCanonicalTag();

  const newCanonicalTag: HTMLLinkElement | null =
    document.createElement('link');

  newCanonicalTag.rel = LINK_CANONICAL_PARAM;
  newCanonicalTag.href = getCanonicalPath(location);

  document.head.appendChild(newCanonicalTag);
};
