import { ButtonProps } from '@material-ui/core';
import { ElementType } from 'react';

type AnyObject = Record<string, unknown>;

type Element<E> = E extends ElementType ? E : 'button';
type Props<P> = P extends Record<string, unknown> ? P : AnyObject;

// to get an opportunity to use 'component' prop in LoadableButton
export type LoadableButtonProps<E, P> = ButtonProps<Element<E>, Props<P>> & {
  loading?: boolean;
  loader?: JSX.Element;
};
