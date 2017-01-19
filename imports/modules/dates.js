import moment from 'moment';

export const daysInFuture = (days) => moment.utc().add(days, 'days').format();

export const daysInPast = (days) => moment.utc().subtract(days, 'days').format();

export const endOfYesterday = () => moment().utc().subtract(1, 'days').endOf('day').format();

export const endOfToday = () => moment().utc().endOf('day').format();
