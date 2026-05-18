export function excludeFields<Model, Key extends keyof Model>(
    model: Model,
    keys: Key[],
): Omit<Model, Key> {
    const clone = { ...model };
    for (const key of keys) {
        delete clone[key];
    }
    return clone;
}
