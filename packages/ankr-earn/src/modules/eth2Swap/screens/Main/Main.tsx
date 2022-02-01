import { useCallback, useState } from 'react';
import { Box, Paper, Typography, Chip } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { FormApi } from 'final-form';
import { Form, FormRenderProps } from 'react-final-form';
import cn from 'classnames';
import noop from 'lodash/noop';

import { t } from 'modules/i18n/utils/intl';
import { AmountField } from 'modules/common/components/AmountField';
import { Container } from 'uiKit/Container';
import { Tooltip } from 'uiKit/Tooltip';
import { Button } from 'uiKit/Button';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { SwapOptions } from './components';
import { useMainEth2SwapStyles } from './styles';

type SwapOption = 'aETHb' | 'aETHc';

const FEE_PERCENT = 0.3;

export const Main = (): JSX.Element => {
  const classes = useMainEth2SwapStyles();
  const [swapOption, setSwapOption] = useState<SwapOption>('aETHb');
  const max = new BigNumber(0);

  const setMaxAmount = useCallback(
    (form: FormApi<{ amount?: string }>, maxAmount: string) => () =>
      form.change('amount', maxAmount),
    [],
  );

  const handleChooseAEthB = useCallback(() => {
    setSwapOption('aETHb');
  }, []);

  const handleChooseAEthC = useCallback(() => {
    setSwapOption('aETHc');
  }, []);

  const renderForm = ({ form }: FormRenderProps): JSX.Element => (
    <Paper className={classes.root} component="form" variant="elevation">
      <Typography variant="h2" className={classes.title}>
        {t('eth2Swap.title')}
      </Typography>

      <Typography className={classes.info}>{t('eth2Swap.info')}</Typography>

      <Box className={classes.chips}>
        <Tooltip title={t('eth2Swap.tooltips.aETHb')}>
          <Chip
            className={classes.chip}
            label="1 aETHb = 1 ETH"
            variant="outlined"
            deleteIcon={<QuestionIcon className={classes.infoIcon} />}
            onDelete={noop}
          />
        </Tooltip>

        <Tooltip title={t('eth2Swap.tooltips.aETHc')}>
          <Chip
            className={classes.chip}
            label="1 aETHc = 1.0627 ETH"
            variant="outlined"
            deleteIcon={<QuestionIcon className={classes.infoIcon} />}
            onDelete={noop}
          />
        </Tooltip>
      </Box>

      <AmountField
        inputClassName={classes.amountInput}
        balance={max}
        label={t('eth2Swap.amountInputTitle')}
        name="amount"
        isBalanceLoading={false}
        tokenName="aETHb"
        onMaxClick={setMaxAmount(form, max.toString())}
      />

      <SwapOptions
        swapOption={swapOption}
        onChooseAEthB={handleChooseAEthB}
        onChooseAEthC={handleChooseAEthC}
      />

      <Box className={classes.row}>
        <Typography className={classes.fee}>
          {t('eth2Swap.fee', { fee: FEE_PERCENT })}
        </Typography>

        <Typography className={classes.fee}>0.0157 aETHb</Typography>
      </Box>

      <div className={classes.hr} />

      <Box className={classes.row}>
        <Typography className={classes.result}>
          {t('eth2Swap.willGet')}
        </Typography>

        <Typography className={cn(classes.result, classes.sum)}>
          4.9160 aETHc
        </Typography>
      </Box>

      <Box className={classes.buttons}>
        <Button className={classes.button}>Swap</Button>
      </Box>
    </Paper>
  );

  return (
    <Box component="section" py={{ xs: 5, md: 10 }}>
      <Container>
        <Form
          initialValues={{ amount: '' }}
          render={renderForm}
          onSubmit={noop}
        />
      </Container>
    </Box>
  );
};
