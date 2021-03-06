/**
 * @license
 * Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

(function (Mocha) {
  function extendInterfaceWithFixture (interfaceName) {
    var originalInterface = Mocha.interfaces[interfaceName];

    Mocha.interfaces[interfaceName] = function (suite) {
      originalInterface.apply(this, arguments);

      suite.on('pre-require', function (context, file, mocha) {
        if (!(context.afterEach || context.teardown)) {
          return;
        }

        context.fixture = function (fixtureId) {
          (context.afterEach || context.teardown)(function () {
            document
              .getElementById(fixtureId)
              .restore();
          });

          return document
            .getElementById(fixtureId)
            .create();
        };
      });
    };
  }

  Object.keys(Mocha.interfaces).forEach(extendInterfaceWithFixture);
})(this.Mocha);
