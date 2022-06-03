import { DndDice, Monster } from '../models'

// helpers for rendering stats
export function avgHP(HP: DndDice) {
  return Math.floor(HP.HD * ((HP.type + 1) / 2) + HP.modifier)
}

export function avgRoll(count: number, dice: number) {
  if (dice === 1) return count

  return Math.floor(count * ((dice + 1) / 2))
}

export function statModifier(score: number) {
  return Math.floor((score - 10) / 2)
}

export function renderModifier(score: number): string {
  return renderBonus(statModifier(score))
}

export function saveModifier(score: number, proficiency: number) {
  return statModifier(score) + proficiency
}

export function saveModifierForStat(
  monster: Monster,
  stat: keyof typeof monster.stats
) {
  if (monster.saves[stat].override) {
    return monster.saves[stat].overrideValue
  } else {
    return (
      statModifier(monster.stats[stat]) +
      (monster.saves[stat].proficient ? monster.proficiency : 0)
    )
  }
}

export function renderBonus(number: number, spaces = false) {
  return `${spaces ? ' ' : ''}${number >= 0 ? '+' : ''}${
    spaces ? ' ' : ''
  }${number}`
}
