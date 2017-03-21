import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function () {
    let difference = this.difference = new ReactiveVar(0);
    this.history = new ReactiveVar([]);

    Meteor.call('clear', () => {
        this.subscribe('messages');
        this.cursor = Messages.find();

        this.cursor.observeChanges({
            added(docId, doc) {
                let now = new Date();
                let date = doc.date;

                let _diff = difference.get();
                difference.set(_diff + now.getTime() - date.getTime());
            }
        })
    })
});

Template.hello.helpers({
    timelapse() {
        return Template.instance().difference.get();
    },
    redisOplog() {
        return ENABLED_REDIS_OPLOG;
    },
    history() {
        return Template.instance().history.get();
    },
    avg() {
        const history = Template.instance().history.get();
        if (history.length == 0) {
            return false;
        }
        var sum = 0;
        history.forEach(item => sum += item);

        return (sum/history.length).toFixed(2);
    }
});

Template.hello.events({
    'click button'(event, instance) {
        event.preventDefault();
    },
    'click .js-start-benchmark'(event, tpl) {
        const diff = tpl.difference.get();

        if (diff > 0) {
            const history = Template.instance().history;
            let _history = history.get();
            _history.push(diff);
            history.set(_history);
        }

        tpl.difference.set(0);
        Meteor.call('clear', () => {
            setTimeout(() => {
                Meteor.call('start_benchmark');
            }, 1000);
        })
    },
});
