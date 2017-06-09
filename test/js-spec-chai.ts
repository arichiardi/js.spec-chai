/**
 * @copyright Copyright (c) Elastic Path Software Inc., 2017
 */
/// <reference path="js-spec-chai.d.ts"/>
import * as S from "js.spec";

export default function(chai, utils) {
  "use strict";

  const Assertion = chai.Assertion;
  const assertionPrototype = Assertion.prototype;

  function buildNegativeMsg(spec, value) {
    return "" + JSON.stringify(value, null, "\t") +
      ` conforms to ${spec.name} but it should not`;
  }

  Assertion.addMethod("conform", function(spec: Spec) {
    const obj = this._obj;
    this.assert(S.valid(spec, obj), S.explainStr(spec, obj), buildNegativeMsg(spec, obj));
  });
};
