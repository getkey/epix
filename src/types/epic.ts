import { Observable } from 'rxjs';

import { ActionLike } from './ActionLike.js';

// courtesy of URL below
// https://github.com/redux-observable/redux-observable/blob/e0e658d17fd40eabe0f9c43e2a45db4aa1d1b3d3/src/epic.ts
export declare interface Epic<
  Input extends ActionLike = any,
  Output extends Input = Input,
  Dependencies = any,
> {
  (
    action$: Observable<Input>,
    dependencies: Dependencies
  ): Observable<Output>;
}
