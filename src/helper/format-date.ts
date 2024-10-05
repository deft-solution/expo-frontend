import moment from 'moment';

export function formatDisplayDate(date: string, format = 'DD-MM-YYYY') {
  return moment(date).format(format);
}