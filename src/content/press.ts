/**
 * Press, reviews and external coverage of Gaudeamus.
 * Sourced from the client's "Parlano di noi" doc — links cleaned of tracking params.
 */

export type PressItem = {
  title: { en: string; it: string };
  outlet: string;
  url: string;
  type: "article" | "review" | "video" | "podcast" | "pdf";
  related?: string; // optional production slug
};

export const press: PressItem[] = [
  {
    title: {
      en: "Italian theatre in Scotland: triumph for Poor Piero by Compagnia Gaudeamus",
      it: "Teatro italiano in Scozia: trionfo per Poor Piero della Compagnia Gaudeamus",
    },
    outlet: "London One Radio",
    url: "https://londononeradio.com/teatro-italiano-in-scozia-trionfo-per-poor-piero-della-compagnia-gaudeamus/",
    type: "article",
    related: "poor-piero",
  },
  {
    title: {
      en: "Great success for Compagnia Artistica Gaudeamus with Poor Piero",
      it: "Grande successo per la Compagnia Artistica Gaudeamus con Poor Piero",
    },
    outlet: "Complitaly",
    url: "https://www.complitaly.uk/notizie/grande-successo-per-la-compagnia-artistica-gaudeamus-con-poor-piero",
    type: "article",
    related: "poor-piero",
  },
  {
    title: {
      en: "Gaudeamus brings Italian stage to the UK",
      it: "Gaudeamus porta la scena italiana nel Regno Unito",
    },
    outlet: "Complitaly",
    url: "https://www.complitaly.uk/notizie/gaudeamus-porta-la-scena-italiana-nel-regno-unito",
    type: "article",
  },
  {
    title: {
      en: "Aberdeen: Butchers Arms Pub turned into a corner of Italy thanks to Compagnia Gaudeamus",
      it: "Aberdeen: il Butchers Arms Pub si è trasformato in un angolo d'Italia grazie alla Compagnia Artistica Gaudeamus",
    },
    outlet: "London One Radio",
    url: "https://londononeradio.com/aberdeen-butchers-arms-pub-si-e-trasformato-in-un-angolo-ditalia-grazie-alla-compagnia-artistica-gaudeamus/",
    type: "article",
  },
  {
    title: {
      en: "Italian Connections: Italy in Scotland between theatre and music",
      it: "Italian Connections: l'Italia in Scozia tra teatro e musica",
    },
    outlet: "London One Radio",
    url: "https://londononeradio.com/italian-connections-litalia-in-scozia-tra-teatro-e-musica/",
    type: "article",
  },
  {
    title: { en: "No Shakespeare", it: "No Shakespeare" },
    outlet: "Broadway Baby",
    url: "https://broadwaybaby.com/shows/no-shakespeare/824819",
    type: "review",
    related: "no-shakespeare",
  },
  {
    title: {
      en: "SCDA — Scottish Community Drama Association feature",
      it: "SCDA — Scottish Community Drama Association",
    },
    outlet: "SCDA",
    url: "/press/scda-article.pdf",
    type: "pdf",
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
      en: "Gaudeamus on London One Radio (podcast)",
      it: "Gaudeamus su London One Radio (podcast)",
    },
    outlet: "Spotify",
    url: "https://open.spotify.com/episode/4p9nPxK2hr3vV7Fsye9BrZ",
    type: "podcast",
  },
];
