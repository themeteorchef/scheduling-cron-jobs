import { Meteor } from 'meteor/meteor';

process.env.MAIL_URL = Meteor.settings.private.MAIL_URL;
