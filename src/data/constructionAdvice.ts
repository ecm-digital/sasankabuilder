export interface StageAdvice {
    id: number;
    title: string;
    description: string;
    tips: string[];
    warnings: string[];
}

export const CONSTRUCTION_ADVICE: StageAdvice[] = [
    // I. Stan Zero
    {
        id: 1,
        title: 'Geodeta - Tyczenie',
        description: 'Pierwszy krok na budowie. Geodeta wyznacza osie budynku i punkt "zero" (poziom podłogi).',
        tips: [
            'Sprawdź, czy "zero" budynku nie jest za nisko względem drogi (ryzyko zalewania).',
            'Zadbaj o to, aby paliki były solidnie wbite i zabezpieczone przed przypadkowym przesunięciem.',
            'Poproś o wpis do Dziennika Budowy.'
        ],
        warnings: [
            'Błąd na tym etapie przesunie cały dom względem działki.',
            'Upewnij się, że masz już prąd budowlany lub agregat.'
        ]
    },
    {
        id: 2,
        title: 'Wykop pod fundamenty',
        description: 'Usunięcie warstwy humusu (ziemi urodzajnej) i wykonanie wykopów pod ławy fundamentowe.',
        tips: [
            'Humus odkładaj w osobne miejsce – przyda się do ogrodu.',
            'Wykopy wykonuj "na ostre" (czyli dokładnie pod wymiar), żeby nie zużyć za dużo betonu.',
            'Jeśli grunt jest słaby, może być potrzebna wymiana gruntu.'
        ],
        warnings: [
            'Jeśli wykopiesz za głęboko, nie zasypuj ziemią! Musisz uzupełnić chudym betonem.'
        ]
    },
    {
        id: 3,
        title: 'Chudy beton',
        description: 'Wylanie warstwy betonu podkładowego (B10/B15) na dno wykopu. Wyrównuje podłoże.',
        tips: [
            '10 cm grubości wystarczy.',
            'Chudziak zapobiega mieszaniu się betonu konstrukcyjnego z gruntem.',
            'Można zastąpić folią budowlaną w niektórych technologiach, ale beton jest pewniejszy.'
        ],
        warnings: [
            'Nie wylewaj chudziaka w błoto ani wodę stojącą.'
        ]
    },
    {
        id: 4,
        title: 'Zbrojenie ław',
        description: 'Przygotowanie belek zbrojeniowych (koszy) zgodnie z projektem konstrukcyjnym.',
        tips: [
            'Stal musi być czysta (bez błota i smarów).',
            'Zadbaj o otulinę – stal nie może dotykać szalunku ani gruntu (użyj podkładek dystansowych).',
            'Strzemiona wiąż dokładnie co do centymetra.'
        ],
        warnings: [
            'Brak ciągłości zbrojenia w narożnikach to najczęstszy błąd (tzw. "eski" wzmacniające są konieczne!).'
        ]
    },
    {
        id: 5,
        title: 'Zalewanie ław',
        description: 'Betonowanie właściwych fundamentów. Kluczowy moment dla stabilności domu.',
        tips: [
            'Zamów beton z pompy, nie mieszaj ręcznie w betoniarce (gwarancja klasy).',
            'Wibruj beton buławą, żeby usunąć pęcherze powietrza.',
            'Pielęgnuj beton (polewaj wodą) przez kilka dni, zwłaszcza w upały.'
        ],
        warnings: [
            'Nie dolewaj wody do "gruszki" na budowie – to osłabia beton!'
        ]
    },
    {
        id: 6,
        title: 'Ściany fundamentowe',
        description: 'Domurowanie fundamentów do poziomu "zera". Zazwyczaj z bloczków betonowych.',
        tips: [
            'Murowanie na pełną spoinę (poziomą i pionową) zwiększa szczelność.',
            'Zastosuj izolację poziomą (papę) między ławą a ścianą fundamentową.',
            'Pamiętaj o przepustach na rury (woda, kanalizacja, prąd) – żeby nie kuć później.'
        ],
        warnings: [
            'Krzywe fundamenty to krzywe ściany domu. Pilnuj poziomu i przekątnych.'
        ]
    },
    {
        id: 7,
        title: 'Izolacja wilgotnościowa',
        description: 'Zabezpieczenie fundamentów przed wodą gruntową i wilgocią.',
        tips: [
            'Najpopularniejsze: Dysperbit (2-3 warstwy) lub masa KMB (droższa, ale lepsza).',
            'Gruntuj podłoże przed nałożeniem izolacji.',
            'Pamiętaj o fasadzie chudziaka i styku z ławą.'
        ],
        warnings: [
            'Nie stosuj lepików na zimno zawierających rozpuszczalniki do styropianu (rozpuszczą go!).'
        ]
    },
    {
        id: 8,
        title: 'Ocieplenie fundamentów',
        description: 'Termoizolacja ścian fundamentowych, zazwyczaj styropian wodoodporny (Aqua) lub styrodur (XPS).',
        tips: [
            'Kleimy na "placki" lub grzebień, ale szczelnie.',
            'Zaciągnij siatką i klejem, żeby ziemia nie uszkodziła styropianu.',
            'XPS jest twardszy i mniej nasiąkliwy niż EPS.'
        ],
        warnings: [
            'Brak ocieplenia fundamentów to potężny mostek termiczny (zimna podłoga).'
        ]
    },
    {
        id: 9,
        title: 'Folia kubełkowa',
        description: 'Ochrona mechaniczna ocieplenia. Kubełki skierowane w stronę ściany.',
        tips: [
            'Mocuj listwą wykończeniową na górze, żeby ziemia nie wpadała za folię.',
            'Folia nie jest hydroizolacją! Chroni tylko styropian przed uszkodzeniem.'
        ],
        warnings: [
            'Kubełki w złą stronę (do ziemi) nie zadziałają poprawnie.'
        ]
    },
    {
        id: 10,
        title: 'Kanalizacja (poziomy)',
        description: 'Rozprowadzenie rur kanalizacyjnych pod posadzką parteru.',
        tips: [
            'Zachowaj spadki (min. 2% czyli 2cm na metr).',
            'Używaj rur pomarańczowych (zewnętrznych, twardszych).',
            'Zrób próbę szczelności (wlej wodę) przed zasypaniem.'
        ],
        warnings: [
            'Zbyt duży spadek też jest błędem (woda spłynie, nieczystości zostaną).'
        ]
    },
    {
        id: 11,
        title: 'Zasypanie fundamentów',
        description: 'Wypełnienie wnętrza fundamentów piaskiem. Wymaga porządnego zagęszczenia.',
        tips: [
            'Zagęszczaj warstwami co 20-30 cm zagęszczarką mechaniczną.',
            'Użyj piasku zasypowego, nie ziemi roślinnej (która osiądzie).',
            'Polewaj piasek wodą – lepiej się zagęszcza.'
        ],
        warnings: [
            'Słabe zagęszczenie = pękająca posadzka i osiadające ścianki działowe.'
        ]
    },
    {
        id: 12,
        title: 'Ślepa wylewka (chudziak)',
        description: 'Betonowa płyta podłogowa (ok. 10-15 cm) zbrojona siatką.',
        tips: [
            'Wyprowadź rury kanalizacyjne, wodne i przepusty ponad beton.',
            'Zbrojenie siatką przeciwskurczową zapobiega pękaniu.',
            'To jest "Stan Zero" – gratulacje!'
        ],
        warnings: [
            'Zadbaj o idealny poziom – ułatwi to układanie styropianu podłogowego w przyszłości.'
        ]
    },

    // II. Stan Surowy Otwarty
    {
        id: 13,
        title: 'Ściany nośne parteru',
        description: 'Wznoszenie murów konstrukcyjnych (zewnętrznych i wewnętrznych nośnych).',
        tips: [
            'Zacznij od narożników.',
            'Pilnuj pionu i poziomu na każdej warstwie.',
            'Pozostaw otwory okienne i drzwiowe zgodnie z wymiarami (plus luzy montażowe).'
        ],
        warnings: [
            'Nie zapomnij o izolacji poziomej pod pierwszą warstwą bloczków.'
        ]
    },
    {
        id: 14,
        title: 'Szalowanie stropu',
        description: 'Budowa tymczasowej konstrukcji wsporczej pod strop żelbetowy.',
        tips: [
            'Użyj systemowych szalunków (doki) lub desek i stempli.',
            'Stemple muszą stać na twardym podłożu (nie na piasku!).',
            'Nadaj szalunkowi "odwrotną strzałkę" (lekkie wygięcie w górę na środku), bo beton go dociąży.'
        ],
        warnings: [
            'Nieszczelne szalunki spowodują wyciek "mleczka betonowego" i osłabienie stropu.'
        ]
    },
    {
        id: 15,
        title: 'Zbrojenie stropu',
        description: 'Układanie prętów zbrojeniowych na szalunku. Najbardziej skomplikowany etap zbrojeniowy.',
        tips: [
            'Odbiór zbrojenia przez Kierownika Budowy jest KONIECZNY przed zalaniem.',
            'Pamiętaj o "wieńcach" na ścianach.',
            'Wzmocnij (dozbrój) otwory na kominy i schody.'
        ],
        warnings: [
            'Nie chodź po zbrojeniu "na sztywno", używaj pomostów roboczych.'
        ]
    },
    {
        id: 16,
        title: 'Zalewanie stropu',
        description: 'Betonowanie stropu, schodów i wieńców.',
        tips: [
            'Betonowanie musi być ciągłe – bez przerw.',
            'Konieczne wibrowanie betonu.',
            'Pielęgnacja (lekkie polewanie wodą) przez min. 7 dni.'
        ],
        warnings: [
            'Nie zdejmuj szalunków za wcześnie! (min. 28 dni dla pełnej wytrzymałości, choć po 14 można częściowo rozszalować).'
        ]
    },
    {
        id: 17,
        title: 'Ściany piętra / kolankowe',
        description: 'Murowanie ścian poddasza.',
        tips: [
            'Wysokość ścianki kolankowej decyduje o funkcjonalności poddasza.',
            'Ścianka kolankowa musi mieć solidny wieniec żelbetowy pod murłatę.'
        ],
        warnings: [
            'Zbyt wysoka ścianka kolankowa może zaburzyć proporcje domu (tzw. "dom-klocek").'
        ]
    },
    {
        id: 18,
        title: 'Więźba dachowa',
        description: 'Montaż drewnianego szkieletu dachu.',
        tips: [
            'Drewno powinno być impregnowane (zazwyczaj na zielono/czerwono).',
            'Połączenia ciesielskie muszą być solidne (gwoździe, śruby, złącza).',
            'Murłata musi być odizolowana papą od wieńca betonowego.'
        ],
        warnings: [
            'Mokre drewno będzie pękać i się skręcać schnąc.'
        ]
    },
    {
        id: 19,
        title: 'Membrana i łaty',
        description: 'Foliowanie dachu membraną paroprzepuszczalną oraz nabijanie kontrłat i łat.',
        tips: [
            'Membrana musi być naciągnięta, ale nie jak struna (musi pracować).',
            'Kontrłata zapewnia wentylację pod pokryciem dachu (kluczowe!).',
            'Rozstaw łat zależy od rodzaju dachówki.'
        ],
        warnings: [
            'Uszkodzona membrana = przeciekający dach. Zaklejaj każdą dziurkę taśmą systemową.'
        ]
    },
    {
        id: 20,
        title: 'Pokrycie dachu',
        description: 'Układanie dachówki lub blachodachówki. Montaż rynien i obróbek.',
        tips: [
            'Zadbaj o szczelność obróbek przy kominach (częsty punkt przecieków).',
            'Zamontuj płotki przeciwśniegowe i ławy kominiarskie.',
            'Rynny muszą mieć spadek w stronę rur spustowych.'
        ],
        warnings: [
            'Nie tnij blachy szlifierką kątową (przegrzewa blachę, rdzewieje). Używaj nożyc.'
        ]
    },

    // III. Stan Surowy Zamknięty
    {
        id: 21,
        title: 'Okna',
        description: 'Montaż stolarki okiennej.',
        tips: [
            'Rozważ "ciepły montaż" (taśmy paroszczelne wewnątrz, paroprzepuszczalne na zewnątrz).',
            'Okna muszą być zakotwione mechanicznie, sama pianka to za mało.',
            'Wypoziomowanie jest krytyczne dla lekkiego działania skrzydeł.'
        ],
        warnings: [
            'Nie zdejmuj folii ochronnych od razu, ale nie trzymaj ich dłużej niż 3 miesiące (słońce "wtopi" je w ramy).'
        ]
    },
    {
        id: 22,
        title: 'Drzwi zewnętrzne',
        description: 'Montaż drzwi wejściowych (frontowych i technicznych).',
        tips: [
            'Zabezpiecz próg przed uszkodzeniem na czas dalszych prac.',
            'Jeśli tynki i wylewki jeszcze przed Tobą, warto zamontować drzwi tymczasowe.'
        ],
        warnings: [
            'Oryginalne drzwi łatwo zniszczyć podczas prac mokrych (tynki, wylewki).'
        ]
    },
    {
        id: 23,
        title: 'Ścianki działowe',
        description: 'Wymurowanie podziału pomieszczeń.',
        tips: [
            'Zostaw szczelinę (dylatację) pod stropem, wypełnij ją pianką (strop pracuje i mógłby dać pęknięcie na ścianę).',
            'Przemyśl układ – teraz łatwo przesunąć drzwi czy ściankę.'
        ],
        warnings: [
            'Ścianki działowe nie mogą podpierać stropu!'
        ]
    },

    // IV. Instalacje i Tynki
    {
        id: 24,
        title: 'Instalacje elektryczne',
        description: 'Rozprowadzenie przewodów, montaż puszek gniazdkowych.',
        tips: [
            'Zrób zdjęcia wszystkich ścian z kablami (tzw. dokumentacja powykonawcza) przed tynkowaniem!',
            'Zaplanuj więcej gniazdek niż myślisz, że potrzebujesz.',
            'Nie zapomnij o internecie (skrętka) i TV.'
        ],
        warnings: [
            'Kable prowadź tylko pionowo i poziomo, nigdy na skos.'
        ]
    },
    {
        id: 25,
        title: 'Instalacje sanitarne (Wod-Kan)',
        description: 'Podejścia wody i odpływy kanalizacyjne w ścianach i podłodze.',
        tips: [
            'Sprawdź wysokości podejść pod baterie (prysznic, umywalka).',
            'Próba ciśnieniowa wody – obowiązkowa przed zakryciem rur.'
        ],
        warnings: [
            'Rury z zimną wodą zaizoluj, żeby się nie pociły pod tynkiem.'
        ]
    },
    {
        id: 26,
        title: 'Tynki wewnętrzne',
        description: 'Wyrównanie i wygładzenie ścian.',
        tips: [
            'Tynki gipsowe – gładsze, cieplejsze, szybciej schną.',
            'Tynki cementowo-wapienne – twardsze, odporniejsze na wilgoć (łazienki, garaż).',
            'Zabezpiecz okna bardzo dokładnie!'
        ],
        warnings: [
            'Wietrz intensywnie dom po tynkowaniu, żeby pozbyć się tysięcy litrów wody.'
        ]
    },
    {
        id: 27,
        title: 'Ogrzewanie podłogowe',
        description: 'Układanie styropianu, folii i rur ogrzewania (PEX).',
        tips: [
            'Dylatacja obwodowa (taśma przy ścianach) – musi być!',
            'Zrób próbę ciśnieniową pętli ogrzewania przed zalaniem wylewki.'
        ],
        warnings: [
            'Nie dziuraw folii pod styropianem.'
        ]
    },
    {
        id: 28,
        title: 'Wylewki (Jastrych)',
        description: 'Wykonanie podkładów podłogowych, które przykryją instalacje.',
        tips: [
            'Dodaj plastyfikator do betonu (lepsza praca z podłogówką).',
            'Zrób nacięcia dylatacyjne w progach drzwi.',
            'Poziom wylewki musi uwzględniać grubość planowanych płytek/paneli.'
        ],
        warnings: [
            'Nie wchodź na świeżą wylewkę przez 2-3 dni.'
        ]
    },

    // V. Wykończenie
    {
        id: 29,
        title: 'Ocieplenie elewacji',
        description: 'Styropian na zewnątrz budynku. "Kożuch" dla domu.',
        tips: [
            'Unikaj kołkowania, jeśli można kleić na pianę/dobry klej (mniej mostków termicznych).',
            'Styropian grafitowy jest cieplejszy, ale nie można go kłaść w pełnym słońcu (wytapia się).'
        ],
        warnings: [
            'Szczeliny między płytami wypełniaj pianką, nie klejem!'
        ]
    },
    {
        id: 30,
        title: 'Tynk zewnętrzny',
        description: 'Warstwa ozdobna i ochronna elewacji. Silikonowy, akrylowy, silikatowy.',
        tips: [
            'Tynk silikonowy jest samoczyszczący i odporny na glony.',
            'Wybieraj jasne kolory (mniej się nagrzewają i nie płowieją).'
        ],
        warnings: [
            'Nie tynkuj w deszczu ani w pełnym słońcu.'
        ]
    },
    {
        id: 31,
        title: 'Ocieplenie poddasza',
        description: 'Wełna mineralna lub piana PUR między krokwie.',
        tips: [
            'Minimum 25-30 cm ocieplenia dla dobrego standardu.',
            'Szczelna folia paroizolacyjna od środka to podstawa braku grzyba w wełnie.'
        ],
        warnings: [
            'Mostki termiczne przy murłacie i kominie to częsty błąd.'
        ]
    },
    {
        id: 32,
        title: 'Zabudowa GK (Sucha zabudowa)',
        description: 'Sufity podwieszane, obudowa skosów, ścianki działowe lekkie.',
        tips: [
            'Stosuj płyty zielone (wodoodporne) w łazienkach.',
            'Szpachlowanie połączeń z taśmą flizelinową/papierową zapobiega pękaniu.'
        ],
        warnings: [
            'Nie przykręcaj płyt "na styk" do ścian – zostaw mały luz.'
        ]
    }
];
