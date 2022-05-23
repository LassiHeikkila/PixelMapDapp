import React, { useState, useEffect } from 'react';

import { newContextComponents } from '@drizzle/react-components';
import PixelMapContract from './artifacts/PixelMapContract.json';

const { ContractData, ContractForm } = newContextComponents;

const MyDapp = ({drizzle, drizzleState}) => {
    const [ pixels, setPixels] = useState(null);
    const [ height, setHeight ] = useState(0);
    const [ width, setWidth ] = useState(0);

    const scaling = 20;

    const state = drizzle.store.getState();

    const contract = drizzle.contracts.PixelMapContract;
    const canvas = document.getElementById('mycanvas');
    const ctx = canvas.getContext('2d');

    const [heightKey, setHeightKey] = useState(null); 
    const [widthKey, setWidthKey] = useState(null); 
    const [pixelsKey, setPixelsKey] = useState(null); 

    useEffect(() => {
        const hk = contract.methods["getHeight"].cacheCall();
        const wk = contract.methods["getWidth"].cacheCall();
        const pk = contract.methods["getPixels"].cacheCall();

        if (hk) {
            setHeightKey(hk);
        }

        if (wk) {
            setWidthKey(wk);
        }

        if (pk) {
            setPixelsKey(pk);
        }
    }, [contract.methods]);

    useEffect(() => {
        const v = state.contracts.PixelMapContract.getHeight[heightKey];
        if (v && v.value) {
            setHeight(v.value)
        }
    }, [heightKey, state.contracts.PixelMapContract.getHeight]);

    useEffect(() => {
        const v = state.contracts.PixelMapContract.getWidth[widthKey];
        if (v && v.value) {
            setWidth(v.value)
        }
    }, [widthKey, state.contracts.PixelMapContract.getWidth]);

    useEffect(()=>{
        const v = state.contracts.PixelMapContract.getPixels[pixelsKey];
        if (v && v.value) {
            setPixels(v.value)
        }
    }, [pixelsKey, state.contracts.PixelMapContract.getPixels]);

    useEffect(() => {
        if (pixels === null) {
            return;
        }
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                const idx = y*width + x;
                if (pixels[idx] === true) {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(x*scaling, y*scaling, 1*scaling, 1*scaling);
                } else {
                    ctx.fillStyle = 'white';
                    ctx.fillRect(x*scaling, y*scaling, 1*scaling, 1*scaling);
                }
            }
        }
    }, [pixels, height, width, ctx]);
    
    return (
        <div>
            <h4>Current PixelMapContract state:</h4>
            <h5>PixelMap height:</h5>
            {height}
            <h5>PixelMap width:</h5>
            {width}
            <h5>Set pixel state:</h5>
            <ContractForm
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="PixelMapContract"
                method="setPixel"
            />
            <h5>Plain data:</h5>
            <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="PixelMapContract"
                method="getPixels"
            />
        </div>
    )
}

export default MyDapp;