import Realm from 'realm';

// Define your models and their properties
class Run {}
Run.schema = {
  name: 'Run',
  properties: {
    date:  'string',
    time: 'string',
    type: 'string',
    distance: 'int',
  }
}

class Event {}
Event.schema = {
  name: 'Event',
  properties: {
    name:  'string',
    datestart: 'string',
    dateend: 'string',
    distance: 'int',
    runs: {type: 'list', objectType: 'Run'},
  }
}


class Lapse{}
Lapse.schema = {
  name: 'Lapse',
  properties: {
    time: 'string',
    pace: 'string',
    distance: 'int',
  }
}

export default new Realm({schema: [Run, Event]})
