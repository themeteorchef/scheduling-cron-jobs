import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { daysInFuture } from '../../modules/dates';
import { Tasks } from '../../api/tasks/tasks.js';

if (!Meteor.isProduction) {
  const users = [{
    email: 'admin@admin.com',
    password: 'password',
    profile: {
      name: { first: 'Carl', last: 'Winslow' },
    },
    roles: ['admin'],
  }];

  users.forEach(({ email, password, profile, roles }) => {
    const userExists = Meteor.users.findOne({ 'emails.address': email });

    if (!userExists) {
      const userId = Accounts.createUser({ email, password, profile });
      Roles.addUsersToRoles(userId, roles);
    }
  });

  const testUser = Meteor.users.findOne({ 'emails.address': 'admin@admin.com' });
  const owner = testUser ? testUser._id : 'test';

  const tasks = [{
    owner,
    title: 'Consider different shoelaces, unwaxed.',
    completed: false,
    due: daysInFuture(1),
    createdAt: (new Date()).toISOString(),
  }, {
    owner,
    title: 'Listen to "Almost Holy" soundtrack',
    completed: false,
    due: daysInFuture(2),
    createdAt: (new Date()).toISOString(),
  }, {
    owner,
    title: 'Read NYT article about Trump\'s cabinet',
    completed: false,
    due: daysInFuture(3),
    createdAt: (new Date()).toISOString(),
  }, {
    owner,
    title: 'Finish reading Seneca\'s Letters from a Stoic',
    completed: false,
    due: daysInFuture(4),
    createdAt: (new Date()).toISOString(),
  }];

  if (Tasks.find().count() === 0) tasks.forEach((task) => Tasks.insert(task));
}
