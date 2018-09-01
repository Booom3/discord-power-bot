import * as React from 'react';
import { CommandViewModel } from '@models/CommandViewModel';

export interface CommandProps {
    Command: CommandViewModel;
}

export default class Command extends React.Component<CommandProps, any> {
  public render() {
    return (
      <div>
        {this.props.Command.command}: {this.props.Command.response}
      </div>
    );
  }
}
