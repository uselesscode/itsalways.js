/*!
 * itsalways.js v1.0.0
 * Copyright 2014 Peter Johnson
 * MIT license
 * https://github.com/uselesscode/itsalways.js
 */

/*global Date:true */
var itsalways = (function (RealDate) {
  'use strict';
  var timestamp = RealDate.UTC(2000, 0, 1, 0, 0, 0, 0), // default to Y2k

    itsalways = function () {
      return timestamp;
    },

    FakeDate = function () {
      var args = [].slice.call(arguments, 0);
      if (args.length === 0) {
        return new RealDate(timestamp);
      }
      /*eslint-disable no-spaced-func */
      return new (Function.prototype.bind.apply(RealDate, [null].concat(args)));
      /*eslint-enable no-spaced-func */
    };

  FakeDate.UTC = function () {
    var args = [].slice.call(arguments, 0);
    return RealDate.UTC.apply(RealDate, args);
  };

  FakeDate.now = function () {
    return timestamp;
  };

  FakeDate.parse = function (s) {
    return RealDate.parse(s);
  };

  itsalways.local = function () {
    var args = [].slice.call(arguments, 0);
    /*eslint-disable no-spaced-func */
    timestamp = (new (Function.prototype.bind.apply(RealDate, [null].concat(args)))).getTime();
    /*eslint-enable no-spaced-func */
  };

  itsalways.UTC = function () {
    var args = [].slice.call(arguments, 0);
    timestamp = RealDate.UTC.apply(RealDate, args);
  };

  itsalways.stop = function () {
    Date = RealDate;
  };

  itsalways.start = function () {
    Date = FakeDate;
  };

  return itsalways;
}(Date));
