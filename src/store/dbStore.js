
const { v4: uuidv4 } = require('uuid')

module.exports = {

  updateMeeting: function(db, io, data, debugOn, updating) {

    if (debugOn) { console.log('updateMeeting', data) }

    if (data.meeting.id) {
      db.gameCollection.findOne({id: data.meeting.id}, (err, res) => {
        if (err) throw err
        db.gameCollection.updateOne({'_id': res._id}, {attendees: data.meeting.attendees}, (err, res) => {
          io.emit('updateMeeting', data.meeting)
      })
    } else {
      data.meeting.id = uuidv4()
      db.gameCollection.insertOne(data.meeting, (err, res) => {
        io.emit('updateMeeting', data.meeting)
      })
    }
  }

}
