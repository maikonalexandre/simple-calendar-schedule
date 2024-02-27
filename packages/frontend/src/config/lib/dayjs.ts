import dayjs from 'dayjs'
import locale from 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
dayjs.extend(relativeTime)

dayjs.locale(locale)

export const configDayjs = () => {
  dayjs.extend(updateLocale)
  dayjs.locale('pt-br')

  dayjs.updateLocale('pt-br', {
    months: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    weekdays: [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ],
    weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    weekdaysMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    monthsShort: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Maio',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ],
  })
}
