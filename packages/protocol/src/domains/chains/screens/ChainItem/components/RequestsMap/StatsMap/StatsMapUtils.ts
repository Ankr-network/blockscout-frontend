import map from '../map.json';
import { RequestsCountry } from '../RequestsMapTypes';

export const GEO_URL = map;

const COLOR_DEFAULT = '#E8EEF5';
const DARK_COLOR_DEFAULT = '#42464F';

const lightStrokeStyles = { strokeWidth: 0.5, stroke: '#fff' };
const darkStrokeStyles = { strokeWidth: 0.5, stroke: '#1F2226' };

export const getGeogrpahyStyles = (
  geo: any,
  data: RequestsCountry[],
  isLightTheme: boolean,
) => {
  const hasColor = data.find(
    item => item.isoA2 === geo?.properties?.ISO_A2,
  )?.color;

  const strokeStyles = isLightTheme ? lightStrokeStyles : darkStrokeStyles;

  const cursorStyle = hasColor ? 'pointer' : 'default';
  const fillColor =
    hasColor || (isLightTheme ? COLOR_DEFAULT : DARK_COLOR_DEFAULT);

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
