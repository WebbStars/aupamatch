export const formatTableDate = (data: string) => {
  const meses = [
    'jan',
    'fev',
    'mar',
    'abr',
    'mai',
    'jun',
    'jul',
    'ago',
    'set',
    'out',
    'nov',
    'dez',
  ]

  const dataObj = new Date(data)
  const dia = dataObj.getDate()
  const mes = meses[dataObj.getMonth()]
  const ano = dataObj.getFullYear()
  const horas = dataObj.getHours().toString().padStart(2, '0')
  const minutos = dataObj.getMinutes().toString().padStart(2, '0')

  return `${dia} ${mes} ${ano} - ${horas}:${minutos}`
}
