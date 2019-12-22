import ObjectRepository from "../ObjectRepository";

export default class Config
{
  /**
   * Config items.
   */
  public items: any;

  /**
   * Config constructor.
   */
  public constructor(items: any) {
    this.items = items;
  }

  /**
   * Return config object or value specified by the passed key.
   */
  public get(key?: string, defaultValue?: string) {
    const objectRepository = new ObjectRepository;

    return objectRepository.get(this.items, key, defaultValue);
  }
}
