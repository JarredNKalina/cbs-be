export function exclude<T, Key extends keyof T>(entity: T, ...keys: Key[]): Omit<T, Key> {
	for (const key of keys) {
		delete entity[key]
	}
	return entity
}
