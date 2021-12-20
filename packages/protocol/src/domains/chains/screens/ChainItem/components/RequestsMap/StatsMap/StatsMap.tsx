import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

import { ANTARCTICA, GEO_URL, getGeogrpahyStyles } from './StatsMapUtils';
import { StatsMapProps } from './StatsMapTypes';

export const StatsMap = ({ data, setCountry }: StatsMapProps) => {
  return (
    <div>
      <ComposableMap height={470}>
        <Geographies geography={GEO_URL}>
          {({ geographies }) => {
            return geographies
              .filter(d => d.properties.ISO_A2 !== ANTARCTICA)
              .map(geo => {
                const styles = getGeogrpahyStyles(geo, data);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={styles}
                    onMouseEnter={() => {
                      if (styles.hasColor) {
                        setCountry(geo.properties.ISO_A2);
                      }
                    }}
                    onMouseLeave={() => setCountry('')}
                  />
                );
              });
          }}
        </Geographies>
      </ComposableMap>
    </div>
  );
};
