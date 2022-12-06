import {
  ExampleState,
  ExampleActionTypes,
  SET_EXAMPLE,
  FETCH_EXAMPLE
} from './types'

const initialState = null

const exampleReducer = (
  state: ExampleState | null = initialState,
  action: ExampleActionTypes
): ExampleState | null => {
  switch (action.type) {
    case SET_EXAMPLE:
      return action.payload
    case FETCH_EXAMPLE:
      return action.payload
    default:
      return state
  }
}

export default exampleReducer
