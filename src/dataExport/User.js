/**Constructor Pattern - User
 * @constructor
 * @param {string} userId
 * @param {object} data  contains all user data
 */
export class User {
    constructor(userId, data) {
      this._userId = userId;
      this._data = data;
    }
    /**
     * Gets FirstName from initial data
     *
     * @return  {string}  FirstName
     */
    get _firstName() {
        const user = this._data?.user
        return user?.userInfos.firstName;
    }
  }