/**Constructor Pattern - User
 * @constructor
 * @param {string} userId
 * @param {object} data  contains all user data
 * @param {object} dataApi contains data from Api
 */
export class User {
    constructor(userId, data, dataApi) {
      this._userId = userId;
      this._data = data;
      this._dataApi = dataApi;
      // console.log('User Data :' + this._dataApi);
    }
    /**
     * Gets FirstName from initial data
     *
     * @return  {string}  FirstName
     */
    get _firstName() {
      let firstName = 'Unknown MotherFucking User';
      this._data.userMainData.forEach((user) => {
        // console.log('condition userId', user.userId);
        if (user.userId === parseInt(this._userId)) {
          firstName = user.userInfos.firstName;
          //console.log('condition userId', user.todayScore);
        }
      });

      return firstName;
    }
}
