import axios from 'axios';

const data = '/mockedData.json';
/**
 * A mocked data for testing component app.
 *
 * @return  {Promise<Object>}  data promise
 */
export const getAllDataMocked = () => {
  return axios.get(data).then((response) => response.data);
};

// export const getDataByUserId = (userId, data) => {
//   return data.map((obj) => obj.userId === userId);
// };