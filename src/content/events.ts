/**
 * Production / event / community catalog.
 * All copy lifted from the client's "GAUDEAMUS - Teatro" doc and the main charity doc.
 * When information is genuinely unknown, we mark it "TBD" — never invent.
 */

export type EventKind = "production" | "community" | "workshop";
export type EventStatus = "past" | "current" | "upcoming";

/**
 * producer differentiates who actually made the work, per Eva's framing in
 * the meeting: "the charity is a container — some shows are our own, others
 * are external artists we sponsor and circulate."
 *
 * - `compagnia`  → original Compagnia Gaudeamus production
 *                  (Eva D'Amico as writer / director / company ensemble)
 * - `hosted`     → external artist / company hosted by Gaudeamus
 * - `tbd`        → producer not yet confirmed by Eva
 */
export type EventProducer = "compagnia" | "hosted" | "tbd";

export type EventEntry = {
  slug: string;
  kind: EventKind;
  producer?: EventProducer;
  year: number;
  date?: string;
  status: EventStatus;
  title: { en: string; it: string };
  tagline: { en: string; it: string };
  summary: { en: string; it: string };
  description: { en: string[]; it: string[] };
  venues?: string[];
  role?: { en: string; it: string };
  cover: string;
  poster?: string;
  gallery: string[];
  credits?: {
    en: { role: string; name: string }[];
    it: { role: string; name: string }[];
  };
};

export function producerLabel(p: EventProducer | undefined, loc: "en" | "it") {
  if (p === "compagnia") return loc === "it" ? "Produzione Compagnia" : "Compagnia production";
  if (p === "hosted") return loc === "it" ? "Ospitato da Gaudeamus" : "Hosted by Gaudeamus";
  return loc === "it" ? "Da confermare" : "To be confirmed";
}

