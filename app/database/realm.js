import Realm from 'realm';

// Define your models and their properties

class Event {}
Event.schema = {
  name: 'Event',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name:  'string',
    datestart: 'date',
    dateend: 'date',
    distance: 'int',
    weeklyrun: 'int',
    runs: {type: 'list', objectType: 'Run'},
  }
}

class Run {}
Run.schema = {
  name: 'Run',
  primaryKey: 'id',
  properties: {
    id: 'int',
    date:  'date',
    time: 'date',
    type: 'string',
    distance: 'int',
    laps:  {type: 'list', objectType: 'Lapse'},
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
