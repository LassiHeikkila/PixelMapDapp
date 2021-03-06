# PixelMapDApp

This DApp allows the user to toggle pixels on and off.

It was inspired by https://pixelcanvas.io

The app is limited to a 16*16 grid, mostly due to efficiency reasons.

You can run the DApp if you are running Ganache locally. Just `truffle migrate` and run the frontend from within the client directory with `npm run start`. 

You should see something like this:

![image](https://user-images.githubusercontent.com/10546142/169889341-700ba9b7-bee2-46db-af2f-5fe55eb4b7d5.png)

Most of the DApp is implemented [here](client/src/MyDapp.js).

## Future improvements
- bigger grid
- colours
- lock a pixel for some time when it is changed(?)
- export grid state as NFT and profit!
