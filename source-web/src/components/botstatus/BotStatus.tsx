import * as React from 'react';

export interface IBotStatusProps {
}

export interface IBotStatusState {
}

export default class BotStatus extends React.Component<IBotStatusProps, IBotStatusState> {
  constructor(props: IBotStatusProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <div className="container">
        <h1>Bot status</h1>
      </div>
    );
  }
}
