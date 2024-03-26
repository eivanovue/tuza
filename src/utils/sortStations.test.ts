import sortStations from './sortStations';
import { StationType } from '../types';

describe('sortStations', () => {
  it('should correctly sort stations alphabetically by name', () => {
    const stations: StationType[] = [
      { id: '1', name: 'Paddington', lineId: 'bakerloo' },
      { id: '2', name: 'Oxford Circus', lineId: 'central' },
      { id: '3', name: 'Bayswater', lineId: 'circle' },
    ];
  
    const sortedStations: StationType[] = [
      { id: '3', name: 'Bayswater', lineId: 'circle' },
      { id: '2', name: 'Oxford Circus', lineId: 'central' },
      { id: '1', name: 'Paddington', lineId: 'bakerloo' },
    ];

    const result = sortStations(stations);

    expect(result).toEqual(sortedStations);
  });

  it('should correctly handle an empty array', () => {
    const stations: StationType[] = [];
    expect(sortStations(stations)).toEqual([]);
  });
});
