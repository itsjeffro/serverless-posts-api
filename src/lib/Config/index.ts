export default class Config {
  public items: any;

  public constructor(items: any) {
    this.items = items;
  }

  public get(key?: string, defaultValue?: string) {
    // If no key is provided, then return all set items.
    if (key === undefined) {
      return this.items;
    }

    // If the provided items has a single valid property,
    // then return the contents of the target property.
    if (this.items[key]) {
      return this.items[key];
    }

    // If no multi-level key is provided and the property
    // does not exist in items, then return a default.
    if (key.indexOf('.') === -1) {
      return defaultValue || null;
    }

    // If a multi-level key was provided, then we'll loop through until we get something back.
    let items = this.items;

    for (const segment of key.split('.')) {
      if (items[segment] === undefined) {
        return defaultValue || null;
      }

      items = items[segment];
    }

    return items;
  }
}