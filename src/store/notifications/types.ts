export interface MessageStructure {
  message?: string | string[] | null
  status?: 'info' | 'success' | 'warning' | 'error'
}

export const HAS_ERRORS = 'HAS_ERRORS'
export const HAS_SUCCESS = 'HAS_SUCCESS'
export const HAS_NOT_MESSAGES = 'HAS_NOT_MESSAGES'
export const HAS_WARNING = 'HAS_WARNING'
export const HAS_INFO = 'HAS_INFO'

export interface SetErrorMessageAction {
  type: typeof HAS_ERRORS
  payload: MessageStructure
}

export interface SetSuccessMessageAction {
  type: typeof HAS_SUCCESS
  payload: MessageStructure
}

export interface SetWarningMessageAction {
  type: typeof HAS_WARNING
  payload: MessageStructure
}

export interface SetInfoMessageAction {
  type: typeof HAS_INFO
  payload: MessageStructure
}

export interface ClearMessagesAction {
  type: typeof HAS_NOT_MESSAGES
  payload: MessageStructure | null
}

export type SetMessagesTypes =
  | SetErrorMessageAction
  | SetSuccessMessageAction
  | SetWarningMessageAction
  | SetInfoMessageAction
  | ClearMessagesAction
