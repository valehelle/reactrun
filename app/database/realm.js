import Realm from 'realm';

// Define your models and their properties
class Run {}
Run.schema = {
  name: 'Run',
  properties: {
    date:  'date',
    time: 'date',
    type: 'string',
    distance: 'int',
    laps:  {type: 'list', objectType: 'Lapse'},
  }
}

class Event {}
Event.schema = {
  name: 'Event',
  properties: {
    name:  'string',
    datestart: 'date',
    dateend: 'date',
    distance: 'int',
    runs: {type: 'list', objectType: 'Run'},
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

export default new Realm({schema: [Lapse, Run, Event]})
