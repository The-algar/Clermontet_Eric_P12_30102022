import axios from 'axios';
import { useState, useEffect } from 'react';

const BASE_URL = 'http://localhost:3000/user/';

export const END_POINTS = (id) => {
  return [
    `${BASE_URL}${id}`,
    `${BASE_URL}${id}/activity`,
    `${BASE_URL}${id}/average-sessions`,
    `${BASE_URL}${id}/performance`,
  ];
};

/**
 * Function used to extract data from the SportSee API to feed the dashboard.
 * 
 * @name Api
 * @param {string} service
 * @param {string} userId
 * @return  {Promise<Object>}  data promise
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
          axios.spread((user, activity, average, perf) => {
            return { 
            user: user.data.data, 
            activity: activity.data.data, 
            average: average.data.data,
            perf: perf.data.data, }
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
  const activityApi = activity?.data?.data;
  const performancesApi = perf?.data?.data;
  const userApi = user?.data?.data;
  const averageApi = average?.data?.data;
  return {
    userApi,
    activityApi,
    performancesApi,
    averageApi,
    isApiLoading,
    errorApi,
  };
}
