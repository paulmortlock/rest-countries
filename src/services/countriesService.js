import http from "./httpService";
import config from "./config.json";
import error from "./errorService";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
const { apiEndpoint } = config;

function createQueryString(fields) {
    return fields.reduce((query, field) => query + field + ";", "?fields=");
}

export function getCountries(fields) {
    const apiAllEndpoint = `${apiEndpoint}/all`;

    if (!fields) return http.get(apiAllEndpoint);

    const queryString = createQueryString(fields);
    return http.get(apiAllEndpoint + queryString);
}

export function getCountry(name, fields) {
    const apiNameEndpoint = `${apiEndpoint}/name/${name}`;

    if (!fields) return http.get(apiNameEndpoint);

    const queryString = createQueryString(fields);
    return http.get(apiNameEndpoint + queryString);
}

export async function loadCountries(fields, setCallback) {
    try {
        const { data } = await getCountries(fields);
        setCallback(data);
    } catch (ex) {
        error.handle(ex);
    }
}

export async function loadCountry(name, fields, setCallback) {
    try {
        const { data } = await getCountry(name, fields);
        setCallback(data[0]);
    } catch (ex) {
        error.handle(ex);
    }
}

export function getRegions() {
    return regions;
}
