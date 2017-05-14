import * as types from './types'

export function fetchRecipes(ingredients){
    return(dispatch, getState) => {
        recipe = [
            {
                'id':1,
                'name':'hazmi'
            },
            {
                'id':2,
                'name':'dddd'
            },
            {
                'id':3,
                'name':'zzz'
            },
            {
                'id':4,
                'name':'fffff'
            },            
            ]

        return dispatch(setSearchedRecipes({ recipes: recipe }))
    }
}
export function fetchRecipesFeed(ingredients){
    return(dispatch, getState) => {
        recipe = [
            {
                'id':1,
                'name':'HELO'
            },
            {
                'id':2,
                'name':'ME'
            },
            {
                'id':3,
                'name':'zzz'
            },
            {
                'id':4,
                'name':'fffff'
            },            
            ]

        return dispatch(setSearchedRecipes({ recipes: recipe }))
    }
}

export function setSearchedRecipes( { recipes } ) {
    return{
        type: types.SET_SEARCHED_RECIPES,
        recipes
    }
}