export type StaffMember = {
  name: string;
  role: { en: string; it: string };
  city: string;
  bio: { en: string; it: string };
};

// Placeholder bios — client will replace with real team.
export const staff: StaffMember[] = [
  {
    name: "Artistic Director",
    role: { en: "Artistic Director", it: "Direzione artistica" },
    city: "Aberdeen",
    bio: {
      en: "Leads the artistic vision of Gaudeamus. Full biography coming soon.",
      it: "Guida la visione artistica di Gaudeamus. Biografia completa in arrivo.",
    },
  },
  {
    name: "Managing Director",
    role: { en: "Managing Director", it: "Direzione esecutiva" },
    city: "Aberdeen",
    bio: {
      en: "Runs operations, partnerships and production across Scotland. Full biography coming soon.",
      it: "Coordina operazioni, partnership e produzione in Scozia. Biografia completa in arrivo.",
    },
  },
  {
    name: "Community Lead",
    role: { en: "Community Lead — Glasgow", it: "Responsabile comunità — Glasgow" },
    city: "Glasgow",
    bio: {
      en: "Builds the Glasgow community programme. Full biography coming soon.",
      it: "Costruisce il programma di comunità a Glasgow. Biografia completa in arrivo.",
    },
  },
  {
    name: "Education & Language",
    role: { en: "Education & Language", it: "Educazione & lingua" },
    city: "Aberdeen",
    bio: {
      en: "Designs language workshops and educational partnerships. Full biography coming soon.",
      it: "Progetta laboratori di lingua e partnership educative. Biografia completa in arrivo.",
    },
  },
];
