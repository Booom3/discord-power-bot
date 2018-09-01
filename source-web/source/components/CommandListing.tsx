import * as React from 'react';
import { CommandViewModel } from '@models/CommandViewModel';
import Command from './Command';

export interface CommandListingProps {
    Commands: CommandViewModel[];
}

export default class CommandListing extends React.Component<CommandListingProps, any> {
  public render() {
    return (
      <div>
        {this.props.Commands.map(x => new Command({Command: x}))}
      </div>
    );
  }
}
