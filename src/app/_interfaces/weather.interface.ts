export interface Weather {
    location: Location;
    current:  Current;
}

export interface Current {
    last_updated: string;
    temp_c:       number;
    temp_f:       number;
    is_day:       number;
    condition:    Condition;
    wind_mph:     number;
    wind_kph:     number;
    humidity:     number;
    cloud:        number;
    feelslike_c:  number;
    feelslike_f:  number;
    vis_km:       number;
    vis_miles:    number;
    uv:           number;
    air_quality:  { [key: string]: number };
}

export interface Condition {
    text: string;
    icon: string;
}

export interface Location {
    name:            string;
    region:          string;
    country:         string;
    lat:             number;
    lon:             number;
    tz_id:           string;
    localtime_epoch: number;
    localtime:       string;
}
