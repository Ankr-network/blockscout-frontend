import packageJson from '../../../../package.json';

export const PROJECT_LOCATION_HOSTNAME = 'https://www.ankr.com';

export const PROTOCOL_URL = `${PROJECT_LOCATION_HOSTNAME}${packageJson.homepage}`;

export const LINK_CANONICAL_PARAM = 'canonical';
export const LINK_CANONICAL_SELECTOR = `link[rel="${LINK_CANONICAL_PARAM}"]`;
export const META_ROBOTS_CONTENT_PARAM = 'content';
export const META_ROBOTS_NAME_PARAM = 'robots';
export const META_ROBOTS_SELECTOR = `meta[name="${META_ROBOTS_NAME_PARAM}"]`;
