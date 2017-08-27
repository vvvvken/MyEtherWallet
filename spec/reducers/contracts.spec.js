import { contracts as reducer, initialState } from 'reducers/contracts';
import * as actions from 'actions/contracts';

describe('[REDUCER] Contracts Reducer', () => {
  test('should return initial state', () => {
    const expected = reducer(undefined, {});
    expect(expected).toEqual(initialState);
  });

  test('should handle ACCESS_CONTRACT', () => {
    const [address, abiJson] = ['Address String', 'ABI JSON String'];
    const action = actions.accessContract(address, abiJson);
    const actual = {
      ...initialState,
      selectedAddress: address,
      selectedABIJson: abiJson
    };
    const expected = reducer(initialState, action);
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
    const actual = {
      ...initialState,
      selectedABIFunctions: functions
    };
    const expected = reducer(initialState, action);
    expect(expected).toEqual(actual);
  });
});

// actions.accessContract(address: string, abiJson: string)
//
// actions.setInteractiveContract(functions: [{
//   name: string,
//   type: string,
//   constant: boolean,
//   inputs: Array<ABIFunctionField>,
//   outputs: Array<ABIFunctionField>
// }])
