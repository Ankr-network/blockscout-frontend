import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const LabelIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16" fill="none">
      <path
        d="M2 5.5C2 4.55719 2 4.08579 2.29289 3.79289C2.58579 3.5 3.05719 3.5 4 3.5H10.4296C10.9536 3.5 11.2156 3.5 11.4367 3.61833C11.6578 3.73665 11.8031 3.95463 12.0937 4.3906L14.0069 7.2604C14.2459 7.6189 14.3654 7.79815 14.3654 8C14.3654 8.20185 14.2459 8.3811 14.0069 8.7396L12.0937 11.6094C11.8031 12.0454 11.6578 12.2633 11.4367 12.3817C11.2156 12.5 10.9536 12.5 10.4296 12.5H4C3.05719 12.5 2.58579 12.5 2.29289 12.2071C2 11.9142 2 11.4428 2 10.5V5.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <circle
        cx="10.0002"
        cy="7.9987"
        r="0.666667"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </SvgIcon>
  );
};
