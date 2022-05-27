import { IRequestsEntity } from 'multirpc-sdk';
import { useStyles } from './useStyles';
import ReactJson from 'react-json-view';
import { Tab, Tabs } from '@material-ui/core';
import { useState } from 'react';
import { t } from 'modules/i18n/utils/intl';

export const RequestExplorerExpand = ({
  row,
  recalculateRows,
}: {
  row: IRequestsEntity;
  recalculateRows: () => void;
}) => {
  const classes = useStyles();
  const [requestTab, setRequestTab] = useState(0);
  const [responseTab, setResponseTab] = useState(0);

  const handleChangeTab = (type: 'request' | 'response', tab: number) => {
    if (type === 'request') {
      setRequestTab(tab);
    } else {
      setResponseTab(tab);
    }

    recalculateRows();
  };

  let rawParams = {};
  let rawResult = {};

  try {
    rawParams = JSON.parse(row.rawParams);
    rawResult = JSON.parse(row.rawResult);
  } catch {
    /** */
  }

  return (
    <div className={classes.root}>
      <div className={classes.block}>
        <Tabs
          TabIndicatorProps={{
            style: {
              display: 'none',
            },
          }}
          value={requestTab}
          onChange={(_, value) => handleChangeTab('request', value)}
        >
          <Tab
            classes={{ root: classes.tab, selected: classes.tabSelected }}
            className={classes.tab}
            label={t('explorer.request-explorer.expand.tab-request.tab-1')}
          />
          <Tab
            classes={{ root: classes.tab, selected: classes.tabSelected }}
            label={t('explorer.request-explorer.expand.tab-request.tab-2')}
          />
        </Tabs>
        {requestTab === 0 && (
          <ReactJson
            name={null}
            displayDataTypes={false}
            displayObjectSize={false}
            src={rawParams}
          />
        )}
        {requestTab === 1 && (
          <div className={classes.rawText}>{row.rawParams}</div>
        )}
      </div>
      <div className={classes.block}>
        <Tabs
          TabIndicatorProps={{
            style: {
              display: 'none',
            },
          }}
          value={responseTab}
          onChange={(_, value) => handleChangeTab('response', value)}
        >
          <Tab
            classes={{ root: classes.tab, selected: classes.tabSelected }}
            className={classes.tab}
            label={t('explorer.request-explorer.expand.tab-response.tab-1')}
          />
          <Tab
            classes={{ root: classes.tab, selected: classes.tabSelected }}
            label={t('explorer.request-explorer.expand.tab-response.tab-2')}
          />
        </Tabs>
        {responseTab === 0 && (
          <ReactJson
            name={null}
            displayDataTypes={false}
            displayObjectSize={false}
            src={rawResult}
          />
        )}
        {responseTab === 1 && (
          <div className={classes.rawText}>{row.rawResult}</div>
        )}
      </div>
    </div>
  );
};
