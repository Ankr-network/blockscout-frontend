import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { useMultichainOverviewStyles } from './MultichainOverviewStyles';
import { multichainOverviewTranslation } from './translation';

interface IMultiChainOverviewProps {
  hasLogo?: boolean;
  hasDescription?: boolean;
  addToProjectButton?: ReactNode;
}

export const MultiChainOverview = ({
  addToProjectButton,
  hasDescription,
  hasLogo,
}: IMultiChainOverviewProps) => {
  const { classes } = useMultichainOverviewStyles();

  const { keys, t } = useTranslation(multichainOverviewTranslation);

  return (
    <Box mb={2}>
      {hasLogo && (
        <div className={classes.multichainHeader}>
          <div className={classes.title}>
            <div className={classes.iconRoot}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.9995 48C37.2543 48 47.9995 37.2548 47.9995 24C47.9995 10.7452 37.2543 0 23.9995 0C10.7447 0 -0.000488281 10.7452 -0.000488281 24C-0.000488281 37.2548 10.7447 48 23.9995 48Z"
                  fill="#F2F5FA"
                />
                <path
                  d="M19.5642 11.4L13.3434 14.2009C11.9169 14.8432 10.9995 16.2623 10.9995 17.8268V30.0793C10.9995 31.6438 11.9169 33.0629 13.3434 33.7052L19.5642 36.5061V34.4934L14.0969 32.0317C13.3288 31.6859 12.8348 30.9217 12.8348 30.0793V17.8268C12.8348 16.9844 13.3288 16.2202 14.0969 15.8744L19.5642 13.4127V11.4Z"
                  fill="#356DF3"
                />
                <path
                  d="M28.4348 11.4L34.6556 14.2009C36.0821 14.8432 36.9995 16.2623 36.9995 17.8268V30.0793C36.9995 31.6438 36.0821 33.0629 34.6556 33.7052L28.4348 36.5061V34.4934L33.9021 32.0317C34.6702 31.6859 35.1642 30.9217 35.1642 30.0793V17.8268C35.1642 16.9844 34.6702 16.2202 33.9021 15.8744L28.4348 13.4127V11.4Z"
                  fill="#356DF3"
                />
                <path
                  d="M17.8818 25.6634L30.1171 19.8118V21.8461L17.8818 27.6978V25.6634Z"
                  fill="#356DF3"
                />
                <path
                  d="M19.5642 11.4L13.3434 14.2009C11.9169 14.8432 10.9995 16.2623 10.9995 17.8268V30.0793C10.9995 31.6438 11.9169 33.0629 13.3434 33.7052L19.5642 36.5061V34.4934L14.0969 32.0317C13.3288 31.6859 12.8348 30.9217 12.8348 30.0793V17.8268C12.8348 16.9844 13.3288 16.2202 14.0969 15.8744L19.5642 13.4127V11.4Z"
                  stroke="#356DF3"
                  strokeWidth="1.66667"
                />
                <path
                  d="M28.4348 11.4L34.6556 14.2009C36.0821 14.8432 36.9995 16.2623 36.9995 17.8268V30.0793C36.9995 31.6438 36.0821 33.0629 34.6556 33.7052L28.4348 36.5061V34.4934L33.9021 32.0317C34.6702 31.6859 35.1642 30.9217 35.1642 30.0793V17.8268C35.1642 16.9844 34.6702 16.2202 33.9021 15.8744L28.4348 13.4127V11.4Z"
                  stroke="#356DF3"
                  strokeWidth="1.66667"
                />
                <path
                  d="M17.8818 25.6634L30.1171 19.8118V21.8461L17.8818 27.6978V25.6634Z"
                  stroke="#356DF3"
                  strokeWidth="1.66667"
                />
              </svg>
            </div>
            <Typography variant="h6" className={classes.text}>
              {t(keys.title)}
            </Typography>
          </div>
          {addToProjectButton}
        </div>
      )}
      {hasDescription && (
        <>
          <Typography
            variant="subtitle3"
            className={classes.multichainDescriptionTitle}
          >
            {t(keys.descriptionTitle)}
          </Typography>
          <Typography
            variant="body3"
            color="textSecondary"
            className={classes.multichainDescription}
          >
            {t(keys.descriptionText)}
          </Typography>
        </>
      )}
    </Box>
  );
};
