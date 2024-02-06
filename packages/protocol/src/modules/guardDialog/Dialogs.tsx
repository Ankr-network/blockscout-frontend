import { useDispatch } from 'react-redux';

import { useAppSelector } from 'store/useAppSelector';
import { AccessDeniedDialog } from 'modules/layout/components/AccessDeniedDialog';

import { guardDialogSlice } from './store/dialogSlice';

export const Dialogs = () => {
  const dialogState = useAppSelector(state => state.guardDialog.shouldShowDialog);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(guardDialogSlice.actions.hideDialog());
  };

  return (
    <>
      {dialogState && (
        <AccessDeniedDialog
          open={Boolean(dialogState)}
          onClose={handleClose}
        />
      )}
    </>
  );
};
