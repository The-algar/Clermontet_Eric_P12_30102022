import axios from 'axios';
import { useState, useEffect } from 'react';

const BASE_URL = 'http://localhost:3000/user/';

const END_POINTS = (id) => {
  return [
    `${BASE_URL}${id}`,
  ];
};

/**
 * Hook used to extract data from the SportSee API to feed the dashboard.
 * @param {string} service
 * @param {string} userId
 * @returns {undefined|Object}
 */
export function Api(userId) {
  const [apiData, setData] = useState({});
  const [isApiLoading, setIsLoading] = useState(true);
  const [errorApi, setErrorApi] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setErrorApi('');
      axios
        .all(END_POINTS(userId).map((endPoint) => axios.get(endPoint)))
        .then(
          axios.spread((user) => {
            JSON.stringify(user);
            return { user };
          })
        )
        .then((results) => {
          setData(results);
          setIsLoading(false);
          setErrorApi(null);
        })
        .catch((error) => {
          setIsLoading(false);
          setErrorApi(error.message);
          throw new Error(error);
        });
    };

    fetchData();
  }, [userId]);

  const { user } = apiData;
  const userApi = user?.data?.data;
  return {
    userApi,
    isApiLoading,
    errorApi,
  };
}
