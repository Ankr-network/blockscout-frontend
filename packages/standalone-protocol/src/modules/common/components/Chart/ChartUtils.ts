import { Theme } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import numeral from 'numeral';
import { Props } from 'react-apexcharts';

export const getChartOptions = (
  dates: string[] = [],
  hasGradient: boolean,
  theme?: Theme,
  isSMDown?: boolean,
  foreColor = '#fff',
  gridBorderColor?: string,
): Partial<Props['options']> => {
  return {
    chart: {
      foreColor,
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: false,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.2,
      },
      zoom: {
        enabled: false,
      },
    },

    tooltip: {
      theme: 'dark',
      x: {
        show: true,

        formatter: (value: any, options: any) => {
          const { dataPointIndex } = options;

          return t('chain-item.chart.tooltip', {
            value: dates[dataPointIndex],
          });
        },
      },
    },
    xaxis: {
      tooltip: {
        enabled: false,
      },
      tickAmount: isSMDown ? 5 : 12,
      tickPlacement: 'on',
      labels: {
        formatter: (value: any) => {
          return t('chain-item.chart.time', {
            value,
          });
        },
        rotate: 0,
        rotateAlways: false,
      },
      categories: dates,
    },
    grid: {
      borderColor: gridBorderColor,
      xaxis: {
        lines: {
          show: false,
        },
      },
      padding: {
        bottom: 30,
      },
    },
    fill: {
      type: 'gradient',
      gradient: hasGradient
        ? {}
        : {
            shade: 'light',
            shadeIntensity: 1,
            type: 'vertical',
            opacityFrom: 0,
            opacityTo: 0,
            stops: [0, 100],
          },
    },
  };
};

export const chartBaseOptions: Partial<Props['options']> = {
  markers: {
    size: 0,
    hover: {
      size: 4,
      sizeOffset: 3,
    },
  },
  dataLabels: {
    enabled: false,
  },
  chart: {
    foreColor: '#fff',
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 2,
      opacity: 0.2,
    },
  },
  stroke: {
    curve: 'smooth',
    width: 3,
  },
  fill: {
    type: 'gradient',
  },
  legend: {
    fontSize: '16px',
    itemMargin: {
      horizontal: 15,
      vertical: 5,
    },
  },
  yaxis: {
    labels: {
      formatter: (value: any) => numeral(value).format('0,0'),
    },
  },
};

export const chartStyle = { marginTop: 20 };
