import { BaseTableDataProps } from '@ankr.com/telemetry';

export const mapResponseCodes = (
  responseCodesData: BaseTableDataProps[],
): BaseTableDataProps[] => {
  return responseCodesData.map(({ label, value }) => {
    if (typeof label !== 'string') {
      return { label, value };
    }

    const [code] = label.split(':');

    return {
      label: code,
      value,
    };
  });
};
