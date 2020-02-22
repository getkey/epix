import { merge, Subscription, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ActionLike } from './types/ActionLike';
import { Epic } from './types/epic';

export function startEpics<A extends ActionLike, P>(
	epics: Array<Epic<A, A, P>>,
	action$: Subject<A>,
	params: P,
): Subscription {
	const subscription = merge(
		...epics.map((epic) => epic(action$, params).pipe(
			tap((action: A) => {
				if (action.type === undefined) {
					// eslint-disable-next-line no-console
					console.error(action, 'is not an action and was returned from', epic);
					throw new TypeError('Not an action. Maybe you need to ignoreElements() in your epic.');
				}
			}),
		)),
	).pipe(
		tap((action) => {
			action$.next(action);
		}),
	).subscribe();

	return subscription;
}
