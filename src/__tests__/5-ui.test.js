/*
This file tests the contents of `../store/ui`. 

It uses a mock store created with the `redux-mock-store` package
(https://www.npmjs.com/package/redux-mock-store).
*/
import configureMockStore from 'redux-mock-store';
import uiReducer, * as uiModule from '../store/ui';

describe('ui', () => {
  const mockStore = configureMockStore();
  const showForm = true;
  let store;

  describe('ui constants', () => {
    it('should export a `SET_SHOW_FORM` constant with a value of "ui/SET_SHOW_FORM"', () => {
      expect(uiModule.SET_SHOW_FORM).toEqual('ui/SET_SHOW_FORM');
    });
  });

  describe('ui actions', () => {
    describe('setShowForm', () => {
      it('should export a `setShowForm` function', () => {
        expect(typeof uiModule.setShowForm).toEqual('function');
      });

      it('should return an appropriate action', () => {
        store = mockStore({});
        const expectedActions = [{ type: uiModule.SET_SHOW_FORM, showForm }];
        store.dispatch(uiModule.setShowForm(true));
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('ui selector', () => {
    describe('getShowForm', () => {
      it('should export a `getShowForm` function', () => {
        expect(typeof uiModule.getShowForm).toEqual('function');
      });

      it('should return the value of showForm', () => {
        store = mockStore({ ui: { showForm: false } });
        expect(uiModule.getShowForm(store.getState())).toEqual(false);
        store = mockStore({ ui: { showForm: true } });
        expect(uiModule.getShowForm(store.getState())).toEqual(true);
      });

      it('should appropriately handle an empty store', () => {
        store = mockStore({});
        expect(() => uiModule.getShowForm(store.getState())).not.toThrow();
        expect(uiModule.getShowForm(store.getState())).toBeFalsy();
      });
    });
  });

  describe('uiReducer', () => {
    it('should be a function exported as the default', () => {
      expect(typeof uiReducer).toEqual('function');
    });

    it('should set the default state to an object with a `showForm` key and `false` value', () => {
      expect(uiReducer(undefined, {})).toEqual({ showForm: false });
    });

    it('should return the previous state if an action is not matched', () => {
      let oldState = { 1: 'oldState' };
      const newState = uiReducer(oldState, { type: 'notAType' });
      expect(newState).toBe(oldState);
    });

    describe('handling the SET_SHOW_FORM action', () => {
      let action, state, oldState;
      beforeEach(() => {
        action = {
          type: uiModule.SET_SHOW_FORM,
          showForm
        };
        oldState = { showForm: false, modal: false };
      });

      it('should set `showForm` to the payload', () => {
        state = uiReducer(undefined, action);
        expect(state).toEqual({ showForm: true });
      });

      it('should not affect other slices of the ui slice of state', () => {
        state = uiReducer(oldState, action);
        expect(state).toEqual({ modal: false, showForm: true });
      });

      it('should not modify the old state', () => {
        uiReducer(oldState, action);
        expect(oldState).toEqual({ showForm: false, modal: false });
      });
    });
  });
});