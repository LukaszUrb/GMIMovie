import { Model, Document } from "mongoose";

export async function synchEntity<T extends object, D extends Document, M extends Model<any>>(property: keyof T, model: M, object: T, delimiter?: string): Promise<string[]> {
    const
        key = property.toString(),
        objectValues: string[] = delimiter ? object[key].split(delimiter) : [object[key]],
        entityIds: string[] = [];

    for (const value of objectValues) {
        object[key] = value;
        const existingEntity: D = await model.findOne().where(key, value);
        existingEntity ? entityIds.push(existingEntity.id) : entityIds.push(await (await model.create(object)).id);
    }

    return entityIds;
}

export async function populateEntity<T extends object, D extends Document>(entityKeys: Array<keyof T>, doc: D): Promise<void> {
    const
        keys = entityKeys.map(String),
        promises: Promise<D>[] = [];

    keys.forEach((key) => {
        promises.push(doc.populate(key).execPopulate());
    });

    await Promise.all(promises);
}
