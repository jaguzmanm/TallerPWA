import React from 'react';

import * as ReactDOMClient from "react-dom/client";
import "./styles.css";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import Joke from "./joke.js";
import Marvel from './marvel';

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

root.render(<Marvel/>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

