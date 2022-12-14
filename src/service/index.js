import axios from 'axios'
import { getAllDataMocked } from './mockedAPI/index'

/**
 * Get all user's data
 * 
 * @param {Object} main_data - contain key_data, today_score, user_id and user_infos
 * @param {String} source - data source (api_data or mocked_data)
 * @param {Array<Object>} activity - data about the day, actual weight and calories burned
 * @param {Array<Object>} average_sessions - data about the day and sessions' length
 * @param {Array<Object>} performance - data about user's performances
 */

const BASE_URL = 'http://localhost:3000/user/'

export const END_POINTS = (id) => {
  return [
    `${BASE_URL}${id}`,
    `${BASE_URL}${id}/activity`,
    `${BASE_URL}${id}/average-sessions`,
    `${BASE_URL}${id}/performance`,
  ]
}

export async function getData(userId, useApi) {
  if (!useApi) {
    const data = await getAllDataMocked()
    const mockUser = data.userMainData.find((d) => d.userId === userId)
    const user = { ...mockUser, score: mockUser.todayScore };
    const activity = data.userActivities.find((d) => d.userId === userId)
    const average = data.userAverageSession.find((d) => d.userId === userId)
    const perf = data.userPerformances.find((d) => d.userId === userId)

    return { user, activity, average, perf }
  }

  return axios
    .all(END_POINTS(userId).map((endPoint) => axios.get(endPoint)))
    .then(
      axios.spread((user, activity, average, perf) => {
        return { 
          user: {
            ...user.data.data,
            score: user.data.data.score || user.data.data.todayScore
          },
          activity: activity.data.data, 
          average: average.data.data,
          perf: perf.data.data, }
      })
    )
}
