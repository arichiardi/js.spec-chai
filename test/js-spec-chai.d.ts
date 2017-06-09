/**
 * @copyright Copyright (c) Elastic Path Software Inc., 2017
 */
declare module Chai {
  interface Assertion {
    conform(spec: object): void;
  }
}

declare class Spec {
  constructor(name: string, options: object);

  name: string;
  object: object;

  conform(value: object): undefined | object;
}
