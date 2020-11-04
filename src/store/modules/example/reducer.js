import * as types from '../types';

const initialState = {
  buttonClick: false,
}

export default function (state = initialState, action) {
  switch(action.type) {
    case types.BUTTON_CLICK_SUCCESS:
      const newState = { ...state };
      newState.buttonClick = !newState.buttonClick;
      return newState;

    case types.BUTTON_CLICK_FAILURE:
      console.log('Error');
      return state;

    case types.BUTTON_CLICK_REQUEST:
      console.log('Request');
      return state;

    default:
      return state;
  }
};
