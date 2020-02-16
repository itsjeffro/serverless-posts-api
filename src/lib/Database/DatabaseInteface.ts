export default interface DatabaseInterface {
  /**
   * Executes query.
   *
   * @param {string} query
   * @param {any?} argument1
   * @param {any?} argument2
   */
  execute(query: string, argument1?: any, argument2?: any): any

    /**
   * Change database.
   *
   * @param {object} query
   * @param {any} callback
   */
  changeUser(options: object, callback: any): any
}
