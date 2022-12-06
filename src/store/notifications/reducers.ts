/* eslint-disable @typescript-eslint/default-param-last */
import {
  HAS_ERRORS,
  HAS_SUCCESS,
  HAS_WARNING,
  HAS_INFO,
  HAS_NOT_MESSAGES,
  SetMessagesTypes,
  MessageStructure
} from './types'

const initialState = null

const globalNotificationReducer = (
  state: MessageStructure | null = initialState,
  action: SetMessagesTypes
): MessageStructure | null => {
  switch (action.type) {
    case HAS_ERRORS:
      return action.payload
    case HAS_SUCCESS:
      return action.payload
    case HAS_WARNING:
      return action.payload
    case HAS_INFO:
      return action.payload
    case HAS_NOT_MESSAGES:
      return action.payload
    default:
      return state
  }
}

export default globalNotificationReducer
