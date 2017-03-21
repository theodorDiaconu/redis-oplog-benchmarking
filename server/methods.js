Meteor.methods({
    'clear'(filters = {}) {
        Messages.remove(filters);
    },

    'start_benchmark'(data = {}) {
        this.unblock();

        let interval = Meteor.setInterval(() => {
            Messages.insert({
                date: new Date(),
                text: 'random',
                ...data
            })
        }, THROTTLE)

        Meteor.setTimeout(() => {
            Meteor.clearInterval(interval);
        }, RUN_FOR * 1000)
    },

    'start_benchmark_direct'(_id) {
        this.unblock();

        let interval = Meteor.setInterval(() => {
            Messages.update(_id, {
                text: Random.id(),
                date: new Date()
            })
        }, THROTTLE)

        Meteor.setTimeout(() => {
            Meteor.clearInterval(interval);
        }, RUN_FOR * 1000)
    }
})