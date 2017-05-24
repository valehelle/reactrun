import * as RecipeActions from './recipes'
import * as ExerciseActions from './exercise'
import * as EventActions from './event'

export const ActionCreators = Object.assign({},
    RecipeActions,
    ExerciseActions,
    EventActions,
)