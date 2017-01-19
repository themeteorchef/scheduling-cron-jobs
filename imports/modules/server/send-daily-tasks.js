/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { Tasks } from '../../api/tasks/tasks';
import { isoTimestamp, endOfYesterday, endOfToday } from '../dates';
import { templateToHTML } from './template-to-html';

let module;

const sendEmail = (data) => {
  try {
    Meteor.defer(() => {
      Email.send(Object.assign({}, data, {
        from: 'TaskWire <demo@themeteorchef.com>',
      }));
    });
  } catch (exception) {
    module.reject(`[sendEmail] ${exception}`);
  }
};

const sendTasksToUsers = (tasksByUser) => {
  try {
    let usersContacted = 0;
    tasksByUser.forEach(({ firstName, tasks, emailAddress }) => {

      if (tasks.length > 0) {
        sendEmail({
          to: `${firstName} <${emailAddress}>`,
          html: templateToHTML('daily-tasks-list', { firstName, tasks }),
          subject: `[TaskWire] Here\'s your agenda for today, ${firstName}.`,
        });
      }

      usersContacted += 1;
      if (usersContacted === tasksByUser.length) module.resolve(`Tasks sent for ${isoTimestamp()}!`);
    });
  } catch (exception) {
    module.reject(`[sendTasksToUsers] ${exception}`);
  }
};

const getTasks = (owner) => {
  try {
    return Tasks.find({
      owner,
      completed: false,
      due: { $gt: endOfYesterday(), $lt: endOfToday() },
    }, { fields: { title: 1, completed: 1, due: 1, owner: 1 } }).fetch();
  } catch (exception) {
    module.reject(`[getTasks] ${exception}`);
  }
};

const getTasksByUser = (users) => {
  try {
    return users.map((user) => {
      const tasks = getTasks(user._id);

      user.tasks = tasks;
      user.emailAddress = user.emails[0].address;
      user.firstName = user.profile.name.first;

      delete user.profile;
      delete user.emails;

      return user;
    });
  } catch (exception) {
    module.reject(`[getTasksByUser] ${exception}`);
  }
};

const getUsers = () => {
  try {
    return Meteor.users.find({}, { fields: { 'emails.address': 1, 'profile.name': 1 } }).fetch();
  } catch (exception) {
    module.reject(`[getUsers] ${exception}`);
  }
};

const handler = (options, promise) => {
  try {
    module = promise;
    const users = getUsers();
    const tasksByUser = getTasksByUser(users);
    sendTasksToUsers(tasksByUser);
  } catch (exception) {
    module.reject(`[sendDailyTasks.handler] ${exception}`);
  }
};

export const sendDailyTasks = (options) =>
new Promise((resolve, reject) =>
handler(options, { resolve, reject }));
