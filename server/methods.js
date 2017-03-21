Meteor.methods({
    'clear'() {
        Messages.remove({});
    },

    'start_benchmark'() {
        this.unblock();

        let interval = Meteor.setInterval(() => {
            Messages.insert({
                date: new Date(),
                text: 'random'
            })
        }, THROTTLE)

        Meteor.setTimeout(() => {
            Meteor.clearInterval(interval);
        }, RUN_FOR * 1000)
    }
})