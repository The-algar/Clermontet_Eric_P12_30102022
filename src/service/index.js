import axios from 'axios'
import { getAllDataMocked } from './mockedAPI/index'

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
    const user = data.userMainData.find((d) => d.userId === userId)
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
          user: user.data.data, 
          activity: activity.data.data, 
          average: average.data.data,
          perf: perf.data.data, }
      })
    )
}
