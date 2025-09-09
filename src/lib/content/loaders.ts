import sets from "./data/sets.json" assert { type: "json" };
import characters from "./data/characters.json" assert { type: "json" };
import slashers from "./data/slashers.json" assert { type: "json" };
import type { SetSummary, CharacterSummary, SlasherSummary } from "./types";

export function getSets(): SetSummary[] {
  return sets as SetSummary[];
}

export function getSet(slug: string): SetSummary | undefined {
  return (sets as SetSummary[]).find((s) => s.slug === slug);
}

export function getCharacters(): CharacterSummary[] {
  return characters as CharacterSummary[];
}

export function getCharacter(slug: string): CharacterSummary | undefined {
  return (characters as CharacterSummary[]).find((c) => c.slug === slug);
}

export function getSlashers(): SlasherSummary[] {
  return slashers as SlasherSummary[];
}

export function getSlasher(slug: string): SlasherSummary | undefined {
  return (slashers as SlasherSummary[]).find((s) => s.slug === slug);
}

