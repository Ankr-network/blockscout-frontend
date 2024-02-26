import {
  META_ROBOTS_CONTENT_PARAM,
  META_ROBOTS_NAME_PARAM,
  META_ROBOTS_SELECTOR,
} from 'uiKit/utils/metatags';

export const setRobotsTags = () => {
  /* setting meta robots by default */
  const metaRobotsElement = document.querySelector(META_ROBOTS_SELECTOR);

  if (metaRobotsElement) {
    metaRobotsElement.remove();
  }

  const metaRobotsTag = document.createElement('meta');

  metaRobotsTag.name = META_ROBOTS_NAME_PARAM;

  metaRobotsTag.setAttribute(META_ROBOTS_CONTENT_PARAM, 'index,follow');

  document.head.appendChild(metaRobotsTag);
};
