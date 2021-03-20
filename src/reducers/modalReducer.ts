import { useReducer, ReducerAction } from 'react';

const ADD_CONTACT = 'add_contact';
const EDIT_CONTACT = 'edit_contact';
const CLOSE_MODAL = 'close_modal';

type TModalState = {
  isOpen: boolean;
  mode: string;
};
type TModalAction = {
  type: string;
};

const initialState = { isOpen: false, mode: '' };

function reducer(state: TModalState, action: TModalAction) {
  switch (action.type) {
    case ADD_CONTACT:
    case EDIT_CONTACT:
      return { isOpen: true, mode: action.type };
    case CLOSE_MODAL:
      return initialState;
    default:
      return state;
  }
}

function useModalReducer() {
  return useReducer(reducer, initialState);
}

const modalActions = {
  ADD_CONTACT,
  EDIT_CONTACT,
  CLOSE_MODAL,
};

export { useModalReducer, modalActions };
