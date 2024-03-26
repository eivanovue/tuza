import mapLineColor from './mapLineColor';

describe('mapLineColor utility function', () => {
  it('should return correct color for existing line', () => {
    expect(mapLineColor('bakerloo')).toEqual('#996633');
    expect(mapLineColor('central')).toEqual('#cc3333');
    expect(mapLineColor('victoria')).toEqual('#0099cc');
  });

  it('should return default color for non-existing line', () => {
    expect(mapLineColor('non-existing-line')).toEqual('#607D8B');
  });
});