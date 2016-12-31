var APIs = {
  uploadDataPoint: function(deviceId, appId, appSecret, dataChannel, timestamp, value, host) {
    return fetch(host + '/mcs/v2/devices/' + deviceId + '/datapoints.csv', {
      method: 'POST',
      headers: {
        'appId': appId,
        'appSecret': appSecret,
      },
      body: dataChannel + ',' + timestamp + ',' + value,
    });
  }

}

module.exports = APIs;