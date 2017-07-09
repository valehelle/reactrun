import * as RecipeActions from './recipes'
import * as ExerciseActions from './exercise'
import * as EventActions from './event'
import * as RunActions from './run'
import * as UserActions from './user'
import * as PromoActions from './promo'

export const ActionCreators = Object.assign({},
    RecipeActions,
    ExerciseActions,
    EventActions,
    RunActions,
    UserActions,
    PromoActions,
)