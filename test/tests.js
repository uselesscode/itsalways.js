var y2kms = 946684800000,
  unixEpoch = 0;

test('Off by default', function() {
  var ms = (new Date()).getTime();
  notEqual( ms, y2kms, 'It is not Y2K now.');
  notEqual( ms, unixEpoch, 'It is not the Unix Epoch now.');
});

test('Default to Y2k, .stop() restores default Date', function() {
  itsalways.start();
  itsalways.local(y2kms);

  var ms = (new Date()).getTime();
  equal( ms, y2kms, 'It is Y2K now.');
  notEqual( ms, unixEpoch, 'It is not the Unix Epoch now.');
  itsalways.stop();
  ms = (new Date()).getTime();
  notEqual( ms, y2kms, 'It is not Y2K, after .stop().');
  notEqual( ms, unixEpoch, 'It is not the Unix Epoch, after .stop().');
});

test('itsalways() returns internal timestamp', function() {
  var timestamp = itsalways();

  equal(timestamp, y2kms, 'Y2K is the default timestamp.');
});

test('new Date(0) is uneffected.', function() {
  itsalways.start();
  itsalways.UTC(2000, 0);

  var ms = (new Date(0)).getTime();

  notEqual(ms, y2kms, 'It is not Y2K.');
  equal(ms, unixEpoch, 'It is the Unix Epoch.');

  itsalways.stop();
  ms = (new Date()).getTime();
  notEqual(ms, y2kms, 'It is not Y2K, after .stop().');
  notEqual(ms, unixEpoch, 'It is not the Unix Epoch, after .stop().');
});

test('Date.parse() is uneffected.', function() {
  itsalways.start();
  itsalways.UTC(2000, 0);

  var ms = Date.parse('Tue Jan 28 1986 00:00:00 GMT-0000');
  notEqual(ms, y2kms, 'It is not Y2K.');
  equal(ms, 507254400000, 'It is Jan 28, 1986.');
  itsalways.stop();
});


test('Use a different date using .local()', function() {
  var ms,
    offset = (new Date()).getTimezoneOffset(),
    d = new Date(Date.UTC(1970, 0));

  itsalways.local(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()); // set to Unix Epoch using local time

  itsalways.start();
  ms = (new Date()).getTime();
  notEqual(ms, y2kms, 'It is not Y2K now.');
  equal(ms, unixEpoch, 'It is the Unix Epoch now.');
  itsalways.stop();
  ms = (new Date()).getTime();
  notEqual(ms, y2kms, 'It is not Y2K, after .stop().');
  notEqual(ms, unixEpoch, 'It is not the Unix Epoch, after .stop().');
});

test('Use a different date using .UTC()', function() {
  itsalways.UTC(1970, 0); // set to Unix Epoch
  itsalways.start();
  var ms = (new Date()).getTime();
  notEqual(ms, y2kms, 'It is not Y2K now.');
  equal(ms, unixEpoch, 'It is the Unix Epoch now.');
  itsalways.stop();
  ms = (new Date()).getTime();
  notEqual(ms, y2kms, 'It is not Y2K, after .stop().');
  notEqual(ms, unixEpoch, 'It is not the Unix Epoch, after .stop().');
});

test('Date.now() returns fake date', function() {
  itsalways.local(unixEpoch);
  itsalways.start();
  var ms = Date.now();
  notEqual(ms, y2kms, 'It is not Y2K now.');
  equal(ms, unixEpoch, 'It is the Unix Epoch now.');
  itsalways.stop();
  ms = Date.now();
  notEqual(ms, y2kms, 'It is not Y2K, after .stop().');
  notEqual(ms, unixEpoch, 'It is not the Unix Epoch, after .stop().');
});
