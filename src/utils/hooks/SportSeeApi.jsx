// //@ts-check

import axios from 'axios'
import { useState, useEffect } from 'react'
import { END_POINTS } from '../../service/API/_index'

/**
 * Hook to fetch data from enpoint(s), using axios. 
 * 
 * @name SportSeeApi
 * @param {Array<string>} service - api 's enpoint(s)
 * @param {string} userId
 * @returns {userId|Object} the data, error and loading state in an object 
 * @function
 */

export function useSportSeeApi(userId) {
  const [apiData, setData] = useState({});
  const [isApiLoading, setIsLoading] = useState(true);
  const [errorApi, setErrorApi] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setErrorApi('');
      axios
        .all(END_POINTS(userId).map((endPoint) => axios.get(endPoint)))
        .then(
          axios.spread((user, activity, average, perf) => {
            JSON.stringify(user)
            JSON.stringify(activity)
            JSON.stringify(average)
            JSON.stringify(perf)
            return { user, activity, average, perf }
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

  const { activity, user, perf, average } = apiData;

  const sessionsApi = activity?.data?.data;
  const performancesApi = perf?.data?.data;
  const userApi = user?.data?.data;
  const averageApi = average?.data?.data;
  return {
    userApi,
    sessionsApi,
    performancesApi,
    averageApi,
    isApiLoading,
    errorApi,
  };
}
