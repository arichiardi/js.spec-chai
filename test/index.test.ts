/**
 * This is free and unencumbered software released into the public domain.
 *
 * Anyone is free to copy, modify, publish, use, compile, sell, or
 * distribute this software, either in source code form or as a compiled
 * binary, for any purpose, commercial or non-commercial, and by any
 * means.
 *
 * In jurisdictions that recognize copyright laws, the author or authors
 * of this software dedicate any and all copyright interest in the
 * software to the public domain. We make this dedication for the benefit
 * of the public at large and to the detriment of our heirs and
 * successors. We intend this dedication to be an overt act of
 * relinquishment in perpetuity of all present and future rights to this
 * software under copyright law.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * For more information, please refer to <http://unlicense.org/>
 */

/// <reference types="js.spec" />

import * as chai from "chai";
import * as S from "js.spec"

import jsSpecChai from "../src/index";

chai.use(jsSpecChai);
chai.should();

describe("Spec tests", () => {

  context("with nested maps", () => {
    const school = S.spec.map("schoolSpec", {
      city: S.spec.string
    });
    const friend = S.spec.map("friendSpec", {
      name: S.spec.string,
      age: S.spec.number,
      school
    });

    it("conforms a good object", () => {
      const obj = {
        name: "andrea",
        age: 18,
        school: {
          city: "Turin",
        }
      };
      obj.should.conform(friend);
    })

    it("does not conform is there is a missing key", () => {
      const obj = {
        name: "andrea",
        school: {
          city: "Turin",
        }
      };
      obj.should.not.conform(friend);
    });

    it("does not conform is there is a key with wrong type", () => {
      const obj = {
        name: "andrea",
        age: "18",
        school: {
          city: "Turin",
        }
      };
      obj.should.not.conform(friend);
    })

    it("does not conform is there is a nested missing key", () => {
      const obj = {
        name: "andrea",
        age: 18,
        school: {}
      };
      obj.should.not.conform(friend);
    });

  });
});
