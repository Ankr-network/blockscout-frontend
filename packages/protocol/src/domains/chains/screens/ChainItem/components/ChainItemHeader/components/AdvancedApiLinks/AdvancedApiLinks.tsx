import { IconButton, Link } from '@mui/material';
import { t } from '@ankr.com/common';
import { Doc } from '@ankr.com/ui';

import {
  AAPI_CHAINS_LINK,
  AAPI_JS_SDK,
  AAPI_PYTHON_SDK,
  AAPI_REACT_HOOKS_LINK,
  AAPI_OVERVIEW_LINK,
} from 'modules/common/constants/const';

import { useAdvancedApiLinksStyles } from './useAdvancedApiLinksStyles';

export const AdvancedApiLinks = () => {
  const { classes } = useAdvancedApiLinksStyles();

  return (
    <div className={classes.root}>
      <div className={classes.links}>
        <Link
          target="_blank"
          variant="body3"
          className={classes.link}
          href={AAPI_CHAINS_LINK}
        >
          {t('advanced-api.chain-overview.supported-chains')}
        </Link>
        <Link
          target="_blank"
          variant="body3"
          className={classes.link}
          href={AAPI_JS_SDK}
        >
          {t('advanced-api.chain-overview.js-sdk')}
        </Link>
        <Link
          target="_blank"
          variant="body3"
          className={classes.link}
          href={AAPI_PYTHON_SDK}
        >
          {t('advanced-api.chain-overview.python-sdk')}
        </Link>
        <Link
          target="_blank"
          variant="body3"
          className={classes.link}
          href={AAPI_REACT_HOOKS_LINK}
        >
          {t('advanced-api.chain-overview.react-hooks')}
        </Link>
      </div>
      <IconButton
        component={Link}
        href={AAPI_OVERVIEW_LINK}
        target="_blank"
        className={classes.iconRoot}
      >
        <Doc className={classes.icon} />
      </IconButton>
    </div>
  );
};
