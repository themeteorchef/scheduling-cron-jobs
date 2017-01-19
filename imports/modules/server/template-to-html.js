import fs from 'fs';
import { Meteor } from 'meteor/meteor';
import { SSR } from 'meteor/meteorhacks:ssr';

export const templateToHTML = (name, data) => {
  try {
    SSR.compileTemplate(
      name,
      // Use native Node read here as Assets.getText doesn't work consistently. The path here is
      // relative to .meteor/local/build/programs/server.
      fs.readFileSync(`assets/app/email-templates/${name}.html`, 'utf8')
    );
    return SSR.render(name, data);
  } catch (exception) {
    throw new Meteor.Error('500', exception);
  }
};
