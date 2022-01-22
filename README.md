![Logo](admin/power-off.png)
# ioBroker.power-off

[![NPM version](https://img.shields.io/npm/v/iobroker.power-off.svg)](https://www.npmjs.com/package/iobroker.power-off)
[![Downloads](https://img.shields.io/npm/dm/iobroker.power-off.svg)](https://www.npmjs.com/package/iobroker.power-off)
![Number of Installations](https://iobroker.live/badges/power-off-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/power-off-stable.svg)
[![Dependency Status](https://img.shields.io/david/jobe451/iobroker.power-off.svg)](https://david-dm.org/jobe451/iobroker.power-off)

[![NPM](https://nodei.co/npm/iobroker.power-off.png?downloads=true)](https://nodei.co/npm/iobroker.power-off/)

**Tests:** ![Test and Release](https://github.com/jobe451/ioBroker.power-off/workflows/Test%20and%20Release/badge.svg)

## power-off adapter for ioBroker

Allows to power off your linux box.

This adapter was created to shutdown a slave-host on low battery level of its UPS.

For restarting the adapter either executes "systemctl poweroff -i" or "systemctl reboot -i".

## Changelog
* 1.0.0 (Daniel Keller) initial release

## License
MIT License

Copyright (c) 2022 Daniel Keller <jobe451@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.