export const events: EventEntry[] = [
  // ── UPCOMING PRODUCTIONS ──────────────────────────────────────────────
  {
    slug: "high-heels-from-the-big-boot",
    kind: "production",
    producer: "compagnia",
    year: 2026,
    date: "2026-08-13",
    status: "upcoming",
    title: {
      en: "High Heels from the Big Boot",
      it: "High Heels from the Big Boot",
    },
    tagline: {
      en: "A playful tribute to Italian women.",
      it: "Un divertente tributo alle donne italiane.",
    },
    summary: {
      en: "Two grandchildren find a mysterious laptop and an AI that begins to reveal, with irony and precision, their grandmother's secrets. From there, a chorus of extraordinary Italian women steps forward to tell their own stories.",
      it: "Due nipoti scoprono un misterioso laptop e un'Intelligenza Artificiale che inizia a svelare, con ironia e precisione, i segreti della loro nonna. Da lì, un coro di donne italiane straordinarie si fa avanti per raccontarsi in prima persona.",
    },
    description: {
      en: [
        "A bright, irreverent show that pays homage to Italian women throughout history: from icons to forgotten figures, each restored in their own voice, between strength, fragility, irony and truth.",
        "Between comic moments and intense passages, the piece weaves lightness and depth into a continuous dialogue between generations and identities. A choral story about memory, freedom, self-determination and the right to be oneself.",
      ],
      it: [
        "Uno spettacolo brillante e irriverente che rende omaggio alle donne italiane attraverso la storia: da figure iconiche a personalità dimenticate, ognuna restituita nella sua autenticità, tra forza, fragilità, ironia e verità.",
        "Tra momenti comici e passaggi intensi, lo spettacolo alterna leggerezza e profondità, creando un dialogo continuo tra generazioni e identità. È un racconto corale che parla di memoria, libertà, autodeterminazione e del diritto di essere se stesse.",
      ],
    },
    venues: [
      "Edinburgh Fringe Festival, Venue 67. 13, 14 & 15 August 2026",
      "Aberdeen & Glasgow. Autumn 2026",
    ],
    role: { en: "Original production", it: "Produzione originale" },
    cover: "",
    gallery: [],
    credits: {
      en: [
        { role: "Written by", name: "Eva D'Amico" },
        { role: "Direction", name: "Eva D'Amico" },
        { role: "Assistant Director", name: "Giancarlo Abobua" },
        { role: "Cast", name: "Federica Casolari, Eva D'Amico, Domenico Serino" },
        { role: "Running time", name: "One act, c. 60 min" },
        { role: "Audience", name: "All ages" },
      ],
      it: [
        { role: "Testo", name: "Eva D'Amico" },
        { role: "Regia", name: "Eva D'Amico" },
        { role: "Assistente di regia", name: "Giancarlo Abobua" },
        { role: "Cast", name: "Federica Casolari, Eva D'Amico, Domenico Serino" },
        { role: "Durata", name: "Atto unico, circa 60 min" },
        { role: "Pubblico", name: "Tutti" },
      ],
    },
  },
  {
    slug: "good-honest-lies",
    kind: "production",
    producer: "compagnia",
    year: 2027,
    status: "upcoming",
    title: { en: "Good Honest Lies", it: "Good Honest Lies" },
    tagline: {
      en: "After Eduardo De Filippo's Le bugie con le gambe lunghe.",
      it: "Ispirato a Le bugie con le gambe lunghe di Eduardo De Filippo.",
    },
    summary: {
      en: "A bitter, surprisingly current comedy that lays bare social hypocrisy and the power of convention. At its centre, Libero Incoronato: a simple man adrift in a world of appearances, where everyone lies to save their own reputation.",
      it: "Una commedia amara e sorprendentemente attuale, capace di mettere a nudo l'ipocrisia sociale e il potere delle convenzioni. Al centro, Libero Incoronato, uomo semplice immerso in un mondo fatto di apparenze, dove tutti mentono per salvare la propria reputazione.",
    },
    description: {
      en: [
        "Inspired by Eduardo De Filippo's Le bugie con le gambe lunghe, the production stages a collective game of pretence in which even the truth is bent until it becomes irrelevant.",
        "While the staging keeps the immediate post-war setting, an added epilogue and a more dynamic, contemporary delivery underline how current the theme remains. Eduardo's lucid, ironic theatrical mechanism still mirrors a society willing to accept any lie to maintain a fragile equilibrium.",
        "A comedy that makes you smile, and also invites you to recognise how, then as now, “everyone false, everyone happy.”",
      ],
      it: [
        "Ispirato a Le bugie con le gambe lunghe di Eduardo De Filippo, lo spettacolo porta in scena una commedia amara e sorprendentemente attuale, capace di mettere a nudo l'ipocrisia sociale e il potere delle convenzioni.",
        "La regia, pur mantenendo l'ambientazione nell'immediato dopoguerra, evidenzia con decisione l'attualità del tema attraverso l'inserimento di un epilogo e una recitazione più dinamica e contemporanea, capace di avvicinare il linguaggio scenico alla sensibilità di oggi.",
        "Eduardo costruisce così un meccanismo teatrale lucido e ironico, che ancora oggi rispecchia una società pronta ad accettare qualsiasi menzogna pur di mantenere un fragile equilibrio. Una commedia che fa sorridere, ma che invita anche a riconoscere quanto, ieri come oggi, «tutti falsi, tutti contenti».",
      ],
    },
    venues: ["Aberdeen, Edinburgh & Glasgow. Winter 2027"],
    role: { en: "Production", it: "Produzione" },
    cover: "",
    gallery: [],
    credits: {
      en: [
        { role: "Direction", name: "Eva D'Amico" },
        { role: "Assistant Director", name: "Giancarlo Abobua" },
        { role: "Stage Assistant", name: "Antonio Ibba" },
        { role: "Make-up", name: "Federica Casolari" },
        { role: "Prompt", name: "Elena Pampana" },
        {
          role: "Cast",
          name: "Erika Boetto, Barbara Canu, Federica Casolari, Eva D'Amico, Silvia Fittante, Sacha Fop, Nicolò Ibba, Mauro Manassi, Silvia Scoppio, Domenico Serino, Elena Tortoioli",
        },
        { role: "Running time", name: "Three acts, 30 min each" },
        { role: "Audience", name: "12+" },
      ],
      it: [
        { role: "Regia", name: "Eva D'Amico" },
        { role: "Assistente di regia", name: "Giancarlo Abobua" },
        { role: "Assistente di palcoscenico", name: "Antonio Ibba" },
        { role: "Make-up artist", name: "Federica Casolari" },
        { role: "Suggeritore", name: "Elena Pampana" },
        {
          role: "Cast",
          name: "Erika Boetto, Barbara Canu, Federica Casolari, Eva D'Amico, Silvia Fittante, Sacha Fop, Nicolò Ibba, Mauro Manassi, Silvia Scoppio, Domenico Serino, Elena Tortoioli",
        },
        { role: "Durata", name: "Tre atti da 30 minuti" },
        { role: "Pubblico", name: "Da 12 anni in su" },
      ],
    },
  },

  // ── PAST PRODUCTIONS ──────────────────────────────────────────────────
  {
    slug: "no-shakespeare-fringe",
    kind: "production",
    producer: "compagnia",
    year: 2024,
    status: "past",
    title: {
      en: "No Shakespeare. Fringe Edition",
      it: "No Shakespeare. Fringe Edition",
    },
    tagline: {
      en: "A homage to Italian dramaturgy and literature.",
      it: "Un omaggio alla drammaturgia ed alla letteratura italiana.",
    },
    summary: {
      en: "Inspired by a true story, a metatheatrical journey into Italian culture: desperate actors fighting to put on a show at the Fringe. Discover the beauty of Italian literature, and the terror of looming deadlines.",
      it: "Ispirato a una storia vera, un viaggio metateatrale nella cultura italiana: attori disperati che lottano per mettere in scena uno spettacolo al Fringe. Scoprite la bellezza della letteratura italiana e il terrore delle scadenze imminenti!",
    },
    description: {
      en: [
        "A reworking of the original No Shakespeare, this Fringe edition is more than a play. It is a fascinating journey through Italian theatre and literature, from the Renaissance to the present day. A unique evening for all ages, dedicated to anyone who loves Italy or has always wanted to know it better.",
      ],
      it: [
        "Riadattamento della precedente omonima produzione, Niente Shakespeare è molto più di uno spettacolo: è un viaggio affascinante attraverso la cultura teatrale e letteraria italiana, dal Rinascimento ai giorni nostri. Una serata unica, pensata per tutte le età, dedicata a chi ama l'Italia e a chi ha sempre desiderato conoscerla meglio.",
      ],
    },
    role: { en: "Production", it: "Produzione" },
    cover: "/events/no-shakespeare/no-shakespeare-04.jpg",
    poster: "/events/no-shakespeare/locandina-fringe.jpg",
    gallery: [
      "/events/no-shakespeare/no-shakespeare-01.jpg",
      "/events/no-shakespeare/no-shakespeare-02.jpg",
      "/events/no-shakespeare/no-shakespeare-03.jpg",
      "/events/no-shakespeare/no-shakespeare-04.jpg",
      "/events/no-shakespeare/no-shakespeare-05.jpg",
      "/events/no-shakespeare/no-shakespeare-06.jpg",
      "/events/no-shakespeare/no-shakespeare-07.jpg",
    ],
    credits: {
      en: [
        { role: "Written by", name: "Eva D'Amico" },
        { role: "Direction", name: "Eva D'Amico" },
        { role: "Assistant Director", name: "Giancarlo Abobua" },
        { role: "Cast", name: "Erika Boetto, Eva D'Amico, Domenico Serino" },
        { role: "Running time", name: "One act, c. 60 min" },
        { role: "Audience", name: "All ages" },
      ],
      it: [
        { role: "Testo", name: "Eva D'Amico" },
        { role: "Regia", name: "Eva D'Amico" },
        { role: "Assistente di regia", name: "Giancarlo Abobua" },
        { role: "Cast", name: "Erika Boetto, Eva D'Amico, Domenico Serino" },
        { role: "Durata", name: "Atto unico, circa 60 min" },
        { role: "Pubblico", name: "Tutti" },
      ],
    },
  },
  {
    slug: "poor-piero",
    kind: "production",
    producer: "compagnia",
    year: 2024,
    status: "past",
    title: { en: "Poor Piero", it: "Poor Piero" },
    tagline: {
      en: "A masterpiece of irreverent humour, after Achille Campanile.",
      it: "Un capolavoro di umorismo dissacrante, da Achille Campanile.",
    },
    summary: {
      en: "Piero is dead. But his funeral quickly becomes a whirlwind of misunderstandings, schemes and twists: a theatre of the absurd in which the deceased is shoved around, hidden in cupboards, and buried under epitaphs while relatives and friends keep up a parade of tears, outbursts and hypocrisy.",
      it: "Piero è morto. Ma il suo funerale si trasforma presto in un turbine di equivoci, sotterfugi e colpi di scena, mentre il defunto viene sballottato, nascosto negli armadi, ricoperto da epitaffi e necrologi e parenti e amici alimentano un teatro dell'assurdo fatto di pianti, escandescenze e ipocrisie.",
    },
    description: {
      en: [
        "Dripping with irreverent humour, Poor Piero is a divertissement in two acts and a prologue by Achille Campanile: a paradoxical, hilarious comedy in which death itself becomes the occasion for liberating laughter.",
        "When Piero, perhaps from the shock of dying, unexpectedly resurrects, the chaos becomes total. Campanile's unmistakable style (double meanings, rapid-fire exchanges and situations on the edge of absurdity) dismantles the taboos around death and funeral rituals, exposing the hypocrisy of bourgeois “good manners.”",
        "Our staging pushes the comedy and the irreverence further, sharpening the contrast between the rigidity of social conventions and the absurdity of the situations. Characters are deliberately caricatural, stripped of common sense and authentic feeling, fully enslaved to the codes that cage them. Between clumsy obituaries, ceremonial tears and cutting one-liners, the production lingers on the parody of respectability and the hypocrisies that surround death.",
      ],
      it: [
        "Grondante di humour dissacratore, Il povero Piero è un divertissement in due atti e prologo scritto da Achille Campanile. Una commedia tanto paradossale quanto esilarante in cui la morte stessa diventa occasione di risata liberatoria.",
        "Quando il povero Piero, forse per lo choc della morte, resuscita inaspettatamente, il caos diventa totale. Lo stile inconfondibile di Campanile (fatto di doppi sensi, scambi serrati di battute e situazioni al limite dell'assurdo) smonta i tabù legati alla morte e ai rituali funebri, svelando l'ipocrisia delle «buone maniere» borghesi.",
        "L'interpretazione registica estremizza il carattere comico e la forza dissacrante, accentuando il contrasto tra la rigidità delle convenzioni sociali e l'assurdità delle situazioni. I personaggi sono volutamente caricaturali, privati di buon senso e sentimenti autentici, completamente asserviti a un codice di comportamento che finisce per ingabbiarli. Tra necrologi maldestri, lacrime di circostanza e battute taglienti, la regia pone l'accento sulla parodia del perbenismo e sulle ipocrisie che avvolgono il tema della morte.",
      ],
    },
    venues: [
      "Aberdeen, Lemon Tree Theatre (February 2025)",
      "Perth Theatre (March 2025)",
      "Edinburgh, Assembly Roxy Theatre (November 2025)",
    ],
    role: { en: "Production", it: "Produzione" },
    cover: "/events/poor-piero/poor-piero-04.jpeg",
    poster: "/events/poor-piero/locandina.jpg",
    gallery: [
      "/events/poor-piero/poor-piero-01.jpg",
      "/events/poor-piero/poor-piero-02.jpg",
      "/events/poor-piero/poor-piero-03.jpeg",
      "/events/poor-piero/poor-piero-04.jpeg",
      "/events/poor-piero/poor-piero-05.jpeg",
      "/events/poor-piero/poor-piero-06.jpeg",
      "/events/poor-piero/poor-piero-07.jpeg",
      "/events/poor-piero/poor-piero-08.jpeg",
      "/events/poor-piero/poor-piero-09.jpeg",
    ],
    credits: {
      en: [
        { role: "Direction", name: "Eva D'Amico" },
        { role: "Assistant Director", name: "Lorenzo Lojacono" },
        { role: "Stage Assistant", name: "Giancarlo Abobua" },
        { role: "Make-up", name: "Federica Casolari" },
        { role: "Prompt", name: "Anna Maria Grieco" },
        {
          role: "Cast",
          name: "Erika Boetto, Andrea Caci, Federica Casolari, Eva D'Amico, Silvia Fittante, Sacha Fop, Giorgia Giacomella, Margarita Gonzalez, Claudio Lombardi, Mauro Manassi, Silvia Scoppio, Domenico Serino, Elena Tortoioli",
        },
        { role: "Running time", name: "Two acts, 45 min each" },
        { role: "Audience", name: "12+" },
      ],
      it: [
        { role: "Regia", name: "Eva D'Amico" },
        { role: "Assistente alla regia", name: "Lorenzo Lojacono" },
        { role: "Assistente di palcoscenico", name: "Giancarlo Abobua" },
        { role: "Make-up artist", name: "Federica Casolari" },
        { role: "Suggeritore", name: "Anna Maria Grieco" },
        {
          role: "Cast",
          name: "Erika Boetto, Andrea Caci, Federica Casolari, Eva D'Amico, Silvia Fittante, Sacha Fop, Giorgia Giacomella, Margarita Gonzalez, Claudio Lombardi, Mauro Manassi, Silvia Scoppio, Domenico Serino, Elena Tortoioli",
        },
        { role: "Durata", name: "Due atti da 45 min" },
        { role: "Pubblico", name: "Da 12 anni in su" },
      ],
    },
  },
  {
    slug: "no-shakespeare",
    kind: "production",
    producer: "compagnia",
    year: 2023,
    date: "2023-11-25",
    status: "past",
    title: { en: "No Shakespeare", it: "No Shakespeare" },
    tagline: {
      en: "A homage to Italian dramaturgy and literature.",
      it: "Un omaggio alla drammaturgia ed alla letteratura italiana.",
    },
    summary: {
      en: "More than a play. A journey through Italian theatre and literature, from the Renaissance to today. A unique evening for all ages, for anyone who loves Italy or has always wanted to know it better.",
      it: "Più di uno spettacolo: un viaggio attraverso la cultura teatrale e letteraria italiana, dal Rinascimento a oggi. Una serata unica, per tutte le età, per chi ama l'Italia e per chi ha sempre desiderato conoscerla meglio.",
    },
    description: {
      en: [
        "Under the most classic frame of an immersive metatheatre, a group of actors leads the audience through a theatrical experience where text and staging meet in a balance of emotion and comedy.",
        "The story follows twelve first-time actors wrestling with the difficult choice of which script to put on in just a few months. Between rehearsals, misunderstandings and pure stage moments, the audience is treated to a remixed tour of some of Italy's greatest theatrical classics, alongside the everyday dynamics of a theatre company.",
        "For one evening, set Shakespeare aside and make room for a rich mosaic of Italian authors who have shaped theatre and literature. A unique experience that joins a passion for theatre, the value of cultural memory and the pleasure of discovery.",
      ],
      it: [
        "Sotto la più classica cornice di un coinvolgente metateatro, un gruppo di attori conduce il pubblico in un'esperienza teatrale immersiva, dove testo e messa in scena si fondono in un equilibrio di emozioni e situazioni divertenti.",
        "La storia segue le vicende di 12 attori alle prime armi, impegnati nella difficile scelta del copione giusto da portare in scena in pochi mesi. Tra prove, equivoci e momenti di puro spettacolo, il pubblico assiste alla rivisitazione di alcuni dei più grandi classici del teatro italiano, alternati alle dinamiche quotidiane di una compagnia teatrale.",
        "Per una sera, mettiamo da parte Shakespeare e lasciamo spazio a un ricco mosaico di autori italiani che hanno segnato la storia del teatro e della letteratura. Un'esperienza unica, che unisce la passione per il teatro, il valore della memoria culturale e il piacere della scoperta.",
      ],
    },
    role: { en: "Production", it: "Produzione" },
    cover: "/events/no-shakespeare/no-shakespeare-08.jpg",
    poster: "/events/no-shakespeare/locandina.jpg",
    gallery: [
      "/events/no-shakespeare/no-shakespeare-08.jpg",
      "/events/no-shakespeare/no-shakespeare-09.jpg",
      "/events/no-shakespeare/no-shakespeare-10.jpg",
      "/events/no-shakespeare/no-shakespeare-11.jpg",
    ],
    credits: {
      en: [
        { role: "Written by", name: "Eva D'Amico" },
        { role: "Direction", name: "Eva D'Amico" },
        { role: "Running time", name: "One act, c. 60 min" },
        { role: "Audience", name: "All ages" },
      ],
      it: [
        { role: "Testo", name: "Eva D'Amico" },
        { role: "Regia", name: "Eva D'Amico" },
        { role: "Durata", name: "Atto unico, circa 60 min" },
        { role: "Pubblico", name: "Tutti" },
      ],
    },
  },
  {
    slug: "viaggio-lingua",
    kind: "production",
    producer: "compagnia",
    year: 2024,
    status: "past",
    title: {
      en: "Viaggio al centro della lingua italiana",
      it: "Viaggio al centro della lingua italiana",
    },
    tagline: {
      en: "A journey to the centre of the Italian language.",
      it: "Un viaggio al centro della lingua italiana.",
    },
    summary: {
      en: "A Compagnia Gaudeamus theatrical performance for the Girotondo Italian School community in Edinburgh. Taking the audience inside the Italian language through its rhythms, words and stories.",
      it: "Uno spettacolo teatrale della Compagnia Gaudeamus per la comunità della Girotondo Italian School di Edimburgo. Un viaggio dentro la lingua italiana attraverso i suoi ritmi, le sue parole e le sue storie.",
    },
    description: {
      en: [
        "An original Compagnia Gaudeamus performance staged for the Girotondo Italian School in Edinburgh, taking children, parents and the wider Italian community on a journey through the Italian language: its sounds, its rhythms and its stories.",
      ],
      it: [
        "Uno spettacolo originale della Compagnia Artistica Gaudeamus, andato in scena per la Girotondo Italian School di Edimburgo, che porta bambini, genitori e la comunità italiana più ampia in un viaggio attraverso la lingua italiana: i suoi suoni, i suoi ritmi, le sue storie.",
      ],
    },
    venues: ["Girotondo Italian School, Edinburgh. Saturday 4 October, 11am"],
    credits: {
      en: [
        { role: "Conceived & Directed by", name: "Eva D'Amico" },
        { role: "Cast", name: "Eva D'Amico, Sacha Fop, Domenico Serino, Elena Tortoioli" },
      ],
      it: [
        { role: "Ideato e diretto da", name: "Eva D'Amico" },
        { role: "Cast", name: "Eva D'Amico, Sacha Fop, Domenico Serino, Elena Tortoioli" },
      ],
    },
    role: { en: "Production", it: "Produzione" },
    cover: "/events/viaggio-lingua/viaggio-lingua-01.jpg",
    poster: "/events/viaggio-lingua/locandina.png",
    gallery: [
      "/events/viaggio-lingua/viaggio-lingua-01.jpg",
      "/events/viaggio-lingua/viaggio-lingua-02.jpg",
      "/events/viaggio-lingua/viaggio-lingua-03.jpg",
      "/events/viaggio-lingua/viaggio-lingua-04.jpg",
    ],
  },
  {
    slug: "wander-fool-word",
    kind: "production",
    producer: "compagnia",
    year: 2024,
    status: "past",
    title: { en: "Wander Fool Word", it: "Wander Fool Word" },
    tagline: {
      en: "A laugh-out-loud family show playing with languages.",
      it: "Uno spettacolo per famiglie che gioca con le lingue.",
    },
    summary: {
      en: "A Compagnia Gaudeamus family show: two clowns, three languages, and one mission: help Nino learn to speak. Performed at Aberdeen Art Centre with a multilingual edition (English, Spanish, French) and a bilingual edition (English, Italian).",
      it: "Uno spettacolo per famiglie della Compagnia Gaudeamus: due clown, tre lingue, e una missione: aiutare Nino a imparare a parlare. In scena all'Aberdeen Art Centre con una versione multilingue (inglese, spagnolo, francese) e una bilingue (inglese, italiano).",
    },
    description: {
      en: [
        "Wander Fool Word is a Compagnia Gaudeamus family show built around two clowns and three languages. The audience follows Nino as he learns to speak: through gesture, song and the playful collisions that happen when languages meet.",
        "The show was staged at Aberdeen Art Centre with two performances on the same day: an 11:30am multilingual edition (English, Spanish, French) and a 2pm bilingual edition (English, Italian). Supported by the Community Fund.",
      ],
      it: [
        "Wander Fool Word è uno spettacolo per famiglie della Compagnia Gaudeamus costruito attorno a due clown e tre lingue. Il pubblico segue Nino mentre impara a parlare: attraverso il gesto, la canzone e gli incontri giocosi tra le lingue.",
        "Lo spettacolo è andato in scena all'Aberdeen Art Centre con due rappresentazioni nello stesso giorno: alle 11:30 nella versione multilingue (inglese, spagnolo, francese) e alle 14:00 nella versione bilingue (inglese, italiano). Sostenuto dal Community Fund.",
      ],
    },
    venues: [
      "Aberdeen Art Centre, 33 King Street AB24 5AA. Sunday 15 February",
      "11:30am multilingual edition (EN · ES · FR)",
      "2pm bilingual edition (EN · IT)",
    ],
    role: { en: "Production", it: "Produzione" },
    cover: "/events/wander-fool-word/wander-fool-word-05.jpg",
    poster: "/events/wander-fool-word/locandina.png",
    gallery: [
      "/events/wander-fool-word/wander-fool-word-01.jpg",
      "/events/wander-fool-word/wander-fool-word-02.jpg",
      "/events/wander-fool-word/wander-fool-word-03.jpg",
      "/events/wander-fool-word/wander-fool-word-04.jpg",
      "/events/wander-fool-word/wander-fool-word-05.jpg",
    ],
  },

  // ── COMMUNITY EVENTS ──────────────────────────────────────────────────
  {
    slug: "christmas-party",
    kind: "community",
    year: 2025,
    date: "2025-11-29",
    status: "past",
    title: { en: "Early Italian Christmas Party", it: "Early Italian Christmas Party" },
    tagline: {
      en: "An Italian Christmas at the Butchers Arms, Aberdeen.",
      it: "Un Natale italiano al Butchers Arms, Aberdeen.",
    },
    summary: {
      en: "Aberdeen's Butchers Arms Pub turned into a corner of Italy for our community Christmas: live music with The Badwills, traditional treats, and a room full of Italian and Scottish friends.",
      it: "Il Butchers Arms Pub di Aberdeen si è trasformato in un angolo d'Italia per il nostro Natale di comunità: musica dal vivo con i The Badwills, dolci tradizionali e una sala piena di amici italiani e scozzesi.",
    },
    description: {
      en: [
        "An Early Italian Christmas Party at Aberdeen's Butchers Arms Pub: live music, traditional Italian food, and a celebration of how the Italian community in Scotland keeps its cultural identity alive.",
        "The live band, The Badwills, kept the night going with rhythms of pizzica, tarantella and tammuriata. The evening was supported by the Honorary Consul and the Com.It.Es. president.",
      ],
      it: [
        "Un Early Italian Christmas Party al Butchers Arms Pub di Aberdeen: musica dal vivo, cibo italiano tradizionale, e una serata che racconta come la comunità italiana in Scozia tenga viva la propria identità culturale.",
        "La band dal vivo, The Badwills, ha animato la serata con ritmi di pizzica, tarantella e tammuriata. L'evento è stato sostenuto dal Console Onorario e dal presidente del Com.It.Es.",
      ],
    },
    venues: ["Butchers Arms Pub, 443 George Street, Aberdeen. 6 to 9pm, with The Badwills (live)"],
    cover: "/events/christmas-party/christmas-party-07.jpg",
    poster: "/media/event-posters/christmas-party-poster.jpg",
    gallery: [
      "/events/christmas-party/christmas-party-07.jpg",
      "/events/christmas-party/christmas-party-06.jpg",
      "/events/christmas-party/christmas-party-05.jpg",
      "/events/christmas-party/christmas-party-02.jpg",
      "/events/christmas-party/christmas-party-03.jpg",
      "/events/christmas-party/christmas-party-04.jpg",
    ],
  },
  {
    slug: "talk-and-toast-edinburgh-2026",
    kind: "community",
    year: 2026,
    date: "2026-02-07",
    status: "past",
    title: {
      en: "Talk and Toast: Italy and Scotland, shared Celtic memories",
      it: "Talk and Toast: Italia e Scozia, memorie celtiche condivise",
    },
    tagline: {
      en: "Between the Mediterranean and the Highlands. A journey through history, myth and shared roots.",
      it: "Tra il Mediterraneo e le Highlands. Un viaggio tra storia, mito e radici condivise.",
    },
    summary: {
      en: "An evening at Valvona & Crolla exploring the Celtic memories that link Italy and Scotland, between history and myth.",
      it: "Una serata da Valvona & Crolla per esplorare le memorie celtiche che legano Italia e Scozia, tra storia e mito.",
    },
    description: {
      en: [
        "Talk and Toast is the format we use for our literary aperitivos: a short reading or conversation, a toast, and time with the community. This edition turned to the surprising threads of Celtic memory shared between Italy and Scotland, between the Mediterranean and the Highlands.",
      ],
      it: [
        "Talk and Toast è il format dei nostri aperitivi letterari: un breve intervento o lettura, un brindisi e tempo con la comunità. Questa edizione ha messo a fuoco i fili sorprendenti di memoria celtica condivisi tra Italia e Scozia, tra il Mediterraneo e le Highlands.",
      ],
    },
    venues: ["Valvona & Crolla, Edinburgh. 7 February 2026, 5:00pm to 7:00pm"],
    cover: "/events/talk-and-toast/talk-and-toast-01.jpg",
    poster: "/media/event-posters/edinburgh-talk-poster.png",
    gallery: [
      "/events/talk-and-toast/talk-and-toast-01.jpg",
      "/events/talk-and-toast/talk-and-toast-02.jpg",
    ],
  },
  {
    slug: "talk-and-toast-aberdeen-2026",
    kind: "community",
    year: 2026,
    date: "2026-04-26",
    status: "past",
    title: {
      en: "Talk and Toast: Shakespeare segreto",
      it: "Talk and Toast: Shakespeare segreto",
    },
    tagline: {
      en: "The playwright who spoke Sicilian. A conversation between history and legend.",
      it: "Il drammaturgo che parlava siciliano. Una conversazione tra storia e leggenda.",
    },
    summary: {
      en: "An informal evening at Monty's Wine Shop and Bar in Aberdeen, exploring the so-called Shakespeare question and the fascinating theory that places his origins in Sicily.",
      it: "Un momento conviviale al Monty's Wine Shop and Bar di Aberdeen per esplorare la cosiddetta «questione shakespeariana» e l'affascinante teoria che lo vuole nato in Sicilia.",
    },
    description: {
      en: [
        "Between history and legend, this Talk and Toast led the audience through the so-called Shakespeare question, and the fascinating theory that places the playwright's origins in Sicily, with him speaking Sicilian.",
      ],
      it: [
        "Tra storia e leggenda, questa Talk and Toast ha guidato il pubblico alla scoperta della cosiddetta «questione shakespeariana» e dell'affascinante teoria che vuole il drammaturgo nato in Sicilia, con tanto di siciliano parlato.",
      ],
    },
    venues: ["Monty's Wine Shop and Bar, Aberdeen. 26 April 2026, 5pm to 7pm"],
    cover: "/media/event-posters/aberdeen-event-poster.png",
    poster: "/media/event-posters/aberdeen-event-poster.png",
    gallery: [],
  },
  {
    slug: "talk-and-toast-glasgow-2026",
    kind: "community",
    year: 2026,
    date: "2026-06-14",
    status: "upcoming",
    title: {
      en: "Talk and Toast: Building Communities",
      it: "Talk and Toast: Building Communities",
    },
    tagline: {
      en: "Migration and transnational ties between Italy and Scotland.",
      it: "Migrazione e legami transnazionali tra Italia e Scozia.",
    },
    summary: {
      en: "An evening at Sarti, Glasgow, on migration between Italy and Scotland (community building, identity and transnational ties), followed by an authentic Italian aperitivo.",
      it: "Una serata da Sarti, Glasgow, sulla migrazione tra Italia e Scozia (costruzione di comunità, identità e legami transnazionali), seguita da un autentico aperitivo italiano.",
    },
    description: {
      en: [
        "Explore migration between Italy and Scotland, focusing on community building, identity and transnational ties. The talk is followed by an informal gathering with an authentic Italian aperitivo.",
      ],
      it: [
        "Un viaggio tra Italia e Scozia attraverso la migrazione, con un focus su costruzione di comunità, identità e legami transnazionali. Il talk è seguito da un incontro informale con un autentico aperitivo italiano.",
      ],
    },
    venues: ["Sarti Restaurant, 121 Wellington Street, Glasgow. 14 June 2026, 4pm to 6pm"],
    cover: "/media/event-posters/glasgow-talk-poster.png",
    poster: "/media/event-posters/glasgow-talk-poster.png",
    gallery: [],
  },

  // ── WORKSHOPS ─────────────────────────────────────────────────────────
  {
    slug: "laboratorio-aberdeen",
    kind: "workshop",
    year: 2025,
    status: "past",
    title: {
      en: "Theatre Workshop, Aberdeen",
      it: "Laboratorio di Teatro, Aberdeen",
    },
    tagline: {
      en: "Theatre and Italian language, hands on.",
      it: "Teatro e lingua italiana, in pratica.",
    },
    summary: {
      en: "Aberdeen workshop in acting and Italian language, open to native speakers and learners alike.",
      it: "Laboratorio di recitazione e lingua italiana ad Aberdeen, aperto a madrelingua e principianti.",
    },
    description: {
      en: ["TBD. Full programme to be confirmed by Eva."],
      it: ["TBD. Programma completo in attesa di conferma da Eva."],
    },
    venues: ["Aberdeen"],
    cover: "/events/laboratori/aberdeen.png",
    poster: "/events/laboratori/aberdeen.png",
    gallery: [],
  },
  {
    slug: "laboratorio-glasgow",
    kind: "workshop",
    year: 2025,
    status: "past",
    title: {
      en: "Theatre Workshop, Glasgow",
      it: "Laboratorio di Teatro, Glasgow",
    },
    tagline: {
      en: "Theatre and Italian language, hands on.",
      it: "Teatro e lingua italiana, in pratica.",
    },
    summary: {
      en: "Glasgow workshop in acting and Italian language, open to native speakers and learners alike.",
      it: "Laboratorio di recitazione e lingua italiana a Glasgow, aperto a madrelingua e principianti.",
    },
    description: {
      en: ["TBD. Full programme to be confirmed by Eva."],
      it: ["TBD. Programma completo in attesa di conferma da Eva."],
    },
    venues: ["Glasgow"],
    cover: "/events/laboratori/glasgow.png",
    poster: "/events/laboratori/glasgow.png",
    gallery: [],
  },
  {
    slug: "laboratorio-theater",
    kind: "workshop",
    year: 2025,
    status: "past",
    title: {
      en: "Theatre Lab",
      it: "Theatre Lab",
    },
    tagline: {
      en: "An open lab on Italian theatre.",
      it: "Un laboratorio aperto sul teatro italiano.",
    },
    summary: {
      en: "An open theatre lab.",
      it: "Un laboratorio di teatro aperto.",
    },
    description: {
      en: ["TBD. Full programme to be confirmed by Eva."],
      it: ["TBD. Programma completo in attesa di conferma da Eva."],
    },
    cover: "/events/laboratori/theater.png",
    poster: "/events/laboratori/theater.png",
    gallery: [],
  },
];

export const eventBySlug = (slug: string) => events.find((e) => e.slug === slug);

export const productions = events.filter((e) => e.kind === "production");
export const upcomingProductions = productions.filter((e) => e.status === "upcoming" || e.status === "current");
export const pastProductions = productions.filter((e) => e.status === "past");

export const communityEvents = events.filter((e) => e.kind === "community");
export const upcomingCommunityEvents = communityEvents.filter((e) => e.status === "upcoming" || e.status === "current");
export const pastCommunityEvents = communityEvents.filter((e) => e.status === "past");

export const workshops = events.filter((e) => e.kind === "workshop");

// Backwards-compatible aliases — kept until callers are migrated.
export const pastEvents = events.filter((e) => e.status === "past");
export const upcomingEvents = events.filter((e) => e.status === "upcoming");
export const currentEvents = events.filter((e) => e.status === "current");
