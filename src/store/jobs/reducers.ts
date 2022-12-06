import { AupairJobsActionTypes, FETCH_AUPAIR_JOBS } from './types'
import { FetchAupairJobState } from '../../services'

const jobsReducer = (
  state: FetchAupairJobState[] = [],
  action: AupairJobsActionTypes
): FetchAupairJobState[] => {
  switch (action.type) {
    case FETCH_AUPAIR_JOBS:
      return action.payload
    default:
      return state
  }
}

export default jobsReducer
