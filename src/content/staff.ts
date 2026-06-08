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
    role: { en: "Treasurer · Trustee", it: "Tesoriera · Trustee" },
  },
  {
    name: "Erika Boetto",
    role: { en: "Secretary · Trustee", it: "Segretaria · Trustee" },
  },
  {
    name: "Sacha Fop",
    role: { en: "Secretary · Trustee", it: "Segretario · Trustee" },
  },
];
