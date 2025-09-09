export type SetSummary = {
  slug: string;
  title: string;
  release?: string;
  difficulty?: string;
  theme?: string[];
};

export type CharacterSummary = {
  slug: string;
  name: string;
  archetype: string;
  complexity?: string;
  synergy?: string[];
};

export type SlasherSummary = {
  slug: string;
  name: string;
  threatTier?: string;
  agendaSpeed?: string;
  tells?: string[];
};

