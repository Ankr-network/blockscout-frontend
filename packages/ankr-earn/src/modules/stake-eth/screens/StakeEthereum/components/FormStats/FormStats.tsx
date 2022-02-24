import { Box, ButtonBase, Divider, Grid } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';

import { DECIMAL_PLACES } from 'modules/common/const';
import { t } from 'modules/i18n/utils/intl';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { Button } from 'uiKit/Button';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';

import { useFormStatsStyles } from './useFormStatsStyles';

interface IFormStatsProps {
  amount: BigNumber;
  tokenOut: string;
  tokenTooltip: string;
  tokenVariantsSlot?: ReactNode;
  onQuestionClick?: () => void;
}

export const FormStats = ({
  amount,
  tokenOut,
  tokenTooltip,
  tokenVariantsSlot,
  onQuestionClick,
}: IFormStatsProps): JSX.Element => {
  const classes = useFormStatsStyles();
  return (
    <>
      <Box mb={3} mt={5}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item sm xs={12}>
            <StakeDescriptionName>
              {t('stake-ethereum.token-select-label')}
            </StakeDescriptionName>
          </Grid>

          <Grid item sm="auto" xs={12}>
            {tokenVariantsSlot}
          </Grid>

          <Grid item xs={12}>
            <Box mt={-1} textAlign={{ xs: 'left', sm: 'right' }}>
              <Button
                className={classes.link}
                variant="text"
                onClick={onQuestionClick}
              >
                {t('stake-ethereum.difference')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Divider />

      <StakeDescriptionContainer>
        <StakeDescriptionName>{t('stake.you-will-get')}</StakeDescriptionName>

        <StakeDescriptionValue>
          <StakeDescriptionAmount symbol={tokenOut}>
            {amount.decimalPlaces(DECIMAL_PLACES).toFormat()}
          </StakeDescriptionAmount>

          <small>{tokenOut}</small>

          <Tooltip arrow title={tokenTooltip}>
            <ButtonBase className={classes.questionBtn}>
              <QuestionIcon size="xs" />
            </ButtonBase>
          </Tooltip>
        </StakeDescriptionValue>
      </StakeDescriptionContainer>
    </>
  );
};
