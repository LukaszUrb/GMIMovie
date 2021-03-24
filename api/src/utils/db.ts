import { Model, Document } from "mongoose";

interface Entry {
    [key: string]: any;
}

export async function synchEntity<T extends Entry>(propKey: keyof T, model: Model<any>, obj: T, delimiter?: string): Promise<string[]> {
    const
        objectValues: string[] = delimiter ? obj[propKey].split(delimiter) : [obj[propKey]],
        entityIds: string[] = [];


    for (const value of objectValues) {
        Object.assign(obj, { [propKey]: value });
        const existingEntity: Document<any> = await model.findOne().where(propKey.toString(), value);
        existingEntity ? entityIds.push(existingEntity.id) : entityIds.push(await (await model.create(obj)).id);
    }

    return entityIds;
}

export async function populateEntity<T extends object, D extends Document>(entityKeys: Array<keyof T>, doc: D): Promise<void> {
    const promises: Promise<D>[] = [];

    entityKeys.forEach((key) => {
        promises.push(doc.populate(key.toString()).execPopulate());
    });

    await Promise.all(promises);
}
