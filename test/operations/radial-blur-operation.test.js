/* global describe, it, beforeEach */
/*jshint -W083 */
"use strict";
/*!
 * Copyright (c) 2013-2014 9elements GmbH
 *
 * Released under Attribution-NonCommercial 3.0 Unported
 * http://creativecommons.org/licenses/by-nc/3.0/
 *
 * For commercial use, please contact us at contact@9elements.com
 */

var path = require("path");
var fs = require("fs");
var should = require("should");
var canvas = require("canvas");
var ImglyKit = require("../..");
var RadialBlurOperation = ImglyKit.Operations.RadialBlurOperation;
var kit, image, radialBlurOperation;

beforeEach(function () {
  image = new canvas.Image();
  var imagePath = path.resolve(__dirname, "../assets/test.png");
  var buffer = fs.readFileSync(imagePath);
  image.src = buffer;

  kit = new ImglyKit({ image: image });
});

describe("RadialBlurOperation", function () {

  describe("#render", function () {

    describe("if `position` is not a Vector2", function () {

      it("should fail", function (done) {
        radialBlurOperation = new RadialBlurOperation(kit, {
          position: null
        });
        kit.operationsStack.push(radialBlurOperation);

        kit.render()
          .then(function (result) {
            should.not.exist(result);
            done();
          })
          .catch(function (err) {
            err.should.be.instanceOf(Error);
            done();
          });
      });

    });

    describe("if `position` is valid", function () {

      it("should succeed", function (done) {
        radialBlurOperation = new RadialBlurOperation(kit, {
          position: new ImglyKit.Vector2(0.5, 0.5)
        });
        kit.operationsStack.push(radialBlurOperation);

        kit.render()
          .then(function () {
            done();
          });
      });

    });

  });

});
