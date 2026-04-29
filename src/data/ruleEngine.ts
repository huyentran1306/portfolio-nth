export interface Rule {
  id: string
  name: string
  condition: {
    minSpend?: number
    maxSpend?: number
    campaignRequired?: boolean
    tier?: string[]
    category?: string[]
  }
  rewardType: 'multiplier' | 'flat' | 'bonus'
  rewardValue: number
  priority: number
  description: string
}

export const ruleEngineRules: Rule[] = [
  {
    id: 'r1',
    name: 'VIP Tier Multiplier',
    condition: { tier: ['Gold', 'Platinum'], minSpend: 0 },
    rewardType: 'multiplier',
    rewardValue: 2,
    priority: 10,
    description: 'Gold/Platinum members earn 2× points on all spend',
  },
  {
    id: 'r2',
    name: 'Campaign Bonus',
    condition: { campaignRequired: true, minSpend: 50 },
    rewardType: 'bonus',
    rewardValue: 100,
    priority: 8,
    description: 'Active campaign: earn +100 bonus points for spend ≥ $50',
  },
  {
    id: 'r3',
    name: 'High Spender Flat Bonus',
    condition: { minSpend: 200 },
    rewardType: 'flat',
    rewardValue: 500,
    priority: 6,
    description: 'Spend ≥ $200 in single transaction: earn 500 points flat',
  },
  {
    id: 'r4',
    name: 'Base Earn Rate',
    condition: { minSpend: 0 },
    rewardType: 'multiplier',
    rewardValue: 1,
    priority: 1,
    description: 'Base: 1 point per $1 spent',
  },
]

export interface SimulationInput {
  spendAmount: number
  campaignActive: boolean
  tier: string
}

export interface MatchedRule {
  rule: Rule
  applied: boolean
  reason: string
  pointsAdded: number
}

export interface SimulationResult {
  matchedRules: MatchedRule[]
  totalPoints: number
  breakdown: string
}

export function simulateRuleEngine(input: SimulationInput): SimulationResult {
  const { spendAmount, campaignActive, tier } = input

  const sortedRules = [...ruleEngineRules].sort((a, b) => b.priority - a.priority)

  const matchedRules: MatchedRule[] = []
  let basePoints = spendAmount
  let multiplier = 1
  let bonusPoints = 0

  for (const rule of sortedRules) {
    const c = rule.condition
    const meetsSpend = c.minSpend !== undefined ? spendAmount >= c.minSpend : true
    const meetsCampaign = c.campaignRequired ? campaignActive : true
    const meetsTier = c.tier ? c.tier.includes(tier) : true

    if (meetsSpend && meetsCampaign && meetsTier) {
      let pointsAdded = 0
      if (rule.rewardType === 'multiplier') {
        if (rule.id === 'r1') {
          multiplier = Math.max(multiplier, rule.rewardValue)
          pointsAdded = spendAmount * (rule.rewardValue - 1)
        } else {
          pointsAdded = spendAmount * rule.rewardValue
        }
      } else if (rule.rewardType === 'bonus') {
        bonusPoints += rule.rewardValue
        pointsAdded = rule.rewardValue
      } else if (rule.rewardType === 'flat') {
        bonusPoints += rule.rewardValue
        pointsAdded = rule.rewardValue
      }
      matchedRules.push({ rule, applied: true, reason: 'All conditions met', pointsAdded })
    } else {
      const reasons = []
      if (!meetsSpend) reasons.push(`spend $${spendAmount} < required $${c.minSpend}`)
      if (!meetsCampaign) reasons.push('no active campaign')
      if (!meetsTier) reasons.push(`tier "${tier}" not in [${c.tier?.join(', ')}]`)
      matchedRules.push({ rule, applied: false, reason: reasons.join('; '), pointsAdded: 0 })
    }
  }

  const totalPoints = Math.floor(basePoints * multiplier + bonusPoints)

  return {
    matchedRules,
    totalPoints,
    breakdown: `${spendAmount} base × ${multiplier} multiplier + ${bonusPoints} bonus = ${totalPoints} pts`,
  }
}
