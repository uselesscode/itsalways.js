itsalways.js - Date mocking for JavaScript
=============
itsalways.js is a small library that wraps the Date constructor and allows you to force a specific time
to be returned by calls that normally return the current time. This is useful when writing tests for code
that uses the `new Date()` form of the constructor or `Date.now()` as it allows you to have a predictable
result.

API
---
* `itsalways.start()` - by default itsalways.js does not wrap the `Date` object, use `.start()` to start overriding the default `Date` behavior
* `itsalways.stop()` - restore normal `Date` behavior
* `itsalways.local()` - sets the date/time to be returned based on local time, accepts the same parameters as the [`Date` constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* `itsalways.UTC()` - sets the date/time to be returned based on universal time, accepts the same parameters as [`Date.UTC()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC)
* `itsalways()` - invoking `itsalways` will return an integer timestamp of the date/time that is set as the current time.

Example
-------
Note that as is demonstrated by the last two `console.log` statements, `itsalways` only overrides `Date.now`
and the parameterless form of `Date()`. If you provide parameters to `Date()` it will create a date object
based on those parameters as it normally would.

    var expected = Date.UTC(1985, 9, 26); // Oct 26, 1985 (month is zero based)

    itsalways.UTC(1985, 9, 26); // go back to the future
    itsalways.start();

    console.log(expected == Date.now()); // true
    console.log(expected == (new Date()).getTime()); // true
    console.log(expected == (new Date(2000, 0)).getTime()); // false
    console.log(expected == (new Date(1445842800000)).getTime()); // false

Building
--------
To build and work with itsalways.js you need to have the following installed:

* [npm](http://npmjs.org/)
* [gulp](http://gulpjs.com/)
* [bower](http://bower.io/)

After you clone the git repo, run `npm install` and `bower install` to install dependencies. Once the dependencies are installed build by running `gulp`.

#Gulpfile options
-----------------

* `gulp minify` (default) Lints itsalways.js, minifies it and outputs the result in dist/
* `gulp gz` Does everything `gulp minify` does and then g-zips the outputted file.
* `gulp lint` Lints the source files with [ESLint](http://eslint.org/)
* `gulp watch` Watches source files for changes and automatically runs lint.
* `gulp clean-dist` Deletes the dist/ directory.
