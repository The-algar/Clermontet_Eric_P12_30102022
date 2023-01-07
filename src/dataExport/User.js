/**Constructor Pattern - User
 * 
 * @constructor
 * @param {string} userId
 * @param {object} data  contains all user data
 */
export class User {
    constructor(userId, data) {
      this._userId = userId;
      this._data = data;
      // console.log('User :', userId);
    }
    /**
     * Gets FirstName from initial data
     *
     * @name User first name
     * @return  {string}  FirstName
     */
    get _firstName() {
        const user = this._data.user
        return user?.userInfos.firstName;
    }
  }
      