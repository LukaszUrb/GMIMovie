export function asArray<T>(v: T | T[]): T[] {
    return Array.isArray(v) ? v : [v];
}

export function toStringArray(data: string, delimiter: string): string[] {
    return data.split(delimiter);
}
