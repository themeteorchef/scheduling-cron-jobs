import { SyncedCron } from 'meteor/percolate:synced-cron';
import { sendDailyTasks } from '../../modules/server/send-daily-tasks';

SyncedCron.config({ log: true, utc: true });

SyncedCron.add({
  name: 'Send all user\'s their daily task lists',
  schedule(parser) {
    return parser.text('every 24 hours');
  },
  job() {
    sendDailyTasks()
    .then((success) => console.log(success))
    .catch((error) => console.warn(error));
  },
});

SyncedCron.start();
