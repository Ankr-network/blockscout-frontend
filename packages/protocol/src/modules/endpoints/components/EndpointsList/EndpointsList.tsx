import { Collapse } from 'uiKit/Collapse';

import { EndpointGroup } from 'modules/endpoints/types';
import { EndpointUrls } from '../EndpointUrls';

import { Typography } from '@material-ui/core';
import { t } from 'common';
import { useStyles } from './EndpointsListStyles';

export interface EndpointsListProps {
  groups: EndpointGroup[];
}

export const EndpointsList = ({ groups }: EndpointsListProps) => {
  const classes = useStyles();
  const isCollapsible = groups.length > 1;

  return (
    <div className={classes.endpointsListRoot}>
      {groups.length ? (
        groups.map(({ name, pluralName, urls, urlsCount }, index) => (
          <div className={classes.group} key={name}>
            <Collapse
              className={classes.header}
              content={<EndpointUrls urls={urls} />}
              header={
                <div className={classes.title}>
                  {urlsCount > 1 ? pluralName : name}
                </div>
              }
              isCollapsed={index !== 0}
              isCollapsible={isCollapsible}
            />
          </div>
        ))
      ) : (
        <Typography
          className={classes.emptyMessage}
          variant="subtitle1"
          color="textSecondary"
          align="center"
        >
          {t('chain-item.header.endpoint-groups.empty')}
        </Typography>
      )}
    </div>
  );
};
