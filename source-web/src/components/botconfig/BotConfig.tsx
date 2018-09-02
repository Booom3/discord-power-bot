import * as React from 'react';
import { getGuilds } from '../../services/RestApi';

export interface IBotConfigProps {
}

export interface IBotConfigState {
    guilds: Array<{
        name: string;
        id: string;
    }>
}

export default class BotConfig extends React.Component<IBotConfigProps, IBotConfigState> {
    constructor(props: IBotConfigProps) {
        super(props);

        this.state = {
            guilds: []
        }
    }

    public init = async () => {
        const res = await getGuilds();
        this.setState({ guilds: res });
    }

    public componentDidMount() {
        this.init();
    }

    public render() {
        return (
            <div className="container">
                <h1>Configure your bot</h1>
                {this.state.guilds.length > 0 && this.state.guilds.map(val => (
                    <div>
                        <strong>{val.name}</strong>
                        {val.id}
                    </div>
                ))}
            </div>
        );
    }
}
