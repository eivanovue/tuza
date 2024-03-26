// COMPONENTS

export type NavigationItemType = {
  title: string;
  path: string;
  display: boolean;
}

export type NavigationType = {
  title: string;
  path: string;
  display: boolean;
  Component: React.FC
}

export type NavigationListType = NavigationType[];

export type LineType = {
  id: string;
  name: string;
  status: string;
  statusText: string;
  statusSeverity: number;
  fromDate?: string;
  toDate?: string;
}

export type LineListType = LineType[];

export type StationType = {
  id: string;
  name: string;
  lineId: string;
}

export type StationListType = StationType[];

export type StationObjectType = {
  stations: StationListType;
};

export type ArrivalType = {
  stationName: string;
  platformName: string;
  direction: string;
  currentLocation: string;
  towards: string;
  expectedArrival: string;
}

export type ArrivalListType = ArrivalType[];

export type ArrivalsGroupedType = {
  [key: string]: ArrivalListType;
}

// CONSTANTS

export type LineColorsType = {
  id: string;
  color: string;
}

export type LineColorsListType = LineColorsType[];

export type OperationalLineStatusesType = string[];

// HOOKS

export type UseFetchType<T> = {
  data: T;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

// PROVIDERS

export type LineContextType = object;

export type LineProviderType = {
  lines: LineListType;
  operationalOnlyLines: LineListType;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
  getLineById: (id: string | undefined) => LineType | undefined;
}

// API RESPONSES

export type LineStatusResponseType = {
  statusSeverity: number;
  statusSeverityDescription: string;
  reason: string;
  validityPeriods: {
    fromDate: string;
    toDate: string;
  }[];
}

export type LineResponse = {
  id: string;
  name: string;
  lineStatuses: LineStatusResponseType[];
}

export type StationResponse = {
  naptanId: string;
  commonName: string;
}
