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
        // console.log('log userId', user.userId);
        if (user.userId === parseInt(this._userId)) {
          firstName = user.userInfos.firstName;
          // console.log('result userId', user.userInfos.firstName);
        }
      });

      return firstName;
    }
  /**
   * Gets FirstName from initial data
   *
   * @return  {string}  FirstName
   */
  get _toDayScore() {
    let score = 0;
    this._data.userMainData.forEach((user) => {
      if (user.userId === parseInt(this._userId)) {
        score = user.todayScore;
      }
    });

    return score;
  }

  /**
   * Formats User keyData from initial data
   *
   * @return  les array de  nutriments et values
   */
  get _keyData() {
    const nutriments = ['Calories', 'Protéines', 'Glucides', 'Lipides'];
    let values = new Array(5);
    // eslint-disable-next-line no-unused-vars
    const userData = this._data.forEach((user) => {
      if (user.userId === parseInt(this._userId)) {
        // console.log(user.keyData);
        values = Object.values(user.keyData);
      }
    });

    return { nutriments, values };
  }

  /**
   * Formats User keyData from Api
   *
   * @return  {{nutriments: Array, values: Array}   { nutriments, values }
   */
  get _keyDataApi() {
    const nutrimentsApi = ['Calories', 'Protéines', 'Glucides', 'Lipides'];
    let valuesApi = new Array(5);

    valuesApi = Object.values(this._dataApi);

    return { nutrimentsApi, valuesApi };
  }
}
