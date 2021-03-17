import { ILang, IMovie, IPerson, Lang, LangDocument, Person, PersonDocument } from "../../models";
import { Model } from "mongoose";
import { API_KEY_OMDB } from "../../config";
import { IPayloadOmdbMovie } from "./interfaces";
import { NotFound } from "../../errors";
import { customDateFormat, dataFetch, synchEntity } from "../../utils";

class OmdbApi {
    private getUrl(title: string): string {
        return `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${API_KEY_OMDB}`;
    }

    private validateResponse(payload: IPayloadOmdbMovie): void {
        if (payload.Response === "False") throw new NotFound("Movie not found in external service.");
    }

    private async serialize(payload: IPayloadOmdbMovie): Promise<IMovie> {
        return {
            title: payload.Title,
            languages: await synchEntity<ILang, LangDocument, Model<LangDocument>>("name", Lang, { name: payload.Language }, ", "),
            plot: payload.Plot,
            released: customDateFormat(payload.Released),
            actors: await synchEntity<IPerson, PersonDocument, Model<PersonDocument>>("name", Person, { name: payload.Actors, role: "actor" }, ", "),
            director: await synchEntity<IPerson, PersonDocument, Model<PersonDocument>>("name", Person, { name: payload.Director, role: "director" }, ", ")
        };
    }

    async fetchMovie(title: string): Promise<IMovie> {
        const url = this.getUrl(title);
        const payload = await dataFetch<IPayloadOmdbMovie>(url);
        this.validateResponse(payload);
        return await this.serialize(payload);
    }
}

export const ombdApi = new OmdbApi();
