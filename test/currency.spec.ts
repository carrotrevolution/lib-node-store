import {CurrencyHelper} from '../src/currency';

describe('CurrencyHelper', () => {
  it('should return correct format', () => {
    const result = CurrencyHelper.toSymbolString('EUR', 100);
    expect(result).toBe('€100');
  });
});
