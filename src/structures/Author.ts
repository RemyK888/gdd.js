/**
 * Class symbolizing an `Author`
 * @class
 */
export class Author {
  /**
   * Author ID
   */
  public id: string;

  private _token: string;

  /**
   * Create a new Author
   * @param {string} id
   * @param {string} token
   * @constructor
   */
  constructor(id: string, token: string) {
    this._token = token;
    this.id = id;
  }
}
