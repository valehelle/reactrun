import Realm from 'realm';

// Define your models and their properties

class Event {}
Event.schema = {
  name: 'Event',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name:  'string',
    datestart: 'date',
    dateend: 'date',
    distance: 'int',
    weeklyrun: 'int',
    datecreated: 'date',
    distanceTravelled: 'int',
    bibNumber: 'string',
    bannerSrc: 'string',
    isdeleted: {type: 'bool', default: false},
    runs: {type: 'list', objectType: 'Run'},
  }
}
class User {}
User.schema = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: 'string',
    unit: {type: 'string', default: 'KILOMETER'},
    birthdate: 'string',
    location: 'string',
  }
}

class Run {}
Run.schema = {
  name: 'Run',
  primaryKey: 'id',
  properties: {
    id: 'string',
    date:  'date',
    time: 'int',
    type: 'string',
    photo: {type: 'string', default: ''},
    distance: 'int',
    isdeleted: {type: 'bool', default: false},
    gps: {type: 'list', objectType: 'Gps'},
    laps:  {type: 'list', objectType: 'Lapse'},
  }
}

class Gps{}
Gps.schema = {
  name: 'Gps',
  properties: {
    latitude: 'float',
    longitude: 'float',
  }
}


class Lapse{}
Lapse.schema = {
  name: 'Lapse',
  properties: {
    time: 'date',
    pace: 'string',
    distance: 'int',
  }
}

export default new Realm({schema: [Gps, Lapse, Run, Event, User],schemaVersion: 3})
