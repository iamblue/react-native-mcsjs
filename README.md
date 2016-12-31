# React-native-mcsjs: A react-native library for Mediatek cloud sandbox

## Installation

```
  $ npm install react-native-mcsjs --save
```
* Only support >= 6 Nodejs version

## Usage

* First, goto MCS.

You should get the appId and appSecrete under the Service provider section in the Profile page.

* Second, In your React Native Project

```
import MCSjs from '../index';

const myApp = MCSjs.register({
  appId: '673549393943134',
  appSecret: '0Eei1OGcGT6wxZ2aKWO3LHvvpLEs1SKe',
  deviceId: 'DU8xrUWV',
});

myApp.on('encodeByMD5', function(data) {
  // Listening 'encodeByMD5' channel's command.
  console.log(data);

  myApp.emit('decodeByMD5', '', 'iiii');
  // Sending control command or upload datapoint to 'decodeByMD5' channel
});

```
