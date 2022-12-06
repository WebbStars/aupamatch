import { FetchAupairJobsAction, FETCH_AUPAIR_JOBS } from './types'
import { fetchAupairJobsService } from '../../services'

const fetchAupairJobs = async (
  id: string,
  role: string,
  accessToken: string
): Promise<FetchAupairJobsAction> => {
  const { response } = await fetchAupairJobsService(id, role, accessToken)

  if (response) {
    return {
      type: FETCH_AUPAIR_JOBS,
      payload: response
    }
  } else {
    return {
      type: FETCH_AUPAIR_JOBS,
      payload: [],
      error: true
    }
  }
}

export { fetchAupairJobs }
