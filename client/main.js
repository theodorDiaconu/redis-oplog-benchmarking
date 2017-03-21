import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

Template.benchmarks.helpers({
    redisOplog() {
        return ENABLED_REDIS_OPLOG;
    }
})

