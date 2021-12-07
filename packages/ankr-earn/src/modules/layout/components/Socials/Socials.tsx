import { useStyles } from './SocialsStyles';
import {
  Twitter,
  Discord,
  Medium,
  Telegram,
} from '../../../common/components/Icons/Socials';
import { useMemo } from 'react';
import { ISocialItem, SocialItem } from './SocialItem';

interface SocialsProps {
  className?: string;
}

export const Socials = ({ className = '' }: SocialsProps) => {
  const classes = useStyles();

  const socialList: ISocialItem[] = useMemo(
    () => [
      {
        title: 'twitter',
        icon: <Twitter />,
        href: 'twitter',
      },
      {
        title: 'telegram',
        icon: <Telegram />,
        href: 'telegram',
      },
      {
        title: 'medium',
        icon: <Medium />,
        href: 'medium',
      },
      {
        title: 'discord',
        icon: <Discord />,
        href: 'discord',
      },
    ],
    [],
  );

  return (
    <div className={classes.root}>
      {socialList.map((item, index) => (
        <SocialItem key={index} {...item} /> // TODO: uid
      ))}
    </div>
  );
};
