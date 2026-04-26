/**
 * Press, reviews and external coverage of Gaudeamus.
 * Sourced from the client's "Parlano di noi" doc.
 * Each item's title, date, author and quote come from the actual article — verified by fetch.
 */

export type PressType = "article" | "review" | "video" | "podcast" | "pdf";

export type PressItem = {
  title: { en: string; it: string };
  outlet: string;
  url: string;
  date?: string; // yyyy-mm-dd
  author?: string;
  quote?: { en: string; it: string };
  type: PressType;
  related?: string;
};

export const press: PressItem[] = [
  {
    title: {
      en: "Italian theatre in Scotland: triumph for Poor Piero by Compagnia Gaudeamus",
      it: "Teatro italiano in Scozia: trionfo per Poor Piero della Compagnia Gaudeamus",
    },
    outlet: "London One Radio",
    url: "https://londononeradio.com/teatro-italiano-in-scozia-trionfo-per-poor-piero-della-compagnia-gaudeamus/",
    date: "2025-11-09",
    quote: {
      en: "Poor Piero speaks of life more than of death. It speaks of the need to smile at ourselves. — Eva D'Amico",
      it: "Poor Piero parla della vita più che della morte. Parla della necessità di sorridere di noi stessi. — Eva D'Amico",
    },
    type: "article",
    related: "poor-piero",
  },
  {
    title: {
      en: "Italian Connections: Italy in Scotland between theatre and music",
      it: "Italian Connections: l'Italia in Scozia tra teatro e musica",
    },
    outlet: "London One Radio",
    url: "https://londononeradio.com/italian-connections-litalia-in-scozia-tra-teatro-e-musica/",
    date: "2025-10-09",
    quote: {
      en: "Italian culture continues to unite, move and be reborn — like a sun that filters through the Scottish clouds.",
      it: "La cultura italiana continua a unire, emozionare e rinascere — come un sole che filtra tra le nuvole scozzesi.",
    },
    type: "article",
  },
  {
    title: {
      en: "Gaudeamus brings the Italian stage to the United Kingdom",
      it: "Gaudeamus porta la scena italiana nel Regno Unito",
    },
    outlet: "Complitaly",
    url: "https://www.complitaly.uk/notizie/gaudeamus-porta-la-scena-italiana-nel-regno-unito",
    date: "2025-07-23",
    author: "Desirèe Capozio",
    quote: {
      en: "2025/26 is shaping up as a season of consolidation and growth, with productions, educational projects and national collaborations.",
      it: "Il 2025/26 si annuncia come una stagione di consolidamento e crescita, con spettacoli, progetti educativi e collaborazioni nazionali.",
    },
    type: "article",
  },
  {
    title: {
      en: "Aberdeen: the Butchers Arms Pub turned into a corner of Italy thanks to Compagnia Artistica Gaudeamus",
      it: "Aberdeen: il Butchers Arms Pub si è trasformato in un angolo d'Italia grazie alla Compagnia Artistica Gaudeamus",
    },
    outlet: "London One Radio",
    url: "https://londononeradio.com/aberdeen-butchers-arms-pub-si-e-trasformato-in-un-angolo-ditalia-grazie-alla-compagnia-artistica-gaudeamus/",
    date: "2025-12-01",
    quote: {
      en: "The live band — The Badwills — kept the night alive with rhythms of pizzica, tarantella and tammuriata.",
      it: "La band dal vivo — The Badwills — ha animato la serata con ritmi di pizzica, tarantella e tammuriata.",
    },
    type: "article",
    related: "christmas-party",
  },
  {
    title: {
      en: "Great success for Compagnia Artistica Gaudeamus with Poor Piero",
      it: "Grande successo per la Compagnia Artistica Gaudeamus con “Poor Piero”",
    },
    outlet: "Complitaly",
    url: "https://www.complitaly.uk/notizie/grande-successo-per-la-compagnia-artistica-gaudeamus-con-poor-piero",
    date: "2025-02-05",
    author: "Valentina Dapit",
    quote: {
      en: "Campanile's humour turns sharp and irreverent, transforming a tragic event like death into an absurd social farce.",
      it: "L'umorismo di Campanile si fa tagliente e dissacrante, trasformando un evento tragico come la morte in un'assurda farsa sociale.",
    },
    type: "article",
    related: "poor-piero",
  },
  {
    title: {
      en: "Welcome Compagnia Artistica Gaudeamus",
      it: "Welcome Compagnia Artistica Gaudeamus",
    },
    outlet: "Scene — SCDA Magazine",
    url: "/press/scda-article.pdf",
    date: "2024-07-01",
    quote: {
      en: "Gaudeamus is the only theatre company that stages Italian works and performs entirely in Italian, complete with live English subtitles.",
      it: "Gaudeamus è l'unica compagnia teatrale che mette in scena opere italiane e le rappresenta interamente in italiano, con sottotitoli live in inglese.",
    },
    type: "pdf",
  },
  {
    title: { en: "No Shakespeare — review", it: "No Shakespeare — recensione" },
    outlet: "Broadway Baby",
    url: "https://broadwaybaby.com/shows/no-shakespeare/824819",
    type: "review",
    related: "no-shakespeare",
  },
  {
    title: {
      en: "Gaudeamus on stage — short",
      it: "Gaudeamus in scena — short",
    },
    outlet: "YouTube",
    url: "https://www.youtube.com/shorts/sVg0iPccIFI",
    type: "video",
  },
  {
    title: {
      en: "Gaudeamus on stage — full",
      it: "Gaudeamus in scena — full",
    },
    outlet: "YouTube",
    url: "https://www.youtube.com/watch?v=CqhJ7oj39O4",
    type: "video",
  },
  {
    title: {
      en: "Gaudeamus on London One Radio — podcast",
      it: "Gaudeamus su London One Radio — podcast",
    },
    outlet: "Spotify",
    url: "https://open.spotify.com/episode/4p9nPxK2hr3vV7Fsye9BrZ",
    type: "podcast",
  },
];
