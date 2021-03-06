import {Meteor} from 'meteor/meteor';
import {RedisOplog} from 'meteor/cultofcoders:redis-oplog';

Messages.remove({});

if (ENABLED_REDIS_OPLOG) {
    RedisOplog.init({});
}

Messages.allow({
    insert: () => true,
    remove: () => true,
    update: () => true,
})

Meteor.publish('messages', function (filters = {}, options = {}) {
    return Messages.find(filters, options);
})
