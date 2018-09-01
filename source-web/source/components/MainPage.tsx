import * as React from 'react';
import CommandListing from "@components/CommandListing";

export interface MainPageProps {
}

export default class MainPage extends React.Component<MainPageProps, any> {
  public render() {
    return (
      <div>
        <CommandListing Commands={[{command: "!hello", response: "Welcome!"}]} />
      </div>
    );
  }
}
