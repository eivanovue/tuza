import stationMapper from './stationMapper';
import { StationResponse, StationType } from '../types';

describe('stationMapper', () => {
  it('should correctly map a station response with no modifications', () => {
    const stationResponse: StationResponse = {
      commonName: 'Oxford Circus',
      naptanId: '940GZZLUOXC',
    };
    const lineId = 'central';

    const expectedStation: StationType = {
      id: '940GZZLUOXC',
      name: 'Oxford Circus',
      lineId: 'central',
    };

    expect(stationMapper(stationResponse, lineId)).toEqual(expectedStation);
  });

  it('should correctly map a station response with parentheses and hyphens', () => {
    const stationResponse: StationResponse = {
      commonName: 'Bayswater(Circle Line) -Underground',
      naptanId: '940GZZLUBWT',
    };
    const lineId = 'circle';

    const expectedStation: StationType = {
      id: '940GZZLUBWT',
      name: 'Bayswater',
      lineId: 'circle',
    };

    expect(stationMapper(stationResponse, lineId)).toEqual(expectedStation);
  });

  it('should correctly map a station response with multiple occurrences of replacement strings', () => {
    const stationResponse: StationResponse = {
      commonName: 'Paddington',
      naptanId: '940GZZLUPAC',
    };
    const lineId = 'circle';

    const expectedStation: StationType = {
      id: '940GZZLUPAC',
      name: 'Paddington',
      lineId: 'circle',
    };

    expect(stationMapper(stationResponse, lineId)).toEqual(expectedStation);
  });
});
