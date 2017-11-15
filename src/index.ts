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

/// <reference types="chai" />
/// <reference types="js.spec" />

import * as S from "js.spec";

// Needs declare or it won't work!
// https://stackoverflow.com/a/46755166/1888507
declare global {
  export namespace Chai {
    export interface Assertion {
      conform(spec: S.Spec): void;
      // Added for extension
      addMethod(name: string, fn: (param: any) => void);
    }
  }
}

export default function(chai: any, utils: any): void {

  const Assertion: Chai.Assertion = chai.Assertion;

  function negativeMsg(spec: S.Spec, value: object): string {
    return "" + JSON.stringify(value, null, "\t") + ` conforms to ${spec.name} but it should not`;
  }

  Assertion.addMethod("conform", function(spec: S.Spec) {
    const obj = this._obj;
    this.assert(S.valid(spec, obj), S.explainStr(spec, obj), negativeMsg(spec, obj));
  });
}
