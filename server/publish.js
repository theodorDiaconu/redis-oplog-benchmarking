import {Meteor} from 'meteor/meteor';

Meteor.publish('messages', function () {
    Meteor._sleepForMs(500);

    console.log('pub');

    let data = Messages.find();
    console.log(data.fetch());

    return data;
})

Meteor.publishWithRedis('messagesPubWithRedis', function () {
  Meteor._sleepForMs(500);

  console.log('pubWithRedis');

  let data = Messages.find();
  console.log(data.fetch());

  return data;
})
