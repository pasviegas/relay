/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelayRouteFragment
 * @flow
 * @typechecks
 */

'use strict';

import type * as GraphQL from 'GraphQL';
import type RelayFragmentReference from 'RelayFragmentReference';
import type RelayMetaRoute from 'RelayMetaRoute';

type FragmentBuilder =
  (route: RelayMetaRoute) => ?GraphQL.QueryFragment | ?RelayFragmentReference;

/**
 * Represents a query fragment that is conditional upon the active route as a
 * function that returns either a literal fragment or a fragment reference.
 *
 * Example GraphQL:
 *
 * ```
 * Node {
 *   ${(route) => matchRoute(route, ...)}
 * }
 * ```
 */
class RelayRouteFragment {
  _builder: FragmentBuilder;

  constructor(builder: FragmentBuilder) {
    this._builder = builder;
  }

  /**
   * Returns the query fragment that matches the given route, if any.
   */
  getFragmentForRoute(
    route: RelayMetaRoute
  ): ?GraphQL.QueryFragment | ?RelayFragmentReference {
    return this._builder(route);
  }
}

module.exports = RelayRouteFragment;
