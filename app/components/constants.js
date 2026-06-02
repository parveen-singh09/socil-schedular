// Platform configuration constants
export const PLATFORMS = {
  twitter: { name: "Twitter / X", limit: 280, colorClass: "twitter-blue", icon: "X" },
  linkedin: { name: "LinkedIn", limit: 3000, colorClass: "linkedin-blue", icon: "in" },
  instagram: { name: "Instagram", limit: 2200, colorClass: "instagram-pink", icon: "ig" },
};

// AI post mock templates based on tone and platform
export const MOCK_AI_TEMPLATES = {
  professional: {
    twitter: (topic) =>
      `Focusing on ${topic} is key for scaling modern engineering. Clear strategies yield reliable speed gains. What has been your primary bottleneck in this phase?`,
    linkedin: (topic) =>
      `Efficiency in product engineering starts with strong foundations.\n\nOur latest deep-dive on ${topic} highlights three actionable strategies for developers:\n1. Establish strict boundaries for API payloads.\n2. Leverage client-side caching safely.\n3. Minimize payload delivery size.\n\nApplying these principles significantly reduces time-to-first-byte while protecting compute resources.`,
    instagram: (topic) =>
      `Optimizing ${topic} changes the developer experience entirely. Engineering teams need standard metrics to evaluate progression. Let's build stable systems.`,
  },
  witty: {
    twitter: (topic) =>
      `Spent 6 hours debugging ${topic} only to realize it was a missing semi-colon. Nature is healing, code is running, coffee is empty. ☕⚡`,
    linkedin: (topic) =>
      `Unpopular engineering opinion: most systems fail not because of architecture, but because we spent 4 weeks discussing ${topic} instead of pushing clean code.\n\nLet's focus on shipping clean, modular increments. The users will thank us.`,
    instagram: (topic) =>
      `When you finally solve ${topic} without breaking a single other component. It's time to celebrate with caffeine.`,
  },
  hype: {
    twitter: (topic) =>
      `The future of software is happening right now. Master ${topic} and watch your delivery velocity explode. Let's make massive strides today! 🚀`,
    linkedin: (topic) =>
      `Never stop learning. The developers who command the next decade are mastering ${topic} today.\n\nIt is not about doing everything; it is about excelling at the core design primitives that stand the test of relative technical shifts.\n\nJoin our community cohort to get early builder access. Let's construct together!`,
    instagram: (topic) =>
      `Push the boundaries of design. Mastering ${topic} unlocks clean performance that sets standard experiences apart. Elevate your craft!`,
  },
  informative: {
    twitter: (topic) =>
      `Quick tip on ${topic}: modular components should do exactly one thing. High cohesion, low coupling. Your future self will appreciate it.`,
    linkedin: (topic) =>
      `A structured breakdown of ${topic} for technical leads:\n\n- Why it matters: Prevents scope degradation.\n- Common pitfall: Adding premature abstractions.\n- Remediation: Refactor only when patterns emerge thrice.\n\nKeep standard components documented and review codebases frequently for technical debt reduction.`,
    instagram: (topic) =>
      `Understanding ${topic}: The ultimate layout block checklist. Follow for weekly dev tips.`,
  },
  casual: {
    twitter: (topic) =>
      `Just thinking about ${topic} this morning. It's crazy how much has changed in a few short years. What's your current stack?`,
    linkedin: (topic) =>
      `Hey network - spent some time refactoring ${topic} this week and had some interesting breakthroughs.\n\nSometimes going back to simple vanilla solutions is far more robust than dragging in giant multi-layered libraries.\n\nHow do you handle these code cleanup reviews in your daily schedules?`,
    instagram: (topic) =>
      `Working on ${topic} updates today. Keeping the desktop organized and the styling clean. Hope everyone has an outstanding week!`,
  },
};

export const SUGGESTIONS = [
  "Why static site generation (SSG) is crucial for search engine optimization and speed.",
  "Reflections on launching our new developer productivity tools live this week.",
  "5 design tokens you should include in every vanilla CSS configuration.",
  "Why secure database architectures rely on Backend-for-Frontend patterns.",
];

export function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
