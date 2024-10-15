import { Top10StatItem } from 'multirpc-sdk';
import { BaseTableData } from '@ankr.com/telemetry';
import { t } from '@ankr.com/common';

export const mapRegionName = (key: string): string => {
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

  let regionName = '';

  try {
    regionName = regionNames.of(key) || '';
  } catch {
    regionName = key || t('dashboard.top-countries.unknown');
  }

  return regionName;
};

export const mapCountries = (country: Top10StatItem): BaseTableData => {
  const regionName = mapRegionName(country.key);

  return {
    label: regionName,
    value: t('dashboard.top-countries.count', { count: country.value }),
  };
};
