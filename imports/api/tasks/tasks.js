import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Tasks = new Mongo.Collection('Tasks');

Tasks.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Tasks.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

const TasksSchema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the user this task belongs to.',
  },
  title: {
    type: String,
    label: 'The title of the task.',
  },
  completed: {
    type: Boolean,
    label: 'Has this task been completed?',
  },
  due: {
    type: String,
    label: 'The date this task is due.',
  },
  createdAt: {
    type: String,
    label: 'When this task was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
});

Tasks.attachSchema(TasksSchema);
