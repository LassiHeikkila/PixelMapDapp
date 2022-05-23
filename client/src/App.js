import React, { useRef } from 'react';
import PixelMapContract from './artifacts/PixelMapContract.json';
import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle } from '@drizzle/store';
import Web3 from 'web3';
import { newContextComponents } from '@drizzle/react-components';

import MyDapp from './MyDapp';

const drizzleOptions = {
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:7545"),
  },
  contracts: [PixelMapContract],
}

const drizzle = new Drizzle(drizzleOptions);

function App() {
  return (
    <div>
      <canvas id="mycanvas" height={320} width={320} style={{border: "1px solid black"}}></canvas>
      <br></br>
      <DrizzleContext.Provider drizzle={drizzle}>
        <DrizzleContext.Consumer>
          { drizzleContext => {
            const { drizzle, drizzleState, initialized } = drizzleContext;

            if (!initialized) {
              return "Loading..."
            }

            return (
              <MyDapp drizzle={drizzle} drizzleState={drizzleState} />
            ) 
          }}
        </DrizzleContext.Consumer>
      </DrizzleContext.Provider>
    </div>
  );
}

export default App;
