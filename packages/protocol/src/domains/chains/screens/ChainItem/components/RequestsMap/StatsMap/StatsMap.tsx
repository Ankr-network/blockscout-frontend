import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

import { useThemes } from 'uiKit/Theme/hook/useThemes';

import { ANTARCTICA, GEO_URL, getGeogrpahyStyles } from './StatsMapUtils';
import { StatsMapProps } from './StatsMapTypes';

export const StatsMap = ({ data, setCountry }: StatsMapProps) => {
  const { isLightTheme } = useThemes();

  return (
    <div>
      <ComposableMap height={470}>
        <Geographies geography={GEO_URL}>
          {({ geographies }) => {
            return geographies
              .filter(d => d.properties.ISO_A2 !== ANTARCTICA)
              .map(geo => {
                const hasHandleMouseMove = typeof setCountry === 'function';

                const styles = getGeogrpahyStyles({
                  geo,
                  data,
                  isLightTheme,
                  hasHover: hasHandleMouseMove,
                });

                const handleMouseMove = (value: any) => {
                  if (hasHandleMouseMove) {
                    setCountry(value);
                  }
                };

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={styles}
                    onMouseEnter={() => {
                      if (styles.hasColor) {
                        handleMouseMove(geo.properties.ISO_A2);
                      }
                    }}
                    onMouseLeave={() => handleMouseMove('')}
                  />
                );
              });
          }}
        </Geographies>
      </ComposableMap>
    </div>
  );
};
