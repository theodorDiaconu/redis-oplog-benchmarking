import {Meteor} from 'meteor/meteor';

Meteor.publishWithRedis('messages', function (selector = {}, options = {}) {

    return Messages.find(selector, options);

});
