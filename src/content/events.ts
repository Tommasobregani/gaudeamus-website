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
  /** Booking link, shown under the dates and as a button on the page. */
  tickets?: { url: string; label: { en: string; it: string } };
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
      "Aberdeen Art Centre, Aberdeen. 26 September 2026",
      "Glasgow. TBC",
    ],
    role: { en: "Original production", it: "Produzione originale" },
    cover: "",
    poster: "/events/high-heels-from-the-big-boot/locandina.jpg",
    gallery: [
      "/events/high-heels-from-the-big-boot/high-heels-01.jpg",
      "/events/high-heels-from-the-big-boot/high-heels-02.jpg",
      "/events/high-heels-from-the-big-boot/high-heels-03.jpg",
      "/events/high-heels-from-the-big-boot/high-heels-04.jpg",
      "/events/high-heels-from-the-big-boot/high-heels-05.jpg",
      "/events/high-heels-from-the-big-boot/high-heels-06.jpg",
    ],
    credits: {
      en: [
        { role: "Written by", name: "Eva D'Amico" },
        { role: "Direction", name: "Eva D'Amico" },
        { role: "Assistant Director", name: "Giancarlo Abobua" },
        { role: "Cast", name: "Federica Casolari, Eva D'Amico, Domenico Serino" },
        { role: "Graphic designer", name: "Alessia D'Angelo" },
        { role: "Running time", name: "One act, c. 60 min" },
        { role: "Audience", name: "All ages" },
      ],
      it: [
        { role: "Testo", name: "Eva D'Amico" },
        { role: "Regia", name: "Eva D'Amico" },
        { role: "Assistente di regia", name: "Giancarlo Abobua" },
        { role: "Cast", name: "Federica Casolari, Eva D'Amico, Domenico Serino" },
        { role: "Grafica locandina", name: "Alessia D'Angelo" },
        { role: "Durata", name: "Atto unico, circa 60 min" },
        { role: "Pubblico", name: "Tutti" },
      ],
    },
  },
  {
    slug: "gods-honest-lies",
    kind: "production",
    producer: "compagnia",
    year: 2027,
    date: "2027-02-27",
    status: "upcoming",
    title: { en: "God's Honest Lies", it: "God's Honest Lies" },
    tagline: {
      en: "Inspired by Eduardo De Filippo's Le Bugie con le Gambe Lunghe.",
      it: "Ispirato a Le Bugie con le Gambe Lunghe di Eduardo De Filippo.",
    },
    summary: {
      en: "In a world where everyone lies, telling the truth can be the most dangerous thing of all.",
      it: "In un mondo in cui tutti mentono, dire la verità può essere la cosa più pericolosa di tutte.",
    },
    description: {
      en: [
        "What if the biggest lie of all was the truth?",
        "Following the success of Poor Piero and High Heels from the Big Boot, Gaudeamus Theatre Company returns with a sharp, witty and surprisingly contemporary comedy inspired by one of the great masters of Italian theatre, Eduardo De Filippo.",
        "Meet Libero Incoronato, an ordinary man caught in a world where appearances matter more than honesty. Here, lies are everywhere: told to protect reputations, avoid scandals and save relationships. Everyone has something to hide, and everyone has a reason to lie. But when deception becomes the norm, where does the truth belong?",
        "Set in the immediate post-war period, God's Honest Lies brings Eduardo's unmistakable blend of humour, irony and social criticism to the stage in a dynamic, contemporary production. With a new prologue and epilogue that connect the world of the original play to our own, the story reveals just how little has changed.",
        "A comedy of lies, misunderstandings and uncomfortable truths, this ensemble production invites us to laugh at the absurdity of human behaviour while confronting a question that feels more relevant than ever:",
        "How far would you go to preserve the peace, even if it meant living a lie?",
        "Performed in Italian with live English surtitles, God's Honest Lies brings the wit, musicality and Neapolitan soul of Eduardo De Filippo to an international audience.",
        "Come for the comedy. Stay for the truth.",
      ],
      it: [
        "E se la bugia più grande di tutte fosse la verità?",
        "Dopo il successo di Poor Piero e High Heels from the Big Boot, la Compagnia Gaudeamus torna in scena con una commedia brillante, ironica e sorprendentemente attuale, ispirata a uno dei grandi maestri del teatro italiano: Eduardo De Filippo.",
        "Ecco Libero Incoronato, un uomo comune in un mondo dove le apparenze contano più dell'onestà. Qui le bugie sono ovunque: si dicono per proteggere la reputazione, evitare scandali e salvare i rapporti. Tutti hanno qualcosa da nascondere, e tutti hanno un motivo per mentire. Ma quando l'inganno diventa la regola, dove trova posto la verità?",
        "Ambientato nell'immediato dopoguerra, lo spettacolo porta in scena l'inconfondibile miscela di umorismo, ironia e critica sociale di Eduardo in un allestimento dinamico e contemporaneo. Con un nuovo prologo e un nuovo epilogo che collegano il mondo della commedia originale al nostro, la storia mostra quanto poco sia cambiato.",
        "Una commedia di bugie, equivoci e verità scomode: uno spettacolo corale che ci invita a ridere dell'assurdità dei comportamenti umani, mettendoci di fronte a una domanda oggi più attuale che mai:",
        "Fin dove ti spingeresti per mantenere la pace, anche a costo di vivere una bugia?",
        "In italiano con sopratitoli in inglese dal vivo, lo spettacolo porta l'arguzia, la musicalità e l'anima napoletana di Eduardo De Filippo davanti a un pubblico internazionale.",
        "Vieni per ridere. Resta per la verità.",
      ],
    },
    venues: [
      "Aberdeen Arts Centre, Aberdeen. Saturday 27 February 2027, 7:30pm",
      "Lyra Theatre, Edinburgh. Saturday 8 May 2027, time TBC",
      "Impact Arts, Glasgow. Saturday 29 May 2027, time TBC",
    ],
    role: { en: "Production", it: "Produzione" },
    cover: "",
    poster: "/events/gods-honest-lies/locandina-aberdeen.jpg",
    gallery: [],
    credits: {
      en: [
        { role: "Adapted and directed by", name: "Eva D'Amico" },
        { role: "Assistant Director", name: "Giancarlo Abobua" },
        { role: "Stage Assistant", name: "Antonio Ibba" },
        { role: "Make-up", name: "Federica Casolari" },
        { role: "Cast", name: "Erika Boetto, Barbara Canu, Federica Casolari, Eva D'Amico, Silvia Laura Fittante, Sacha Fop, Nicolò Ibba, Mauro Manassi, Lucrezia Piccicacchi, Domenico Serino, Elena Tortoioli" },
        { role: "Graphic designer", name: "Alessia D'Angelo" },
        { role: "Language", name: "Italian with live English surtitles" },
        { role: "Running time", name: "1 hour 30 minutes, two acts" },
        { role: "Audience", name: "All ages" },
      ],
      it: [
        { role: "Adattamento e regia", name: "Eva D'Amico" },
        { role: "Assistente di regia", name: "Giancarlo Abobua" },
        { role: "Assistente di palcoscenico", name: "Antonio Ibba" },
        { role: "Make-up artist", name: "Federica Casolari" },
        { role: "Cast", name: "Erika Boetto, Barbara Canu, Federica Casolari, Eva D'Amico, Silvia Laura Fittante, Sacha Fop, Nicolò Ibba, Mauro Manassi, Lucrezia Piccicacchi, Domenico Serino, Elena Tortoioli" },
        { role: "Grafica locandina", name: "Alessia D'Angelo" },
        { role: "Lingua", name: "Italiano con sopratitoli in inglese dal vivo" },
        { role: "Durata", name: "1 ora e 30 minuti, due atti" },
        { role: "Pubblico", name: "Per tutte le età" },
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
    ],
    credits: {
      en: [
        { role: "Written by", name: "Eva D'Amico" },
        { role: "Direction", name: "Eva D'Amico" },
        { role: "Assistant Director", name: "Giancarlo Abobua" },
        { role: "Cast", name: "Erika Boetto, Eva D'Amico, Domenico Serino" },
        { role: "Graphic designer", name: "Alessia D'Angelo" },
        { role: "Running time", name: "One act, c. 60 min" },
        { role: "Audience", name: "All ages" },
      ],
      it: [
        { role: "Testo", name: "Eva D'Amico" },
        { role: "Regia", name: "Eva D'Amico" },
        { role: "Assistente di regia", name: "Giancarlo Abobua" },
        { role: "Cast", name: "Erika Boetto, Eva D'Amico, Domenico Serino" },
        { role: "Grafica locandina", name: "Alessia D'Angelo" },
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
      it: "Un capolavoro di umorismo dissacrante, di Achille Campanile.",
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
      "/events/poor-piero/poor-piero-stage-wide.jpg",
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
        { role: "Graphic designer", name: "Alessia D'Angelo" },
        { role: "Photography", name: "Natalie Hood, Terry Boyd, Steven Gray" },
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
        { role: "Grafica locandina", name: "Alessia D'Angelo" },
        { role: "Foto di scena", name: "Natalie Hood, Terry Boyd, Steven Gray" },
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
        { role: "Graphic designer", name: "Alessia D'Angelo" },
        { role: "Running time", name: "One act, c. 60 min" },
        { role: "Audience", name: "All ages" },
      ],
      it: [
        { role: "Testo", name: "Eva D'Amico" },
        { role: "Regia", name: "Eva D'Amico" },
        { role: "Grafica locandina", name: "Alessia D'Angelo" },
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
      en: "A family show: two clowns, three languages, and one mission: help Nino learn to speak. Staged at Aberdeen Art Centre in a multilingual edition (English, Spanish, French) and a bilingual edition (English, Italian). A show by Tonino Scalia, presented by Compagnia Gaudeamus.",
      it: "Uno spettacolo per famiglie: due clown, tre lingue, e una missione: aiutare Nino a imparare a parlare. In scena all'Aberdeen Art Centre in versione multilingue (inglese, spagnolo, francese) e in versione bilingue (inglese, italiano). Uno spettacolo di Tonino Scalia, promosso dalla Compagnia Gaudeamus.",
    },
    description: {
      en: [
        "Wander Fool Word is a family show built around two clowns and three languages: the audience follows Nino as he learns to speak, through gesture and the joyful collisions of languages.",
      ],
      it: [
        "Wander Fool Word è uno spettacolo per famiglie che ruota attorno a due clown e tre lingue: il pubblico segue Nino mentre impara a parlare, attraverso il gesto e gli incontri gioiosi tra le lingue.",
      ],
    },
    venues: ["Aberdeen Art Centre, Aberdeen. 15 February 2025"],
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
    slug: "christmas-party-2026",
    kind: "community",
    year: 2026,
    date: "2026-12-05",
    status: "upcoming",
    title: { en: "Christmas Party", it: "Christmas Party" },
    tagline: {
      en: "Saturday 5 December 2026, The Holburn Bar, Aberdeen.",
      it: "Sabato 5 dicembre 2026, The Holburn Bar, Aberdeen.",
    },
    summary: {
      en: "Join us for a traditional Italian Christmas party with live music, a welcome drink and our traditional Pandoro. Live music from the Edinburgh based folk band Scylla.",
      it: "Unisciti a noi per una tradizionale festa di Natale italiana, con musica dal vivo, un drink di benvenuto e il nostro immancabile Pandoro. Musica dal vivo con gli Scylla, band folk di Edimburgo.",
    },
    description: {
      en: [
        "Tickets are on Eventbrite.",
        "For further information, write to info@italiandramauk.org.",
      ],
      it: [
        "I biglietti sono su Eventbrite.",
        "Per informazioni scrivi a info@italiandramauk.org.",
      ],
    },
    venues: ["The Holburn Bar, 225 Holburn Street, Aberdeen AB10 6BL. Saturday 5 December 2026, 5pm to 8pm"],
    cover: "/events/christmas-party-2026/flyer-card.jpg",
    poster: "/events/christmas-party-2026/flyer.jpg",
    gallery: [],
    tickets: {
      url: "https://www.eventbrite.com/e/italian-christmas-party-tickets-2003509457721",
      label: { en: "Tickets on Eventbrite", it: "Biglietti su Eventbrite" },
    },
  },
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
      en: "A conversation between history and legend.",
      it: "Una conversazione tra storia e leggenda.",
    },
    summary: {
      en: "An informal evening at Monty's Wine Shop and Bar in Aberdeen, exploring the so-called Shakespeare question and the fascinating theory that places his origins in Sicily.",
      it: "Un momento conviviale al Monty's Wine Shop and Bar di Aberdeen per esplorare la cosiddetta «questione shakespeariana» e l'affascinante teoria che lo vuole nato in Sicilia.",
    },
    description: {
      en: [
        "Between history and legend, this Talk and Toast led the audience through the so-called Shakespeare question, and the fascinating theory that places the playwright's origins in Sicily.",
      ],
      it: [
        "Tra storia e leggenda, questa Talk and Toast ha guidato il pubblico alla scoperta della cosiddetta «questione shakespeariana» e dell'affascinante teoria che vuole il drammaturgo nato in Sicilia.",
      ],
    },
    venues: ["Monty's Wine Shop and Bar, Aberdeen. 26 April 2026, 5pm to 7pm"],
    cover: "/events/talk-and-toast-aberdeen/shakespeare-segreto-01.jpg",
    poster: "/media/event-posters/aberdeen-event-poster.png",
    gallery: [
      "/events/talk-and-toast-aberdeen/shakespeare-segreto-01.jpg",
      "/events/talk-and-toast-aberdeen/shakespeare-segreto-02.jpg",
    ],
  },
  {
    slug: "talk-and-toast-glasgow-2026",
    kind: "community",
    year: 2026,
    date: "2026-06-14",
    status: "past",
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
    cover: "/events/talk-and-toast/26eb395f-81b3-4c83-a246-2dfb6de3bc96.JPG",
    poster: "/media/event-posters/glasgow-talk-poster.png",
    gallery: [
      "/events/talk-and-toast/26eb395f-81b3-4c83-a246-2dfb6de3bc96.JPG",
      "/events/talk-and-toast/46c6837b-76bf-4142-bf16-e2a7d5f427d8.JPG",
      "/events/talk-and-toast/4dfa6c5e-3f13-4a75-b16f-1c01e9e1921b.JPG",
      "/events/talk-and-toast/53f3e7ab-eec6-4ad3-97b7-188032bffc2b.JPG",
      "/events/talk-and-toast/c1782d59-0b4b-421a-b02e-b0d799ac69b2.JPG",
      "/events/talk-and-toast/c8dc2110-de25-4b00-9825-2e4161f843c3.JPG",
      "/events/talk-and-toast/c8ed2ab6-16a3-48ca-9a8e-c2e8dccf8f4c.JPG",
      "/events/talk-and-toast/f0c47c48-fe3d-4489-ad2d-a8af5ed5cccf.JPG",
    ],
  },

  // ── WORKSHOPS ─────────────────────────────────────────────────────────
  {
    slug: "parliamo-di-noi",
    kind: "workshop",
    year: 2027,
    date: "2027-01-22",
    status: "upcoming",
    title: { en: "Parliamo di Noi", it: "Parliamo di Noi" },
    tagline: {
      en: "Let's talk about us. Your story, your identity, your film.",
      it: "La tua storia, la tua identità, il tuo film.",
    },
    summary: {
      en: "A free filmmaking workshop for young people aged 12 to 24 from Italian family backgrounds, living in Scotland.",
      it: "Un laboratorio di cinema gratuito per ragazze e ragazzi dai 12 ai 24 anni, di famiglia italiana, che vivono in Scozia.",
    },
    description: {
      en: [
        "What does it mean to grow up between two cultures?",
        "Through smartphone filmmaking, acting exercises and storytelling, you'll explore your Italian-British identity, sharing personal memories, everyday experiences, family traditions and the places that shape who you are.",
        "You'll learn to make engaging videos with your phone, capture the images, sounds and moments of everyday life (B-roll), tell stories through framing and composition, and try acting and improvisation in front of the camera.",
        "Before the workshop you'll be invited to film a few short clips on your phone: your neighbourhood, family objects, daily routines, special places, anything that shows what growing up between Italian and British cultures is like for you.",
        "All the footage and ideas become a collaborative short film, edited by the workshop facilitator with input from the participants. It will be presented at a special social event (date to be confirmed).",
        "No filmmaking or acting experience needed: just bring your smartphone, your ideas and your curiosity. The workshop is free, but you need to book your place.",
        "Come and tell your story. Let's make a film together! For more information, write to info@italiandramauk.org.",
      ],
      it: [
        "Cosa significa crescere tra due culture?",
        "Con il cinema da smartphone, esercizi di recitazione e lo storytelling, esplorerai la tua identità italo-britannica, condividendo ricordi personali, esperienze quotidiane, tradizioni di famiglia e i luoghi che ti hanno reso ciò che sei.",
        "Imparerai a girare video coinvolgenti con il telefono, a catturare immagini, suoni e momenti della vita di tutti i giorni (B-roll), a raccontare storie attraverso l'inquadratura e la composizione, e a sperimentare recitazione e improvvisazione davanti alla telecamera.",
        "Prima del laboratorio ti chiederemo di girare qualche breve clip con il telefono: il tuo quartiere, oggetti di famiglia, la routine quotidiana, luoghi speciali, tutto ciò che racconta cosa vuol dire per te crescere tra la cultura italiana e quella britannica.",
        "Tutto il materiale e le idee raccolte diventeranno un cortometraggio collettivo, montato da chi conduce il laboratorio con il contributo dei partecipanti. Sarà presentato durante un evento speciale (data da confermare).",
        "Non serve alcuna esperienza di cinema o di recitazione: porta solo il tuo smartphone, le tue idee e la tua curiosità. Il laboratorio è gratuito, ma è necessario prenotare il posto.",
        "Vieni a raccontare la tua storia. Facciamo un film insieme! Per informazioni scrivi a info@italiandramauk.org.",
      ],
    },
    venues: [
      "Online introductory session. 22 January 2027, time TBC",
      "Online creative session. 12 February 2027, time TBC",
      "Glasgow, in person. 6 March 2027, 10:30am to 3:30pm",
      "Edinburgh, in person. 24 April 2027, 10:30am to 3:30pm",
    ],
    cover: "",
    poster: "/events/laboratori/parliamo-di-noi.jpg",
    gallery: [],
    tickets: {
      url: "https://www.eventbrite.co.uk/e/parliamo-di-noi-lets-talk-about-us-tickets-2004116101208",
      label: { en: "Free. Book your place on Eventbrite", it: "Gratuito. Prenota il tuo posto su Eventbrite" },
    },
    credits: {
      en: [
        { role: "Ages", name: "12 to 24" },
        { role: "Price", name: "Free, booking required" },
      ],
      it: [
        { role: "Età", name: "Dai 12 ai 24 anni" },
        { role: "Prezzo", name: "Gratuito, su prenotazione" },
      ],
    },
  },
  {
    slug: "laboratorio-aberdeen",
    kind: "workshop",
    year: 2025,
    status: "past",
    title: {
      en: "Theatre & Emotional Exploration Workshop",
      it: "Laboratorio di teatro e di esplorazione emotiva",
    },
    tagline: {
      en: "A journey within ourselves through theatre.",
      it: "Un viaggio dentro noi stessi attraverso il teatro.",
    },
    summary: {
      en: "An Aberdeen workshop in theatre and emotional exploration, open to native speakers and learners alike.",
      it: "Un laboratorio ad Aberdeen di teatro e di esplorazione emotiva, aperto a madrelingua e principianti.",
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
      en: "Commedia dell'Arte Workshop",
      it: "Laboratorio di Commedia dell'Arte",
    },
    tagline: {
      en: "Commedia dell'Arte arrives in Scotland.",
      it: "La commedia dell'arte sbarca in Scozia.",
    },
    summary: {
      en: "A Glasgow workshop bringing Commedia dell'Arte to Scotland, open to native speakers and learners alike.",
      it: "Un laboratorio a Glasgow che porta la Commedia dell'Arte in Scozia, aperto a madrelingua e principianti.",
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
      en: "Theatre Workshop, Edinburgh",
      it: "Laboratorio di Teatro, Edimburgo",
    },
    tagline: {
      en: "A first journey into the love of theatre.",
      it: "Un viaggio per cominciare ad amare il teatro.",
    },
    summary: {
      en: "An Edinburgh workshop to begin loving theatre, open to native speakers and learners alike.",
      it: "Un laboratorio a Edimburgo per cominciare ad amare il teatro, aperto a madrelingua e principianti.",
    },
    description: {
      en: ["TBD. Full programme to be confirmed by Eva."],
      it: ["TBD. Programma completo in attesa di conferma da Eva."],
    },
    venues: ["Edinburgh"],
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
