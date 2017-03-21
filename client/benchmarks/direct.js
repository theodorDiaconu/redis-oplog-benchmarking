import './direct.html';


Template.benchmarkDirect.onCreated(function () {
    this._id = Messages.insert({text: 'something', date: new Date()})

    let difference = this.difference = new ReactiveVar(0);
    this.history = new ReactiveVar([]);

    this.subscribe('messages', {_id: this._id});
    this.cursor = Messages.find({ _id: this._id });

    this.cursor.observeChanges({
        changed(docId, doc) {
            let now = new Date();
            let date = doc.date;

            let _diff = difference.get();
            difference.set(_diff + now.getTime() - date.getTime());
        }
    })
});

Template.benchmarkDirect.helpers({
    timelapse() {
        return Template.instance().difference.get();
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

Template.benchmarkDirect.events({
    'click .js-start-benchmark'(event, tpl) {
        const diff = tpl.difference.get();

        if (diff > 0) {
            const history = Template.instance().history;
            let _history = history.get();
            _history.push(diff);
            history.set(_history);
        }

        tpl.difference.set(0);
        Meteor.call('start_benchmark_direct', tpl._id);
    },
});