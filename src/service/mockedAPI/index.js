import axios from 'axios';

const data = '/mockedData.json';
/**
 * A mocked data for testing component app.
 * 
 * @name mockedApi
 * @return  {Promise<Object>}  data promise
 */
export const getAllDataMocked = () => {
  return axios.get(data).then((response) => response.data);
}