const lines = [
    "Antigua & Barbuda",
"Saint John's",
"Bahamas",
"Nassau",
"Barbados",
"Bridgetown",
"Belize",
"Belmopan",
"Canada",
"Ottawa",
"Costa Rica",
"San José",
"Cuba",
"Havana",
"Dominica",
"Roseau",
"Dominican Republic",
"Santo Domingo",
"El Salvador",
"San Salvador",
"Grenada",
"Saint George's",
"Guatemala",
"Guatemala City",
"Haiti",
"Port-au-Prince",
"Honduras",
"Tegucigalpa",
"Jamaica",
"Kingston",
"Mexico",
"Mexico City",
"Nicaragua",
"Managua",
"Panama",
"Panama City",
"St. Kitts & Nevis",
"Basseterre",
"St. Lucia",
"Castries",
"St. Vincent & the Grenadines",
"Kingstown",
"Trinidad & Tobago",
"Port-of-Spain",
"United States",
"Washington D.C.",
]

let out = []

for (let i = 0; i < lines.length - 1; i += 2) {
    out.push({
        name: lines[i],
        capital: lines[i + 1]
    });
}

console.log(JSON.stringify(out));