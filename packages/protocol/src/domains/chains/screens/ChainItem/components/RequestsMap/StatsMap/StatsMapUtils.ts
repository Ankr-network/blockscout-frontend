import map from '../map.json';
import { RequestsCountry } from '../RequestsMapTypes';

export const GEO_URL = map;

const COLOR_DEFAULT = '#E8EEF5';

export const GEOGRAPHY_STYLES = {
  default: { fill: COLOR_DEFAULT },
  hover: { fill: COLOR_DEFAULT },
  pressed: { fill: COLOR_DEFAULT, outline: 'none' },
};

const strokeStyles = { strokeWidth: 0.5, stroke: '#fff' };

export const getGeogrpahyStyles = (geo: any, data: RequestsCountry[]) => {
  const hasColor = data.find(
    item => item.isoA2 === geo?.properties?.ISO_A2,
  )?.color;

  const cursorStyle = hasColor ? 'pointer' : 'default';
  const fillColor = hasColor || COLOR_DEFAULT;

  return {
    default: { fill: fillColor, ...strokeStyles, cursor: cursorStyle },
    hover: {
      fill: fillColor,
      cursor: cursorStyle,
      ...strokeStyles,
    },
    pressed: {
      fill: fillColor,
      outline: 'none',
      cursor: cursorStyle,
      ...strokeStyles,
    },
    hasColor,
  };
};

export const ANTARCTICA = 'AQ';
