import { types } from '../../types/types';

const allTypes = {
	uiOpenModal: '[UI] Open modal',
	uiCloseModal: '[UI] Close modal',

	eventLogOut: '[Event] LogOut',
	eventAddNew: '[Event] Add new',
	eventSetActive: '[Event] Set active',
	eventClearActiveEvent:
		'[Event] Clear active event',
	eventUpdated: '[Event] Event updated',
	eventDeleted: '[Event] Event deleted',

	eventStarNew: '[Event] Star add new event',
	eventLoaded: '[Event] Event loaded',

	authCheckingFinish:
		'[Auth] Finish checking state',
	authStartLogin: '[Auth] Start login',
	authLogin: '[Auth] Login',
	authStartRegister: '[Auth] Start register',
	authStartTokenRenew: '[Auth] Start token renew',
	authLogout: '[Auth] Logout',
};

describe('Testing on types.js', () => {
	test('los types deben ser iguales', () => {
		expect(types).toEqual(allTypes);
	});
});
