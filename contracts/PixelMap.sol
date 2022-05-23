// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

// A simple smart contract representing a 32*32 bitmap where each pixel can be individually controlled with 1-bit colour (on/off)
// Essentially https://pixelcanvas.io/ but on a much smaller scale.
// Keeping it small because its incredibly inefficient :)
contract PixelMapContract {
    uint constant height = 16;
    uint constant width = 16;
    bool[width*height] public pixels;

    function getPixels() public view returns (bool[width*height] memory) {
        return pixels;
    }

    function getHeight() public pure returns(uint) {
        return height;
    }

    function getWidth() public pure returns (uint) {
        return width;
    }

    function setPixel(uint x, uint y, bool on) public {
        pixels[y*width+x] = on;
    }
}

