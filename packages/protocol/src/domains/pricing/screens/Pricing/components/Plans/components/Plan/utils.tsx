import { Dashboard, Link, Globe, Question, Code, Stats } from '@ankr.com/ui';

export const getPlanDetailsIcon = (
  index: number,
  isPremium: boolean,
  className?: string,
) => {
  switch (index) {
    case 0:
      return <Dashboard className={className} />;
    case 1:
      return <Link className={className} />;
    case 2:
      return <Globe className={className} />;
    case 3:
      return <Question className={className} />;
    case 4:
      return isPremium ? (
        <Stats className={className} />
      ) : (
        <Code className={className} />
      );

    default:
      return null;
  }
};
