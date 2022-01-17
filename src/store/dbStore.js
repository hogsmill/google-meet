
const { v4: uuidv4 } = require('uuid')

module.exports = {

  updateMeeting: function(db, io, data, debugOn, updating) {

    if (debugOn) { console.log('updateMeeting', data) }

    db.gameCollection.findOne({id: data.id}, (err, res) => {
      if (err) throw err
      if (res) {
        db.gameCollection.updateOne({id: data.id}, {$set: {attendees: data.attendees}}, (err, res) => {
          io.emit('updateMeeting', data)
        })
      } else {
        db.gameCollection.insertOne(data, (err, res) => {
          io.emit('updateMeeting', data)
        })
      }
    })
  }

}
