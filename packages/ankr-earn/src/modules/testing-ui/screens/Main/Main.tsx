import {
  Box,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import { ForwardRefExoticComponent, MemoExoticComponent, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { uid } from 'react-uid';

import { RoutesConfig } from 'modules/testing-ui/Routes';
import { AnkrIcon } from 'uiKit/Icons/AnkrIcon';
import { EthIcon } from 'uiKit/Icons/EthIcon';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { ISvgIconProps } from 'uiKit/Icons/withSvgIcon';

interface IMenuItem {
  title: string;
  descr: string;
  icon: MemoExoticComponent<ForwardRefExoticComponent<ISvgIconProps>>;
  link: string;
}

export const Main = (): JSX.Element => {
  const links: IMenuItem[] = useMemo(
    () => [
      {
        title: 'Stake ETH without claim',
        descr: 'Ability for staking ETH with the old flow',
        icon: EthIcon,
        link: RoutesConfig.stakeWithoutClaim.generatePath(),
      },
      {
        title: 'Notifications',
        descr: 'Buttons with ability to show default notifications',
        icon: QuestionIcon,
        link: RoutesConfig.notifications.generatePath(),
      },
      {
        title: 'Aka ANKR faucet',
        descr: 'Ability to get test ankr tokens',
        icon: AnkrIcon,
        link: RoutesConfig.ankrFaucet.generatePath(),
      },
      {
        title: 'For devs',
        descr: 'temp',
        icon: QuestionIcon,
        link: RoutesConfig.devPage.generatePath(),
      },
    ],
    [],
  );

  return (
    <Box py={8}>
      <Container maxWidth="lg">
        <Paper>
          <Box px={4} py={4}>
            <List>
              {links.map(({ title, descr, icon: Icon, link }) => (
                <ListItem key={uid(title)}>
                  <ListItemIcon>
                    <Icon size="md" />
                  </ListItemIcon>

                  <ListItemText
                    primary={
                      <Typography color="primary" component={Link} to={link}>
                        {title}
                      </Typography>
                    }
                    secondary={descr}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
