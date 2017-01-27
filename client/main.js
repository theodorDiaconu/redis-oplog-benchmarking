import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
    this.autorun(() => {
        this.subscribe('messagesPubWithRedis');
    });
});

Template.hello.helpers({
    messages() {
        return Messages.find();
    },
});

Template.hello.events({
    'click button'(event, instance) {
      event.preventDefault();

      Messages.insert({title: instance.$('#title').val(), body:instance.$('#body').val()});
    },
    'click .js-destroy'(event, instance) {
        console.log(this);
        Messages.remove(this._id);
    },
});
