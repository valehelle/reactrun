import * as RecipeActions from './recipes'
import * as ExerciseActions from './exercise'
import * as EventActions from './event'
import * as RunActions from './run'

export const ActionCreators = Object.assign({},
    RecipeActions,
    ExerciseActions,
    EventActions,
    RunActions,
)