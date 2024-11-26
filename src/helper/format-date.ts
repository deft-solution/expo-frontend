import moment from 'moment';

export function formatDisplayDate(date: string | null, format = 'DD-MM-YYYY') {
  return moment(date).format(format);
}
