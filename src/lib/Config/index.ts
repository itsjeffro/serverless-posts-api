import ObjectRepository from "../ObjectRepository";

export default class Config {
  public items: any;

  public constructor(items: any) {
    this.items = items;
  }

  public get(key?: string, defaultValue?: string) {
    const objectRepository = new ObjectRepository;

    return objectRepository.get(this.items, key, defaultValue);
  }
}