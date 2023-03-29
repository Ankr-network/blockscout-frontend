import { Box } from '@material-ui/core';

import { Token } from 'modules/common/types/token';
import { HistoryDialog } from 'modules/dashboard/components/HistoryDialog';
import { HistoryDialogContent } from 'modules/dashboard/screens/Dashboard/components/HistoryDialog/components/HistoryDialogContent';
import { EKnownDialogs, useDialog } from 'modules/dialogs';
import { Button } from 'uiKit/Button';
import { Container } from 'uiKit/Container';

const defaultSelectedToken = Token.aAVAXc;

export const DevPage = (): JSX.Element => {
  const { handleOpen, isOpened, handleClose } = useDialog<Token>(
    EKnownDialogs.history,
    defaultSelectedToken,
  );

  return (
    <Box py={6}>
      <Container maxWidth={800}>
        <Button onClick={handleOpen}>Open history dialog</Button>
      </Container>

      <HistoryDialog isOpened={isOpened} onClose={handleClose}>
        <HistoryDialogContent defaultSelectedToken={defaultSelectedToken} />
      </HistoryDialog>
    </Box>
  );
};
