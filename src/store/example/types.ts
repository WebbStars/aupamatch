export type ExampleState = {
  name: string
}

export const FETCH_EXAMPLE = 'FETCH_EXAMPLE'
export const SET_EXAMPLE = 'SET_EXAMPLE'

export interface FetchExampleAction {
  type: typeof FETCH_EXAMPLE
  payload: ExampleState
}

export interface SetExampleAction {
  type: typeof SET_EXAMPLE
  payload: ExampleState
}

export type ExampleActionTypes = FetchExampleAction | SetExampleAction
