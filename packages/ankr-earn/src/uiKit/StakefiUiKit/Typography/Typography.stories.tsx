import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import {
  Body2,
  Headline1,
  Headline2,
  Headline3,
  Headline4,
  Body1,
  SubTitle,
  SmallTitle,
  Headline5,
} from './Typography';

const useStyles = makeStyles<Theme>(theme => ({
  block: {
    '& hr': {
      display: 'block',
      margin: '16px 0',
      borderColor: theme.palette.text.secondary,
    },
  },

  title: {
    margin: 0,
    marginBottom: 16,
  },
}));

const TypographyStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Headline1 className={classes.title} component="h1">
        Headline1
      </Headline1>
      <Headline2 className={classes.title} component="h2">
        Headline2
      </Headline2>
      <Headline3 className={classes.title} component="h3">
        Headline3
      </Headline3>
      <Headline4 className={classes.title} component="h4">
        Headline4
      </Headline4>
      <Headline5 className={classes.title} component="h6">
        Headline6
      </Headline5>
      <SubTitle className={classes.title} component="p">
        SubTitle
      </SubTitle>
      <SmallTitle className={classes.title} component="p">
        SmallTitle
      </SmallTitle>
      <Body1 className={classes.title} component="p">
        Ankr is the blockchain infrastructure platform and marketplace
        connecting everyone from end-users, developers to enterprises.
      </Body1>
      <Body2 className={classes.title} component="p">
        Ankr is the blockchain infrastructure platform and marketplace
        connecting everyone from end-users, developers to enterprises.
      </Body2>
      <hr />
      Color
      <Headline1 className={classes.title} component="h1">
        Default
      </Headline1>
      <Headline1 className={classes.title} component="h1" color="primary">
        Color Primary
      </Headline1>
      <Headline1 className={classes.title} component="h1" color="secondary">
        Color Secondary
      </Headline1>
    </div>
  );
};

export const TypographyExample = () => <TypographyStory />;

export default {
  title: 'UiKit/Typography',
};
