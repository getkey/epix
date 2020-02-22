// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface ActionLike {
	type: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[index: string]: any;
}
