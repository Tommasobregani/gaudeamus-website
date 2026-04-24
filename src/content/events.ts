/**
 * Event & production catalog.
 * Bilingual copy. Client can extend via CMS later; for v1 this is the source of truth.
 */

export type EventKind = "production" | "gathering" | "workshop";

export type EventEntry = {
  slug: string;
  kind: EventKind;
  year: number;
  date?: string; // ISO
  status: "past" | "current" | "upcoming";
  title: { en: string; it: string };
  tagline: { en: string; it: string };
  summary: { en: string; it: string };
  description: { en: string[]; it: string[] };
  venues?: string[];
  role?: { en: string; it: string };
  cover: string; // public path
  gallery: string[]; // public paths
  credits?: {
    en: { role: string; name: string }[];
    it: { role: string; name: string }[];
  };
};

export const events: EventEntry[] = [
  {
    slug: "no-shakespeare",
    kind: "production",
    year: 2023,
    date: "2023-11-25",
    status: "past",
    title: { en: "No Shakespeare", it: "No Shakespeare" },
    tagline: {
      en: "An Italian answer to the Bard.",
      it: "Una risposta italiana al Bardo.",
    },
    summary: {
      en: "A theatrical conversation between Italian and Scottish dramatic traditions — what stories do we tell when we refuse the canon?",
      it: "Una conversazione teatrale tra tradizioni drammatiche italiana e scozzese — quali storie raccontiamo quando rifiutiamo il canone?",
    },
    description: {
      en: [
        "No Shakespeare began as a provocation: what would Italian theatre in Scotland look like if, for one evening, we put the national bard aside and asked what else we brought with us?",
        "Staged in November 2023, the production drew on commedia dell'arte, modern Italian playwrights and the voices of the Italian diaspora in Aberdeen and Glasgow. The result was a bilingual evening, alternately fierce and tender, about the stories that travel with you when you move countries.",
        "The night sold out. Photos, interviews and press coverage will live on this page.",
      ],
      it: [
        "No Shakespeare è nato come una provocazione: come sarebbe il teatro italiano in Scozia se, per una sera, mettessimo da parte il bardo nazionale e ci chiedessimo cos'altro ci siamo portati dietro?",
        "Messa in scena nel novembre 2023, la produzione ha attinto dalla commedia dell'arte, dai drammaturghi italiani contemporanei e dalle voci della diaspora italiana tra Aberdeen e Glasgow. Il risultato è stata una serata bilingue, a tratti feroce e a tratti tenera, sulle storie che viaggiano con te quando cambi paese.",
        "La serata è andata sold out. Foto, interviste e rassegna stampa troveranno casa qui.",
      ],
    },
    venues: ["Aberdeen", "Glasgow"],
    role: { en: "Production", it: "Produzione" },
    cover: "/events/no-shakespeare/no-shakespeare-01.jpg",
    gallery: [
      "/events/no-shakespeare/no-shakespeare-01.jpg",
      "/events/no-shakespeare/no-shakespeare-02.jpg",
      "/events/no-shakespeare/no-shakespeare-03.jpg",
      "/events/no-shakespeare/no-shakespeare-04.jpg",
      "/events/no-shakespeare/no-shakespeare-05.jpg",
      "/events/no-shakespeare/no-shakespeare-06.jpg",
      "/events/no-shakespeare/no-shakespeare-07.jpg",
      "/events/no-shakespeare/no-shakespeare-08.jpg",
      "/events/no-shakespeare/no-shakespeare-09.jpg",
      "/events/no-shakespeare/no-shakespeare-10.jpg",
      "/events/no-shakespeare/no-shakespeare-11.jpg",
    ],
    credits: {
      en: [
        { role: "Direction", name: "Compagnia Gaudeamus" },
        { role: "Dramaturgy", name: "Ensemble collective" },
        { role: "Cast", name: "Italian & Scottish voices" },
        { role: "Original music", name: "To be credited" },
        { role: "Venues", name: "Aberdeen · Glasgow" },
        { role: "Season", name: "November 2023" },
      ],
      it: [
        { role: "Regia", name: "Compagnia Gaudeamus" },
        { role: "Drammaturgia", name: "Ensemble collettivo" },
        { role: "Interpreti", name: "Voci italiane e scozzesi" },
        { role: "Musiche originali", name: "In definizione" },
        { role: "Sedi", name: "Aberdeen · Glasgow" },
        { role: "Stagione", name: "Novembre 2023" },
      ],
    },
  },
  {
    slug: "poor-piero",
    kind: "production",
    year: 2024,
    status: "past",
    title: { en: "Poor Piero", it: "Poor Piero" },
    tagline: {
      en: "A small Italian tragedy, told with a Scottish accent.",
      it: "Una piccola tragedia italiana, raccontata con accento scozzese.",
    },
    summary: {
      en: "An original Gaudeamus production — a tragicomic portrait of a man caught between two countries, two languages and a single table.",
      it: "Una produzione originale Gaudeamus — un ritratto tragicomico di un uomo in bilico tra due paesi, due lingue e un'unica tavola.",
    },
    description: {
      en: [
        "Poor Piero is our love letter to the Italian character who never quite makes it home. Written for the stage by Gaudeamus, the production uses music, monologue and physical theatre to sketch a life lived between Naples and Aberdeen.",
        "Piero is at times comic, at times unbearably lonely — but, in the Italian tradition, always generous. The production toured Scottish venues through 2024 and opened doors for the longer-form theatre work Gaudeamus is now developing.",
      ],
      it: [
        "Poor Piero è la nostra lettera d'amore al personaggio italiano che non torna mai davvero a casa. Scritta per la scena da Gaudeamus, la produzione usa musica, monologo e teatro fisico per disegnare una vita vissuta tra Napoli e Aberdeen.",
        "Piero è a tratti comico, a tratti insopportabilmente solo — ma, nella tradizione italiana, sempre generoso. La produzione ha girato i teatri scozzesi nel 2024 e ha aperto la strada alle opere più estese che Gaudeamus sta sviluppando ora.",
      ],
    },
    venues: ["Aberdeen", "Glasgow"],
    role: { en: "Original production", it: "Produzione originale" },
    cover: "/events/poor-piero/poor-piero-01.jpg",
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
        { role: "Writer & Director", name: "Compagnia Gaudeamus" },
        { role: "Lead performer", name: "Piero" },
        { role: "Physical theatre", name: "Ensemble" },
        { role: "Original score", name: "Between Naples and Aberdeen" },
        { role: "Venues", name: "Aberdeen · Glasgow" },
        { role: "Season", name: "2024" },
      ],
      it: [
        { role: "Autore & Regia", name: "Compagnia Gaudeamus" },
        { role: "Interprete principale", name: "Piero" },
        { role: "Teatro fisico", name: "Ensemble" },
        { role: "Musiche originali", name: "Fra Napoli e Aberdeen" },
        { role: "Sedi", name: "Aberdeen · Glasgow" },
        { role: "Stagione", name: "2024" },
      ],
    },
  },
  {
    slug: "viaggio-lingua",
    kind: "workshop",
    year: 2024,
    status: "past",
    title: {
      en: "Journey to the centre of the Italian language",
      it: "Viaggio al centro della lingua italiana",
    },
    tagline: {
      en: "A workshop on why Italian sounds the way it sounds.",
      it: "Un laboratorio su perché l'italiano suona come suona.",
    },
    summary: {
      en: "An immersive session on the history, music and odd corners of the Italian language — for speakers, learners and the plainly curious.",
      it: "Una sessione immersiva sulla storia, la musica e gli angoli strani della lingua italiana — per chi la parla, la studia o è semplicemente curioso.",
    },
    description: {
      en: [
        "Italian is not just a language. It is a centuries-long argument between dialects, a musical tradition, and a way of gesturing with your hands. This workshop, held in Scotland for Scotland, took participants from Dante to the telefonini — with stops on the way for regional accents, untranslatable words and the Italian sigh.",
        "Designed for both native speakers and learners, the session was led by Gaudeamus educators with guest contributions from Italian language faculty at collaborating universities.",
      ],
      it: [
        "L'italiano non è solo una lingua. È una discussione secolare tra dialetti, una tradizione musicale, un modo di gesticolare. Questo laboratorio, tenuto in Scozia per la Scozia, ha portato i partecipanti da Dante ai telefonini — con soste per accenti regionali, parole intraducibili e il sospiro italiano.",
        "Pensata tanto per madrelingua quanto per studenti, la sessione è stata guidata dagli educatori Gaudeamus con contributi ospiti dei docenti di lingua italiana delle università partner.",
      ],
    },
    venues: ["Aberdeen"],
    role: { en: "Workshop", it: "Laboratorio" },
    cover: "/events/viaggio-lingua/viaggio-lingua-01.jpg",
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
    year: 2024,
    status: "past",
    title: { en: "Wander Fool Word", it: "Wander Fool Word" },
    tagline: {
      en: "A wandering performance between Italian and Scottish poetry.",
      it: "Una performance itinerante tra poesia italiana e scozzese.",
    },
    summary: {
      en: "A bilingual performance stitching together Italian and Scottish poetic voices — a slow, wandering evening about language, exile and coming home.",
      it: "Una performance bilingue che cuce insieme voci poetiche italiane e scozzesi — una serata lenta e itinerante su lingua, esilio e ritorno.",
    },
    description: {
      en: [
        "Wander Fool Word is a performance that refuses to pick a language. Over the course of an evening, Italian and Scottish poems speak to each other — sometimes in translation, sometimes not. The audience is invited to listen to both, trust the rhythm, and let meaning arrive when it is ready.",
        "We think of it as Gaudeamus at its most characteristic: bilingual, unhurried, a little strange, and quietly moving.",
      ],
      it: [
        "Wander Fool Word è una performance che rifiuta di scegliere una lingua. Nel corso di una serata, poesie italiane e scozzesi si parlano — a volte in traduzione, a volte no. Al pubblico si chiede di ascoltarle entrambe, fidarsi del ritmo e lasciare che il senso arrivi quando è pronto.",
        "La pensiamo come Gaudeamus al suo più caratteristico: bilingue, senza fretta, un po' strana, e silenziosamente commovente.",
      ],
    },
    venues: ["Glasgow"],
    role: { en: "Production", it: "Produzione" },
    cover: "/events/wander-fool-word/wander-fool-word-01.jpg",
    gallery: [
      "/events/wander-fool-word/wander-fool-word-01.jpg",
      "/events/wander-fool-word/wander-fool-word-02.jpg",
      "/events/wander-fool-word/wander-fool-word-03.jpg",
      "/events/wander-fool-word/wander-fool-word-04.jpg",
    ],
  },
  {
    slug: "talk-and-toast",
    kind: "gathering",
    year: 2024,
    status: "past",
    title: { en: "Talk and Toast — Edinburgh", it: "Talk and Toast — Edimburgo" },
    tagline: {
      en: "A conversation, a glass, and Italian culture between friends.",
      it: "Una conversazione, un calice e cultura italiana fra amici.",
    },
    summary: {
      en: "An evening of conversation and a shared toast — Italian artists, Scottish friends, and the short talks that turn into long friendships.",
      it: "Una serata di conversazione e un brindisi condiviso — artisti italiani, amici scozzesi, e i brevi interventi che diventano lunghe amicizie.",
    },
    description: {
      en: [
        "Talk and Toast is Gaudeamus' informal gathering — half cultural salon, half aperitivo. A short talk, a glass in hand, and an open room for questions, Italian and Scottish voices alike.",
        "The Edinburgh evening was one of our warmest yet. We plan to bring the format to Glasgow and Aberdeen in the coming seasons.",
      ],
      it: [
        "Talk and Toast è l'incontro informale di Gaudeamus — metà salotto culturale, metà aperitivo. Un breve intervento, un calice in mano e una stanza aperta a domande, voci italiane e scozzesi in egual misura.",
        "La serata di Edimburgo è stata una delle più calorose. Contiamo di portare il format anche a Glasgow e ad Aberdeen nelle prossime stagioni.",
      ],
    },
    venues: ["Edinburgh"],
    role: { en: "Gathering", it: "Incontro" },
    cover: "/events/talk-and-toast/talk-and-toast-01.jpg",
    gallery: [
      "/events/talk-and-toast/talk-and-toast-01.jpg",
      "/events/talk-and-toast/talk-and-toast-02.jpg",
    ],
  },
  {
    slug: "christmas-party",
    kind: "gathering",
    year: 2025,
    status: "past",
    title: { en: "Gaudeamus Christmas Party", it: "Gaudeamus Christmas Party" },
    tagline: {
      en: "The community, in one room, at the end of the year.",
      it: "La comunità, in una stanza sola, a fine anno.",
    },
    summary: {
      en: "Our end-of-year gathering: friends, artists, supporters and volunteers sharing one long Italian table in the middle of Scotland.",
      it: "L'incontro di fine anno: amici, artisti, sostenitori e volontari intorno a una lunga tavolata italiana nel cuore della Scozia.",
    },
    description: {
      en: [
        "Every year, Gaudeamus closes the season with a Christmas Party that is part dinner, part performance, part thank-you letter. Italian food, Scottish welcome, mixed languages and — always — a small surprise on stage.",
        "It is one of the nights where the charity stops looking like a charity and looks instead like a family.",
      ],
      it: [
        "Ogni anno Gaudeamus chiude la stagione con una festa di Natale che è in parte cena, in parte spettacolo, in parte lettera di ringraziamento. Cucina italiana, accoglienza scozzese, lingue mescolate e — sempre — una piccola sorpresa sul palco.",
        "È una delle serate in cui la charity smette di sembrare una charity e sembra, piuttosto, una famiglia.",
      ],
    },
    venues: ["Aberdeen"],
    role: { en: "Community gathering", it: "Incontro di comunità" },
    cover: "/events/christmas-party/christmas-party-01.jpg",
    gallery: [
      "/events/christmas-party/christmas-party-01.jpg",
      "/events/christmas-party/christmas-party-02.jpg",
      "/events/christmas-party/christmas-party-03.jpg",
      "/events/christmas-party/christmas-party-04.jpg",
    ],
  },
];

export const eventBySlug = (slug: string) => events.find((e) => e.slug === slug);

export const pastEvents = events.filter((e) => e.status === "past");
export const upcomingEvents = events.filter((e) => e.status === "upcoming");
export const currentEvents = events.filter((e) => e.status === "current");
