import { FetchAupairJobState } from '../../services'

export const FETCH_AUPAIR_JOBS = 'FETCH_AUPAIR_JOBS'

export interface FetchAupairJobsAction {
  type: typeof FETCH_AUPAIR_JOBS
  payload: FetchAupairJobState[]
  error?: boolean
}

export type AupairJobsActionTypes = FetchAupairJobsAction
