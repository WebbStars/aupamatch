import { isCnpjValid } from '../utils'

const REGEX_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const REGEX_NUMBER = /[0-9]/g
const REGEX_UPPERCASE = /[a-z]/g
const REGEX_LOWERCASE = /[A-Z]/g
const REGEX_NOT_COMMA = /^([^,]*)$/
const REGEX_SPECIALCHAR = /[!@#$%^&*,.?|_+-]/g
const REGEX_CPF =
  '([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})'
const EIN_REGEX = /^[1-9]\d?-\d{7}$/

const useValidate = () => {
  const validateLength = (password: string) => password.length >= 8
  const validateNumber = (password: string) => password.match(REGEX_NUMBER)
  const validateCaseLetters = (password: string) =>
    password.match(REGEX_UPPERCASE) && password.match(REGEX_LOWERCASE)
  const validateSpecialChar = (password: string) =>
    password.match(REGEX_SPECIALCHAR)

  const isValidEmail = (email: string) => email.match(REGEX_EMAIL)

  const isValidCPF = (cpf: string) => {
    if (typeof cpf !== 'string') return false
    const newCpf = cpf.replace(/[^\d]+/g, '')
    if (newCpf.length !== 11 || !!newCpf.match(/(\d)\1{10}/)) return false
    const cpfArray = cpf.split('').map((el) => +el)
    const rest = (count: number) =>
      ((cpfArray
        .slice(0, count - 12)
        .reduce((soma, el, index) => soma + el * (count - index), 0) *
        10) %
        11) %
      10
    return rest(10) === cpfArray[9] && rest(11) === cpfArray[10]
  }

  const isValidCnpj = (cnpj: string | number) => isCnpjValid(cnpj)

  const isValidEin = (ein: string) => ein.match(EIN_REGEX)

  const haveComma = (word: string) => !REGEX_NOT_COMMA.test(word)

  return {
    email: {
      isValid: isValidEmail,
      hasError: (email: string) => (email ? !isValidEmail(email) : false),
    },
    cpf: {
      isValid: isValidCPF,
      hasError: (cpf: string) => (cpf ? !isValidCPF(cpf) : false),
      regex: REGEX_CPF,
    },
    cnpj: {
      isValid: isValidCnpj,
    },
    ein: {
      isValid: isValidEin,
    },
    password: {
      validateLength,
      validateNumber,
      validateCaseLetters,
      validateSpecialChar,
    },
    string: {
      haveComma,
    },
  }
}

export default useValidate
