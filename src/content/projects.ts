export type FundedProject = {
  slug: string;
  year: number;
  title: { en: string; it: string };
  body: { en: string; it: string };
  /** Hero image for the detail page. */
  image: string;
  /** Optional partner credits. */
  partners?: string[];
};

export const fundedProjects: FundedProject[] = [
  {
    slug: "italian-scottish-cultural-bridges-2027",
    year: 2027,
    title: {
      en: "Italian–Scottish Cultural Bridges. Cultural Programme 2027",
      it: "Italian–Scottish Cultural Bridges. Programma culturale 2027",
    },
    body: {
      en: "Connecting communities through theatre, music, language and intercultural exchange. Italian–Scottish Cultural Bridges is an international cultural programme presented by Gaudeamus Artistic Company, designed to strengthen artistic collaboration and cultural connections between Scotland and Italy. Through theatre, music, storytelling, creative workshops and participatory activities, it brings Italian and Scottish communities together, encouraging intercultural dialogue and exploring identity, bilingualism, belonging, migration and cultural heritage. The programme takes place across Aberdeen, Edinburgh and Glasgow, involving professional artists, young people, bilingual families, schools and local communities. Its aims: to strengthen cultural relations between Scotland and Italy, support multilingual and migrant communities, create opportunities for young people and emerging artists, promote inclusive access to cultural activities, develop new audiences for international and multilingual theatre, and encourage dialogue, inclusion and social cohesion through the arts. Building bridges between people, languages and cultures through the power of the arts.",
      it: "Unire le comunità attraverso il teatro, la musica, la lingua e lo scambio interculturale. Italian–Scottish Cultural Bridges è un programma culturale internazionale presentato dalla Compagnia Artistica Gaudeamus, pensato per rafforzare la collaborazione artistica e i legami culturali tra la Scozia e l'Italia. Attraverso teatro, musica, narrazione, laboratori creativi e attività partecipative, il progetto avvicina le comunità italiane e scozzesi, favorendo il dialogo interculturale ed esplorando i temi dell'identità, del bilinguismo, dell'appartenenza, della migrazione e del patrimonio culturale. Il programma si svolge tra Aberdeen, Edimburgo e Glasgow e coinvolge artisti professionisti, giovani, famiglie bilingui, scuole e comunità locali. Gli obiettivi: rafforzare le relazioni culturali tra Scozia e Italia, sostenere le comunità multilingui e migranti, creare opportunità per giovani e artisti emergenti, promuovere un accesso inclusivo alle attività culturali, sviluppare nuovi pubblici per il teatro internazionale e multilingue, e favorire il dialogo, l'inclusione e la coesione sociale attraverso le arti. Costruire ponti tra persone, lingue e culture grazie alla forza delle arti.",
    },
    image: "/events/high-heels-from-the-big-boot/high-heels-03.jpg",
    partners: [
      "Istituto Italiano di Cultura, Edinburgh",
      "Aberdeen City Council",
      "Mazzini Garibaldi Society",
      "Italian Scotland",
      "Consulate General of Italy, Edinburgh",
    ],
  },
  {
    slug: "italian-connections-2025-26",
    year: 2025,
    title: {
      en: "Italian Connections. Italy in Scotland between theatre and music (2025/26)",
      it: "Italian Connections. L'Italia in Scozia tra teatro e musica (2025/26)",
    },
    body: {
      en: "A nine-month programme of artistic, cultural and educational events across Aberdeen, Edinburgh and Glasgow, focused on second-generation Italians and anyone who feels distant from their roots, opening up spaces for dialogue and collaboration to strengthen social ties and celebrate cultural identity. Delivered exclusively by Italian-heritage artists, teachers, professionals and volunteers based in Scotland and beyond. In partnership with Com.It.Es. Scotland & Northern Ireland and the National Lottery Ethnic Minority Development Fund.",
      it: "Un programma di nove mesi di eventi artistici, culturali ed educativi tra Aberdeen, Edimburgo e Glasgow, focalizzato sui giovani italiani di seconda generazione e su chi si sente distante dalle proprie radici, offrendo spazi di dialogo e collaborazione per rafforzare i legami sociali e celebrare l'identità culturale. Realizzato da artisti, docenti, professionisti e volontari esclusivamente di origine italiana, presenti sul territorio scozzese e non. In collaborazione con i Com.It.Es. di Scozia e Irlanda del Nord e il National Lottery Ethnic Minority Development Fund.",
    },
    image: "/events/viaggio-lingua/viaggio-lingua-01.jpg",
    partners: [
      "Com.It.Es. Scotland & Northern Ireland",
      "National Lottery Ethnic Minority Development Fund",
    ],
  },
  {
    slug: "albo-consolare",
    year: 2025,
    title: {
      en: "Joining the Albo Consolare",
      it: "Ingresso nell'Albo Consolare",
    },
    body: {
      en: "Gaudeamus joins the Albo Consolare delle Associazioni Culturali Italiane nel Regno Unito (the official Italian-government register of cultural associations in the UK), consolidating its institutional role in promoting Italian art and culture across Scotland.",
      it: "Gaudeamus entra ufficialmente nell'Albo Consolare delle Associazioni Culturali Italiane nel Regno Unito, consolidando il proprio ruolo istituzionale nella promozione dell'arte e della cultura italiana in Scozia.",
    },
    image: "/events/no-shakespeare/no-shakespeare-04.jpg",
    partners: ["Consulate General of Italy, Edinburgh"],
  },
  {
    slug: "production-season-2024",
    year: 2024,
    title: {
      en: "Theatrical consolidation: a year that marked a turning point.",
      it: "Consolidamento teatrale: un anno che ha segnato un punto di svolta.",
    },
    body: {
      en: "A year rich in productions that marked a turning point for Gaudeamus. From staging Poor Piero by Achille Campanile to the Edinburgh Fringe debut with No Shakespeare. Both performed in Italian with live English subtitles, with the goal of bringing Italian dramaturgy to Scottish stages.",
      it: "Un anno ricco di produzioni che ha segnato un punto di svolta per la Gaudeamus. Dalla messa in scena del Povero Piero di Achille Campanile, al debutto al Fringe di Edimburgo con No Shakespeare. Entrambi in italiano con sottotitoli live in inglese, con l'obiettivo di portare la drammaturgia italiana sui palchi scozzesi.",
    },
    image: "/events/poor-piero/poor-piero-04.jpeg",
  },
  {
    slug: "return-to-the-roots-2023",
    year: 2023,
    title: {
      en: "Return to the Roots: first production & community workshops",
      it: "Return to the Roots: prima produzione e laboratori di comunità",
    },
    body: {
      en: "Return to the Roots was the Charity's first project. It set out to counter isolation and strengthen the ties between the Italian community and the local territory. Not only a series of workshops aimed at actively involving the community, but also the debut of our first theatrical production, No Shakespeare, with live English subtitles to make the show accessible to everyone. In partnership with Aberdeen City Council, Creative Funding.",
      it: "Return to the Roots è stato il primo progetto della Charity, che mirava a contrastare l'isolamento ed a rafforzare i legami tra la comunità italiana ed il territorio locale. Non solo una serie di laboratori mirati a coinvolgere attivamente la comunità, ma anche il debutto della nostra prima produzione teatrale No Shakespeare, con l'uso di sottotitoli live in inglese per rendere lo spettacolo accessibile a tutti. In collaborazione con Aberdeen City Council, Creative Funding.",
    },
    image: "/events/no-shakespeare/no-shakespeare-01.jpg",
    partners: ["Aberdeen City Council", "Creative Funding"],
  },
  {
    slug: "founding-charity-2023",
    year: 2023,
    title: {
      en: "Founding & charity registration",
      it: "Fondazione e registrazione come charity",
    },
    body: {
      en: "Compagnia Artistica Gaudeamus is founded in Aberdeen in May 2023. In September 2023 it is officially recognised as a Scottish Charitable Incorporated Organisation (SCIO), becoming the only Scottish charity to stage productions entirely in Italian with live English subtitles. First production: No Shakespeare, November 2023.",
      it: "La Compagnia Artistica Gaudeamus nasce ad Aberdeen nel maggio 2023. Nel settembre 2023 viene ufficialmente riconosciuta come Scottish Charitable Incorporated Organisation (SCIO), diventando l'unica charity in Scozia a portare in scena spettacoli interamente in italiano con sottotitoli live in inglese. Prima produzione: No Shakespeare, novembre 2023.",
    },
    image: "/events/wander-fool-word/wander-fool-word-05.jpg",
    partners: ["OSCR — Scottish Charity Regulator"],
  },
];

export function projectBySlug(slug: string): FundedProject | undefined {
  return fundedProjects.find((p) => p.slug === slug);
}
