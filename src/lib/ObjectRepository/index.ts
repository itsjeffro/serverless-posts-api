export default class ObjectRepository {
    public get(items: any, key?: string, defaultValue?: string) {
      // If no key is provided, then return all set items.
      if (key === undefined) {
        return items;
      }
  
      // If the provided items has a single valid property,
      // then return the contents of the target property.
      if (items[key]) {
        return items[key];
      }
  
      // If no multi-level key is provided and the property
      // does not exist in items, then return a default.
      if (key.indexOf('.') === -1) {
        return defaultValue || null;
      }
  
      // If a multi-level key was provided, then we'll loop through until we get something back.
      let itemsCollection = items;
  
      for (const segment of key.split('.')) {
        if (itemsCollection[segment] === undefined) {
          return defaultValue || null;
        }
  
        itemsCollection = itemsCollection[segment];
      }
  
      return itemsCollection;
    }
  }