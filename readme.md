# Epix

[![npm](https://img.shields.io/npm/v/epix)](https://www.npmjs.com/package/epix)

Epics without [redux-observable](https://redux-observable.js.org/).

## Why?

Epics are a very strong pattern to build maintainable applications with RxJS. They were pioneered by redux-observable, which forces you to use Redux. Epix is for all the cases where you manage your state without Redux.

## Install

```sh
yarn add epix
```

or

```sh
npm install epix
```

## API

```js
import { Subject } from 'rxjs';
import { startEpics, ofType } from 'epix';

const action$ = new Subject();

function logMessageEpic(action$) {
	return action$.pipe(
		ofType('logMessage'),
		tap(({ message }) => console.log(message)),
		map(() => ({ type: 'logMessageDone' })),
	);
}

function doNothingEpic() {
	return empty();
}

const epics = [
	logMessageEpic,
	doNothingEpic,
];

startEpics(epics, action$);

action$.next({
	type: 'logMessage',
	message: 'Hello world',
});
```

If you have no idea what's going on here, I recommend getting accustomed with [redux-observable](https://redux-observable.js.org/) first.


### startEpics(epics, action$, [options])

This is `epix`'s replacement of `createEpicMiddleware` and `combineEpics` in a single function.

#### Arguments

1. `epics: Array<Epic>`: your epics. The order matters, epics higher up in the array run before other
2. `action$: Subject`: the action stream, that actions will go trough.
3. `[options: Object]`: pass what you want here. It will be made available to all epics as their second argument.

## TypeScript

Define your epics with `Epic` as a type.

```ts
import { tap, ignoreElements } from 'rxjs/operators';
import { ofType, Epic } from 'epix';

const logMessageEpic: Epic = (action$) => {
	return action$.pipe(
		ofType('sayHi'),
		tap(() => console.log('Hi!')),
		ignoreElements(),
	);
}
```

Define an action type.


```ts
type Actions = {
	type: 'sayHi';
} | {
	type: 'sayMyName';
	name: string;
};
```

Use it.

```ts
const action$ = new Subject<Actions>();
startEpics<Actions, { logger: (message: string) => {} }>(epics, action$, { logger: console.log });
```
