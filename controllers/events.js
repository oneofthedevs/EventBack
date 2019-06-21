const events = require("../models/event")
const user = require("../models/user");
//fetching event data API
const getAll = (req, res) => {

    events.find().then((result) => {
        res.send(result)
    }).catch((err) => {
        res.send(err)
    })
}
//Adding Event API
const add_event = (req, res) => {
    const params = req.body

    const new_Event = new events({
        title: params.title,
        description: params.description,
        date: params.date,
        time: params.time,
        address: params.address,
        city: params.city,
        genre: params.genre,
        website: params.website

    })

    new_Event.save()
        .then((result) => {
            console.log("hello bitch", result);
            user.findById(req._id).then(u => {
                u.addedEvents.push(result._id);
                u.save();
            })
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
}

const delete_event = (req, res) => {
    user.findOne({ _id: req.userid }).populate('addedEvents').exec((err, user) => {
        if (user.addedEvents[req.eventid]) {
            console.log(user.addedEvents[req.eventid]);
            user.addedEvents[req.eventid].pop();
            res.send("1");
        }
        else { 
            res.send("0");
        }


    })
}

module.exports = {
    getAll,
    add_event,
    delete_event
}
