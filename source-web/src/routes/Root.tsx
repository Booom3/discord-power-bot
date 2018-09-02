import * as React from "react";
import { Route } from "react-router-dom";
import BotConfig from '../components/botconfig/BotConfig';
import Layout from "../components/layout/Layout";

export default (
    <React.Fragment>
        <Layout />
        <Route exact={true} path="/">
            <BotConfig />
        </Route>
    </React.Fragment>
);
