//start with user not being log in
export const initialState = {
  user: null,
};

//action where we push information to data layer
export const actionTypes = {
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  console.log(action);
  //listen to the action dispacthed
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state, //keep the state
        user: action.user, //only change the user which was dispatched
      };
    default:
      return state;
  }
};

export default reducer;
