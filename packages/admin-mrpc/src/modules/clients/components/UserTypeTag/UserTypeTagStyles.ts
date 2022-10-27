import { alpha } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { ClientType } from '../../types';
import { colorMap } from './const';

export const useUserTypeTagStyles = makeStyles<{ clientType: ClientType }>()(
  (theme, { clientType }) => {
    const tagColor = colorMap[clientType];

    return {
      tag: {
        padding: '2px 8px',
        borderRadius: 8,
        backgroundColor: alpha(tagColor, 0.2),
        color: tagColor,
      },
    };
  },
);
