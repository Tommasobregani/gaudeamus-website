/**
 * Journal / news articles — seed content, bilingual.
 * Swap with CMS or MDX files whenever client is ready.
 */

export type Article = {
  slug: string;
  publishedAt: string; // ISO
  readingMinutes: number;
  category: { en: string; it: string };
  title: { en: string; it: string };
  excerpt: { en: string; it: string };
  body: { en: string[]; it: string[] };
  cover: string;
  author: string;
};

export const articles: Article[] = [
  {
    slug: "why-italian-culture-in-scotland",
    publishedAt: "2026-02-14",
    readingMinutes: 4,
    category: { en: "Manifesto", it: "Manifesto" },
    title: {
      en: "Why Italian culture still belongs in Scotland",
      it: "Perché la cultura italiana ha ancora un posto in Scozia",
    },
    excerpt: {
      en: "A short manifesto on italianism, diaspora, and the idea that culture is a conversation, not a museum.",
      it: "Un breve manifesto sull'italianismo, sulla diaspora e sull'idea che la cultura sia una conversazione, non un museo.",
    },
    body: {
      en: [
        "There is an old, tired way of talking about Italian culture abroad: pasta, opera, Renaissance, close the book. It is the museum version of italianism, and it is the version Gaudeamus refuses.",
        "Culture, in the only sense we find interesting, is what happens when two traditions are allowed to talk. Italian culture in Scotland is not something frozen in 1950s shop windows in Leith. It is a live argument between a Sicilian monologue and a Glasgow audience, between a Neapolitan grandmother and her Scottish-born grandchildren, between Dante and a Monday night open mic.",
        "Our work is to give that argument rooms. Sometimes the room is a theatre. Sometimes it is a community hall. Sometimes it is a long Christmas table. The room changes. The conversation is what we protect.",
      ],
      it: [
        "C'è un modo vecchio e stanco di parlare della cultura italiana all'estero: pasta, opera, Rinascimento, chiusi il libro. È la versione museo dell'italianismo, ed è la versione che Gaudeamus rifiuta.",
        "La cultura, nel solo senso che troviamo interessante, è ciò che accade quando due tradizioni si parlano davvero. La cultura italiana in Scozia non è qualcosa di congelato nelle vetrine anni '50 di Leith. È una discussione viva tra un monologo siciliano e una platea di Glasgow, tra una nonna napoletana e i suoi nipoti nati scozzesi, tra Dante e un lunedì sera di open mic.",
        "Il nostro lavoro è dare stanze a questa discussione. A volte la stanza è un teatro. A volte una sala di comunità. A volte una lunga tavolata di Natale. La stanza cambia. Ciò che proteggiamo è la conversazione.",
      ],
    },
    cover: "/events/no-shakespeare/no-shakespeare-02.jpg",
    author: "Gaudeamus editorial",
  },
  {
    slug: "notes-on-no-shakespeare",
    publishedAt: "2026-01-22",
    readingMinutes: 3,
    category: { en: "Production notes", it: "Note di produzione" },
    title: {
      en: "Notes on No Shakespeare",
      it: "Appunti su No Shakespeare",
    },
    excerpt: {
      en: "What we learned from staging an Italian theatre night that deliberately refused the bard.",
      it: "Cosa abbiamo imparato mettendo in scena una serata di teatro italiano che ha deliberatamente rifiutato il bardo.",
    },
    body: {
      en: [
        "The hardest part of staging No Shakespeare was not the absence of Shakespeare. It was the absence of the excuse of Shakespeare. Without a canonical safety net, we had to say — clearly, in both languages — what Italian theatre is, and what it is not.",
        "We landed on three answers. Italian theatre is physical. Italian theatre is oral. Italian theatre is, almost always, political even when it thinks it is not. We built the evening around those three axes and let the commedia dell'arte do what it has always done best: hold a mirror up to whichever society is watching.",
        "The Aberdeen audience laughed before the Glasgow one did. The Glasgow audience stayed later. Both, in different ways, told us we were onto something.",
      ],
      it: [
        "La parte più difficile di mettere in scena No Shakespeare non è stata l'assenza di Shakespeare. È stata l'assenza della scusa di Shakespeare. Senza una rete di sicurezza canonica, abbiamo dovuto dire — chiaramente, in entrambe le lingue — cos'è il teatro italiano e cosa non è.",
        "Siamo arrivati a tre risposte. Il teatro italiano è fisico. Il teatro italiano è orale. Il teatro italiano è, quasi sempre, politico anche quando pensa di non esserlo. Abbiamo costruito la serata intorno a questi tre assi e abbiamo lasciato che la commedia dell'arte facesse ciò che ha sempre fatto meglio: tenere uno specchio alla società che guarda.",
        "Il pubblico di Aberdeen ha riso prima di quello di Glasgow. Il pubblico di Glasgow è rimasto più a lungo. Entrambi, a modo loro, ci hanno detto che eravamo sulla strada giusta.",
      ],
    },
    cover: "/events/no-shakespeare/no-shakespeare-04.jpg",
    author: "Artistic direction",
  },
  {
    slug: "on-bilingual-audiences",
    publishedAt: "2025-12-10",
    readingMinutes: 5,
    category: { en: "Essay", it: "Saggio" },
    title: {
      en: "On making theatre for a bilingual audience",
      it: "Sul fare teatro per un pubblico bilingue",
    },
    excerpt: {
      en: "You do not translate the evening. You compose it, like a piece of music with two voices.",
      it: "Non si traduce la serata. La si compone, come un brano a due voci.",
    },
    body: {
      en: [
        "The first temptation of a bilingual production is to translate everything. Subtitle the Italian. Translate the Scottish. Meet in the safe middle ground where nobody is confused and, incidentally, nobody is moved either.",
        "Our Gaudeamus approach is the opposite. We compose the evening like a score: moments in Italian that do not need translation, moments in English that carry the argument, moments where both languages speak at once and the ear has to choose. The audience is trusted. It is almost always the right call.",
        "A non-Italian audience does not need to catch every word to catch the feeling. A native Italian audience does not need the familiar cadences softened into English. The honest thing is to let both audiences work a little — and to reward the work with something they could not have got monolingually.",
      ],
      it: [
        "La prima tentazione di una produzione bilingue è tradurre tutto. Sottotitolare l'italiano. Tradurre lo scozzese. Incontrarsi a metà strada nel terreno sicuro in cui nessuno è confuso e, incidentalmente, nemmeno commosso.",
        "L'approccio Gaudeamus è opposto. Componiamo la serata come uno spartito: momenti in italiano che non hanno bisogno di traduzione, momenti in inglese che portano l'argomento, momenti in cui le due lingue parlano insieme e l'orecchio deve scegliere. Ci si fida del pubblico. Quasi sempre è la scelta giusta.",
        "Un pubblico non italiano non ha bisogno di cogliere ogni parola per cogliere il sentimento. Un pubblico italofono non ha bisogno di cadenze familiari ammorbidite in inglese. La cosa onesta è lasciare che entrambi i pubblici lavorino un po' — e premiare quel lavoro con qualcosa che in una lingua sola non avrebbero potuto ricevere.",
      ],
    },
    cover: "/events/wander-fool-word/wander-fool-word-02.jpg",
    author: "Artistic direction",
  },
];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
