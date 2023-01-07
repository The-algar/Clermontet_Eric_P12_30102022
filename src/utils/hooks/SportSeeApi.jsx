import axios from 'axios';
import { useState, useEffect } from 'react';
import { END_POINTS } from '../../service/API/_index';

/**
 * Hook used to extract data from SportSeeAPI to feed the dashboard.
 * @param {string} service
 * @param {string} userId
 * @returns {userId|Object}
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
