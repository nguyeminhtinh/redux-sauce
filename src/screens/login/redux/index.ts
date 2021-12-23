import { createActions, createReducer } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';

interface initialState {
	count: number,
	type?: string,
	userInfo?: object
}

interface ITodos {
  (state: ImmutableObject<initialState>, action: { type: string; data: initialState }): ImmutableObject<initialState>;
}

export const { Types, Creators } = createActions({
	login: ['data'],
	depoistAction: ['data']
});

export const INITIAL_STATE: ImmutableObject<initialState> = Immutable({
	count: 0,
  type: '',
	userInfo: {}
});

const login: ITodos = (state = INITIAL_STATE, action) => {
	return state.merge({userInfo: action.data})
}

const depoistAction: ITodos = (state, action) => {
	return state.merge({count: state.count + action.data.count})
}

const HANDLERS = {
	[Types.LOGIN]: login,
	[Types.DEPOIST_ACTION]: depoistAction,
}

export const loginReducer = createReducer(INITIAL_STATE, HANDLERS);