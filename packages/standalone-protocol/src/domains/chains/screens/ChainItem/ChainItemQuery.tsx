import { ThemeProvider } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { mainTheme } from 'modules/themes/mainTheme';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { fetchChain } from 'domains/chains/actions/fetchChain';
import { useStyles } from './ChainItemStyles';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { ChainItem } from './ChainItem';
import { ChainId } from 'domains/chains/api/chain';
import { useSpinner } from 'modules/layout/components/AppBase/AppBaseUtils';

interface ChainItemProps {
  chainId: ChainId;
}

export const ChainItemQuery = ({ chainId }: ChainItemProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useOnMount(() => {
    dispatch(fetchChain(chainId));
  });

  const spinner = useSpinner(chainId);

  return (
    <ThemeProvider theme={mainTheme}>
      <div className={classNames(classes.root, chainId)}>
        <Queries<ResponseData<typeof fetchChain>>
          requestActions={[fetchChain]}
          requestKeys={[chainId]}
          isPreloadDisabled
          spinner={spinner}
        >
          {({ data }) => {
            return <ChainItem data={data} chainId={chainId} />;
          }}
        </Queries>
      </div>
    </ThemeProvider>
  );
};
