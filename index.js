import api from './api';

if (global.navigator && global.navigator.product === 'ReactNative') {
    global.navigator.mimeTypes = '';
    try {
        global.navigator.userAgent = 'ReactNative';
    }
    catch (e) {
        console.log('Tried to fake useragent, but failed. This is normal on some devices, you may ignore this error: ' + e.message);
    }
}

function init(apiHost, wsHost, appId, appSecret, deviceId) {
  const io = require('socket.io-client');
  const socket = io(wsHost, { secure: true });
  return {
    on: function(dataChannel, callback, _deviceId) {
      let DeviceId = deviceId;
      if (_deviceId) { DeviceId = _deviceId }

      if (/^mcs\:/g.test(dataChannel)) {
        //mcs:connect === socket connect!
        //mcs:disconnect === socket disconnect!
        return socket.on(dataChannel.replace('mcs:', ''), callback);
      } else {
        return socket.on('/devices/' + DeviceId + '/dataChannels/' + dataChannel, function() {
          if(callback) callback.apply(null,[].slice.call(arguments))
        });
      }
    },

    emit : function(dataChannel, timestamp, value, _deviceId ) {
      let DeviceId = deviceId;
      if (_deviceId) { DeviceId = _deviceId }

      return api.uploadDataPoint(DeviceId, appId, appSecret, dataChannel, timestamp, value, apiHost);
    },

  }

}

function mcs() {

  this.wsHost = '';
  this.apiHost = '';
  this.appId = '';
  this.deviceId = '';
  this.appSecret = '';
  this.api = api;

  this.register = function(config) {
    this.appId = config.appId;
    this.appSecret = config.appSecret;
    this.host = config.host || 'com';
    this.deviceId = config.deviceId || '';

    if (this.host == 'com') {
      this.wsHost = config.wsHost || 'https://mcsws.mediatek.com';
      this.apiHost = config.apiHost || 'https://api.mediatek.com';
    } else if (host == 'cn') {
      this.wsHost = config.wsHost || 'https://mcsws.mediatek.cn';
      this.apiHost = config.apiHost || 'https://api.mediatek.cn';
    }

    return init(this.apiHost, this.wsHost, this.appId, this.appSecret, this.deviceId);
  };
}

module.exports = new mcs();