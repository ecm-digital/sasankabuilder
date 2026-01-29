export interface EstimateTemplateItem {
    category: string;
    name: string;
    quantity: number;
    unit: string;
    price: number;
}

export const ESTIMATE_TEMPLATE: EstimateTemplateItem[] = [
    // I. Stan Zero
    { category: 'I. Stan Zero', name: 'Usługa geodezyjna (tyczenie)', quantity: 1, unit: 'usł', price: 1500 },
    { category: 'I. Stan Zero', name: 'Prace ziemne (koparka)', quantity: 1, unit: 'kpl', price: 2500 },
    { category: 'I. Stan Zero', name: 'Beton B10 (chudziak)', quantity: 6, unit: 'm3', price: 350 },
    { category: 'I. Stan Zero', name: 'Stal zbrojeniowa (ławy)', quantity: 1200, unit: 'kg', price: 4.5 },
    { category: 'I. Stan Zero', name: 'Beton B25 (ławy fundamentowe + pompa)', quantity: 18, unit: 'm3', price: 400 },
    { category: 'I. Stan Zero', name: 'Bloczki betonowe', quantity: 900, unit: 'szt', price: 5 },
    { category: 'I. Stan Zero', name: 'Zaprawa cementowa', quantity: 20, unit: 'wor', price: 25 },
    { category: 'I. Stan Zero', name: 'Izolacja przeciwwilgociowa (Dysperbit)', quantity: 4, unit: 'wiader', price: 120 },
    { category: 'I. Stan Zero', name: 'Styropian fundamentowy (Aqua)', quantity: 8, unit: 'm3', price: 450 },
    { category: 'I. Stan Zero', name: 'Piasek zasypowy z zagęszczeniem', quantity: 60, unit: 't', price: 60 },
    { category: 'I. Stan Zero', name: 'Robocizna - Stan Zero', quantity: 1, unit: 'kpl', price: 25000 },

    // II. Stan Surowy Otwarty
    { category: 'II. Ściany i Stropy', name: 'Pustak ceramiczny/beton komórkowy (ściany nośne)', quantity: 1600, unit: 'szt', price: 12 },
    { category: 'II. Ściany i Stropy', name: 'Stal zbrojeniowa (strop, wieńce)', quantity: 1500, unit: 'kg', price: 4.5 },
    { category: 'II. Ściany i Stropy', name: 'Beton B25 (strop, schody, wieńce)', quantity: 22, unit: 'm3', price: 400 },
    { category: 'II. Ściany i Stropy', name: 'Pustak (ścianki działowe)', quantity: 600, unit: 'szt', price: 8 },
    { category: 'II. Ściany i Stropy', name: 'Kominy systemowe', quantity: 2, unit: 'kpl', price: 3500 },
    { category: 'II. Ściany i Stropy', name: 'Robocizna - Murowanie i Stropy', quantity: 1, unit: 'kpl', price: 35000 },

    // III. Dach
    { category: 'III. Dach', name: 'Więźba dachowa (tarcica impregnowana)', quantity: 8, unit: 'm3', price: 1800 },
    { category: 'III. Dach', name: 'Membrana dachowa', quantity: 150, unit: 'm2', price: 8 },
    { category: 'III. Dach', name: 'Dachówka ceramiczna/cementowa', quantity: 150, unit: 'm2', price: 60 },
    { category: 'III. Dach', name: 'Akcesoria dachowe (gąsiory, taśmy)', quantity: 1, unit: 'kpl', price: 4000 },
    { category: 'III. Dach', name: 'Orynnowanie (stal/PCV)', quantity: 40, unit: 'mb', price: 80 },
    { category: 'III. Dach', name: 'Robocizna - Dach (cieśla + dekarz)', quantity: 1, unit: 'kpl', price: 28000 },

    // IV. Stolarka (Stan Surowy Zamknięty)
    { category: 'IV. Stolarka', name: 'Okna (pakiet 3-szybowy)', quantity: 1, unit: 'kpl', price: 25000 },
    { category: 'IV. Stolarka', name: 'Drzwi zewnętrzne', quantity: 1, unit: 'szt', price: 3500 },
    { category: 'IV. Stolarka', name: 'Brama garażowa (jeśli dotyczy)', quantity: 1, unit: 'szt', price: 5000 },
    { category: 'IV. Stolarka', name: 'Montaż stolarki', quantity: 1, unit: 'kpl', price: 4000 },

    // V. Instalacje
    { category: 'V. Instalacje', name: 'Instalacja elektryczna (materiał)', quantity: 1, unit: 'kpl', price: 6000 },
    { category: 'V. Instalacje', name: 'Instalacja Wod-Kan (materiał)', quantity: 1, unit: 'kpl', price: 4000 },
    { category: 'V. Instalacje', name: 'Ogrzewanie podłogowe (rury, styropian, rozdzielacze)', quantity: 1, unit: 'kpl', price: 12000 },
    { category: 'V. Instalacje', name: 'Pompa ciepła / Kocioł gazowy + montaż', quantity: 1, unit: 'kpl', price: 35000 },
    { category: 'V. Instalacje', name: 'Robocizna - Elektryk i Hydraulik', quantity: 1, unit: 'kpl', price: 15000 },

    // VI. Wykończenie (Deweloperskie)
    { category: 'VI. Wykończenie', name: 'Tynki wewnętrzne (gipsowe)', quantity: 450, unit: 'm2', price: 45 },
    { category: 'VI. Wykończenie', name: 'Wylewki (posadzki)', quantity: 130, unit: 'm2', price: 35 },
    { category: 'VI. Wykończenie', name: 'Ocieplenie poddasza (wełna + stelaż + GK)', quantity: 100, unit: 'm2', price: 150 },
    { category: 'VI. Wykończenie', name: 'Elewacja (styropian 20cm + tynk)', quantity: 180, unit: 'm2', price: 220 },
];
