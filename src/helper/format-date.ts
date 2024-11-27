import moment from 'moment';

export function formatDisplayDate(date: any, format = 'DD-MM-YYYY'): string {
  if (
    !date ||
    typeof date !== 'string' ||
    ['n/a', 'null', 'undefined'].includes(date.toLowerCase()) ||
    !moment(date, moment.ISO_8601, true).isValid()
  ) {
    return 'N/A';
  }
  return moment(date).format(format);
}
