const base = import.meta.env.BASE_URL;

export const routerBasename =
	base !== "/" ? base.replace(/\/+$/, "") : undefined;
