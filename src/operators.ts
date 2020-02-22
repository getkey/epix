import { OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ActionLike } from './types/ActionLike';

// the typings of this functions are courtesy of URL below
// https://github.com/redux-observable/redux-observable/blob/e0e658d17fd40eabe0f9c43e2a45db4aa1d1b3d3/src/operators.ts
export function ofType<
  // All possible actions your app can dispatch
  Input extends ActionLike,
  // The types you want to filter for
  Type extends Input['type'],
  // The resulting actions that match the above types
  Output extends Input = Extract<Input, ActionLike>
>(...types: [Type, ...Type[]]): OperatorFunction<Input, Output> {
	return filter(
		(action): action is Output => types.some((key) => key === action.type)
	);
}
