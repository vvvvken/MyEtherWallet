import { contracts as reducer, initialState } from 'reducers/contracts';
import * as actions from 'actions/contracts';

describe('[REDUCER] Contracts Reducer', () => {
  test('should return initial state', () => {
    const actual = reducer(undefined, {});
    expect(initialState).toEqual(actual);
  });

  test('should handle ACCESS_CONTRACT', () => {
    const [address, abiJson] = ['Address String', 'ABI JSON String'];
    const action = actions.accessContract(address, abiJson);
    const expected = {
      ...initialState,
      selectedAddress: address,
      selectedABIJson: abiJson
    };
    const actual = reducer(initialState, action);
    expect(expected).toEqual(actual);
  });

  test('should handle SET_INTERACTIVE_CONTRACT', () => {
    const [name, type] = ['Name String', 'Type String'];
    const functions = [
      {
        name,
        type,
        constant: true,
        inputs: [{ name, type }],
        outputs: [{ name, type }]
      }
    ];
    const action = actions.setInteractiveContract(functions);
    const expected = {
      ...initialState,
      selectedABIFunctions: functions
    };
    const actual = reducer(initialState, action);
    expect(expected).toEqual(actual);
  });
});
