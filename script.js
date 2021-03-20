const lines = [
    "Australia",
    "Canberra",
    "Fiji",
    "Suva",
    "Kiribati",
    "South Tarawa",
    "Marshall Islands",
    "Majuro",
    "Federated States of Micronesia",
    "Palikir",
    "Nauru",
    "Yaren",
    "New Zealand",
    "Wellington",
    "Palau",
    "Ngerulmud",
    "Papua New Guinea",
    "Port Moresby",
    "Samoa",
    "Apia",
    "Solomon Islands",
    "Honiara",
    "Tonga",
    "Nukuʻalofa",
    "Tuvalu",
    "Funafuti",
    "Vanuatu",
    "Port Vila",
]

let out = []

for (let i = 0; i < lines.length - 1; i += 2) {
    out.push({
        name: lines[i],
        capital: lines[i + 1]
    });
}

console.log(JSON.stringify(out));