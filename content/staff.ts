export type StaffMember = {
  name: string;
  role: { en: string; it: string };
};

export const staff: StaffMember[] = [
  {
    name: "Domenico Serino",
    role: { en: "Chair", it: "Presidente" },
  },
  {
    name: "Eva D'Amico",
    role: { en: "Artistic Director", it: "Direttore Artistico" },
  },
  {
    name: "Elena Pampana",
    role: { en: "Treasurer", it: "Tesoriere" },
  },
  {
    name: "Erika Boetto",
    role: { en: "Secretary", it: "Segretario" },
  },
  {
    name: "Sacha Fop",
    role: { en: "Secretary", it: "Segretario" },
  },
];
