import {
  FetchExampleAction,
  SetExampleAction,
  ExampleState,
  FETCH_EXAMPLE,
  SET_EXAMPLE
} from './types'

const setExample = (Example: ExampleState): SetExampleAction => {
  return {
    type: SET_EXAMPLE,
    payload: Example
  }
}

const fetchExample = (Example: ExampleState): FetchExampleAction => {
  return {
    type: FETCH_EXAMPLE,
    payload: Example
  }
}

export { setExample, fetchExample }
