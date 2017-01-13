import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
    this.autorun(() => {
        this.subscribe('messages');
    });
});

Template.hello.helpers({
    messages() {
        return Messages.find();
    },
});

Template.hello.events({
    'click button'(event, instance) {
        Messages.insert({name: `My Message : ${new Date()}`});
    },
    'click .js-destroy'(event, instance) {
        Messages.remove(this._id);
    },
});
