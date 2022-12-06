import {
  HAS_ERRORS,
  HAS_SUCCESS,
  HAS_WARNING,
  HAS_INFO,
  HAS_NOT_MESSAGES,
  SetErrorMessageAction,
  SetSuccessMessageAction,
  SetWarningMessageAction,
  SetInfoMessageAction,
  ClearMessagesAction
} from './types'

const setErrorMessage = (message: string | string[]): SetErrorMessageAction => {
  return {
    type: HAS_ERRORS,
    payload: {
      message,
      status: 'error'
    }
  }
}

const setSuccessMessage = (
  message: string | string[]
): SetSuccessMessageAction => {
  return {
    type: HAS_SUCCESS,
    payload: {
      message,
      status: 'success'
    }
  }
}

const setWarningMessage = (
  message: string | string[]
): SetWarningMessageAction => {
  return {
    type: HAS_WARNING,
    payload: {
      message,
      status: 'warning'
    }
  }
}

const setInfoMessage = (message: string | string[]): SetInfoMessageAction => {
  return {
    type: HAS_INFO,
    payload: {
      message,
      status: 'info'
    }
  }
}

const clearMessages = (): ClearMessagesAction => {
  return {
    type: HAS_NOT_MESSAGES,
    payload: {
      message: null
    }
  }
}

export {
  setErrorMessage,
  setSuccessMessage,
  setWarningMessage,
  setInfoMessage,
  clearMessages
}
