/*
Export both the following action constant and its corresponding action:
  1. `SET_SHOW_FORM` (corresponding action should have a `showForm` payload)
*/
export const SET_SHOW_FORM = "ui/SET_SHOW_FORM";
export const setShowForm = (showForm) => {
  return {
    type: SET_SHOW_FORM,
    showForm
  }
}
/*
Export a `getShowForm` selector that returns the value of `showForm`.
*/
export const getShowForm = (stateObj) => {
  return stateObj.ui?.showForm;
};

/*
Export a `uiReducer` function as the default export. It should take in the old
state--setting the default state to an object with a key of 'showForm' and a
value of 'false'--and appropriately handle the sole ui action.
*/
export default function uiReducer (state = {showForm: false}, action) {
  switch (action.type) {
    case SET_SHOW_FORM:
      const newState = {...state}
      newState.showForm = action.showForm
      return newState;
    default:
    return state
  }

};