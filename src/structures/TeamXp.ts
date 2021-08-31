export class TeamXp {
  public userIDs!: string[];
  public amount!: number;

  private _token: string;

  constructor(data: object, token: string) {
    this._token = token;
    this.patchData(data);
  }

  /**
   * @ignore
   * @private
   * @param {any} data
   * @returns {void}
   */
  private patchData(data: any): void {
    this.userIDs = data.userIds;
    this.amount = data.amount;
  }
}
