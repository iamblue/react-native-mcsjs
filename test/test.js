
import MCSjs from '../index';

const myApp = MCSjs.register({
  appId: '673549393943134',
  appSecret: '0Eei1OGcGT6wxZ2aKWO3LHvvpLEs1SKe',
  deviceId: 'DU8xrUWV',
});

myApp.on('encodeByMD5', function(data) {
  console.log(data);
  myApp.emit('decodeByMD5', '', 'iiii');
});