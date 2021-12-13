import React from 'react';
import { Field } from 'react-final-form';

interface IOnChangeProps {
  name: string;
  children: (value: any, previous: any) => void;
}

interface IOnChangeStateProps {
  children: (value: any, previous: any) => void;
  input: {
    value: any;
  };
}

interface IState {
  previous: any;
}

class OnChangeState extends React.Component<IOnChangeStateProps, IState> {
  constructor(props: IOnChangeStateProps) {
    super(props);
    this.state = {
      previous: props.input.value,
    };
  }

  componentDidUpdate() {
    const {
      children,
      input: { value },
    } = this.props;
    const { previous } = this.state;
    if (value !== previous) {
      this.setState({ previous: value });
      children(value, previous);
    }
  }

  render() {
    return null;
  }
}

/**
 * [OnChange](https://github.com/final-form/react-final-form-listeners/blob/master/src/OnChange.js) component for react-final-form.
 *
 * [Readme](https://github.com/final-form/react-final-form-listeners#usage)
 */
export const OnChange = ({ name, children }: IOnChangeProps) =>
  React.createElement(Field, {
    name,
    subscription: { value: true },
    allowNull: true,
    render: props => React.createElement(OnChangeState, { ...props, children }),
  });
