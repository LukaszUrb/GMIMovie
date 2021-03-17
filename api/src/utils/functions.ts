import { BadRequest, ServiceUnavailable } from "../errors";
import fetch, { Response } from "node-fetch";

export function asArray<T>(v: T | T[]): T[] {
    return Array.isArray(v) ? v : [v];
}

export function toStringArray(data: string, delimiter: string): string[] {
    return data.split(delimiter);
}

export async function dataFetch<TPayload>(url: string): Promise<TPayload> {
    let response: Response;
    try {
        response = await fetch(url);
    } catch (err) {
        throw new ServiceUnavailable("External service is unavailable.");
    }

    if (!response.ok) throw new BadRequest();

    return await response.json();
}

export function customDateFormat(stringDate: string): Date {
    return new Date(Date.parse(stringDate));
}
