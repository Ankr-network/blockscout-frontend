import { Paper } from '@material-ui/core';
import { BridgeContainer } from '../components/BridgeContainer';
import { BridgeMainView } from '../components/BridgeMainView';

export const BridgeMainPage = () => {
  return (
    <BridgeContainer>
      <Paper>
        <BridgeMainView />
      </Paper>
    </BridgeContainer>
  );
};
