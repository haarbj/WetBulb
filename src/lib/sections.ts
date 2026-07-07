export type Category = {
  slug: string;
  title: string;
  mission: string;
};

export const categories: Category[] = [
  {
    slug: "foundations",
    title: "Foundations",
    mission:
      "Who this is for, and the core beliefs that shape everything else here.",
  },
  {
    slug: "the-science",
    title: "The Science",
    mission:
      "First-principles physiology, research, and the data behind good training.",
  },
  {
    slug: "coaching-and-training",
    title: "Coaching & Training",
    mission:
      "Structured systems, workouts, and plans drawn from proven coaching methods.",
  },
  {
    slug: "mind-and-recovery",
    title: "Mind & Recovery",
    mission:
      "The mental game and the recovery practices that sustain long-term progress.",
  },
  {
    slug: "writing-and-resources",
    title: "Writing & Resources",
    mission: "Long-form essays and curated references for continued learning.",
  },
  {
    slug: "tools",
    title: "Tools",
    mission:
      "Interactive calculators for training, pacing, and race-day conditions.",
  },
];

export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type Section = {
  slug: string;
  title: string;
  mission: string;
  topics: string[];
  category: string;
  content?: ContentBlock[];
};

export const sections: Section[] = [
  {
    slug: "about",
    title: "About",
    mission:
      "My journey as a Division I runner, marathoner, lifelong student of the sport, and coach.",
    topics: [
      "Division I background",
      "Marathon focus",
      "Coaching and mentorship",
    ],
    category: "foundations",
  },
  {
    slug: "training-philosophy",
    title: "Training Philosophy",
    mission:
      "Core beliefs about endurance development through patience, consistency, and first-principles thinking.",
    topics: [
      "Individualization",
      "Long-term development",
      "Decision frameworks",
    ],
    category: "foundations",
    content: [
      { type: "heading", text: "Five Principles, Not a Formula" },
      {
        type: "paragraph",
        text: "Good training isn't a set of numbers copy-pasted from one athlete to the next — it's principles applied to a specific person. Five matter most:",
      },
      {
        type: "list",
        items: [
          "Miles in the bank — build the aerobic base before anything else, since every other system trains on top of it.",
          "Feeling-based effort — train by what an effort actually costs your body, not just by the watch.",
          "Response-regulated recovery — let how you're adapting dictate the next session, not a fixed schedule.",
          "Sequential development — speed sits on top of intervals, which sits on top of strength, which sits on top of endurance.",
          "Correct timing — build the whole plan backward from the goal race, not forward from today.",
        ],
      },
      { type: "heading", text: "Breath, Blood, and Brain" },
      {
        type: "paragraph",
        text: "I coach three things: the breath, the blood, and the brain — not the muscles. Most coaching in the U.S. trains until the muscles fail. I'd rather build the aerobic engine (breath, blood) and the mental game (brain) than chase muscular fatigue for its own sake. That takes longer to show results — usually 7 to 10 years for it to fully show up in a runner — which is exactly why patience is part of the philosophy, not separate from it.",
      },
      { type: "heading", text: "Footwear and Technique Aren't an Afterthought" },
      {
        type: "paragraph",
        text: "Lydiard treated running form as a skill to be taught, not something everyone arrives with. Even his most gifted athletes worked on technique — running tall, relaxed arms, a quick leg turnover — before layering on volume. He wanted shoes that interfered with the foot as little as possible: flexible enough to function \"like a second layer of skin,\" with no built-up heel, because an elevated heel creates instability a flat sole doesn't. He was skeptical of orthotics (\"the orthotics are for the shoes, not the feet\") and dead set against running with hand weights, since anything that adds tension undercuts the relaxation that makes a stride efficient. None of this is really about barefoot running as a trend — minimalist footwear and hard-surface training predate that label by decades. It's a belief that the foot should be left to do its job, and that good form has to be practiced deliberately, not assumed.",
      },
    ],
  },
  {
    slug: "the-philosophy-of-running",
    title: "The Philosophy of Running",
    mission:
      "Long-form essays on meaning, mastery, suffering, purpose, and character in the running life.",
    topics: ["Mastery", "Identity", "Purpose"],
    category: "foundations",
    content: [
      { type: "heading", text: "One More Step" },
      {
        type: "paragraph",
        text: "Cliff Cushman was a 400m hurdler who won Olympic silver in Rome in 1960 and spent the next four years chasing gold. At the 1964 Olympic Trials, he fell on the fifth hurdle and missed the team. Instead of retreating from it, he wrote an open letter to his hometown newspaper, addressed to the young people who might have watched him fall on television. He didn't want their sympathy — he wanted them to set their own goals and pursue them with the same honesty he'd brought to running: \"get up, pick the cinders out of your wounds, and take one more step.\" Cushman was declared missing in action over Vietnam two years later, and officially declared dead in 1975. The letter outlived him, and it's still shared for the same reason he wrote it — not because falling doesn't cost you something, but because what you do immediately after is the only part still in your control.",
      },
    ],
  },
  {
    slug: "exercise-physiology",
    title: "Exercise Physiology",
    mission:
      "First-principles explanations of VO₂ max, threshold, fatigue, adaptation, and biomechanics.",
    topics: ["Energy systems", "Muscle fibers", "Recovery biology"],
    category: "the-science",
    content: [
      { type: "heading", text: "Steady State and Oxygen Debt" },
      {
        type: "paragraph",
        text: "Every runner has a ceiling on how much oxygen they can take in, transport, and use per minute — Lydiard called this the Steady State. Run within it and you're aerobic; push past it and the body has to cover the shortfall anaerobically, building up an oxygen debt alongside lactic acid. That debt doesn't grow in a straight line — it roughly doubles, squares, then cubes as effort increases, which is why a small increase in pace can cost a disproportionate amount of endurance. A trained runner can tolerate somewhere around 15–18 liters of total oxygen debt before neuromuscular breakdown sets in. The practical upshot: raising your Steady State ceiling through aerobic work is what lets a previously hard pace become comfortably sustainable.",
      },
      { type: "heading", text: "Fast-Twitch, Slow-Twitch, and the Acid/Alkali Balance" },
      {
        type: "paragraph",
        text: "Slow-twitch (Type I) fibers run mostly on fat and thrive in a mildly alkaline system; fast-twitch Type IIA fibers lean on carbohydrate and generate more acid under load. The body's energy and hormonal systems work best in a narrow, mildly alkaline range (roughly pH 7.365–7.40), and high-intensity training pushes that balance toward acidic. That's the logic behind two ideas that show up throughout Lydiard-style programs: the harder your main sessions get, the more low-intensity recovery work you need to buffer it, and a serious volume of easy aerobic running can keep happening right up until a peak — because it doesn't fight against the acid load the way more hard sessions would.",
      },
    ],
  },
  {
    slug: "the-aerobic-base",
    title: "The Aerobic Base",
    mission:
      "Why aerobic fitness is the foundation of endurance performance and long-term progression.",
    topics: ["Mileage progression", "Easy running", "Durability"],
    category: "the-science",
    content: [
      { type: "heading", text: "The Adaptation Curve" },
      {
        type: "paragraph",
        text: "Every workout is a stress that temporarily makes you less fit, not more — fatigue shows up first, and fitness only rebounds during the recovery that follows, often landing slightly above where you started. That's super-compensation, and it's the whole mechanism behind why training works. Push too hard or rest too little and the curve never gets the chance to rebound: training success = moderate stress + adequate rest.",
      },
      { type: "heading", text: "Why Miles in the Bank Actually Works" },
      {
        type: "paragraph",
        text: "Oxygen acts as a catalyst for the aerobic system; the anaerobic system, by contrast, is muscles with molecules sitting around waiting for oxygen that hasn't arrived. Building the aerobic engine means growing more capillaries into working muscle, adding mitochondria, and developing the enzymatic pathways that convert oxygen to usable energy — and none of it happens on one run. The body's development shifts at defined points during sustained aerobic effort, roughly 20, 30, 55, 90, 120, 150, and 180 minutes in, which is part of why long, easy running does something shorter running can't replicate. Build the capillaries, then rest — the growth happens during recovery, not the run itself.",
      },
    ],
  },
  {
    slug: "research-library",
    title: "Research Library",
    mission:
      "Summaries of books, papers, and historical methods that shaped distance running knowledge.",
    topics: ["Scientific papers", "Coaching texts", "Emerging research"],
    category: "the-science",
    content: [
      {
        type: "heading",
        text: "Polarized Training: What Elite Endurance Athletes Actually Do",
      },
      {
        type: "paragraph",
        text: "Sports scientist Stephen Seiler's research on Olympic gold medalists found their training wasn't evenly split across intensities — it was heavily polarized. A 2014 study of 12 cross-country skiing and biathlon gold medalists found roughly 90% of training volume was done at low intensity, with only a small fraction spent at threshold or above, even in the weeks leading directly into the Games (Tønnessen et al., PLOS ONE, 2014, \"The Road to Gold\"). A published breakdown of Eliud Kipchoge's training log in the 41 days before his 2017 Berlin Marathon world-record attempt showed the same pattern at the individual-session level: 34 of 59 sessions were easy runs, with only a handful of tempo, fartlek, or track sessions mixed in.",
      },
      {
        type: "heading",
        text: "Does the Order of Intensity Progression Matter?",
      },
      {
        type: "paragraph",
        text: "A 2016 study in Medicine & Science in Sports & Exercise (Bossi et al.) tested three ways of sequencing interval training over a 12-week cycle with well-trained cyclists — one group progressed from long, less-intense intervals toward short, harder ones, one did the reverse, and one mixed all three lengths throughout. All three groups improved similarly in power output and VO₂ peak, with no significant difference between approaches. The takeaway isn't that sequencing is irrelevant — it's that consistent, well-recovered interval work matters more than finding one correct order to build it in.",
      },
      { type: "heading", text: "Rating of Perceived Exertion (the Borg Scale)" },
      {
        type: "paragraph",
        text: "Long before GPS watches, physiologist Gunnar Borg proposed in 1960 that how hard an effort feels correlates closely with what a machine would measure — closely enough that perceived effort is, by itself, a reliable training guide. His scale runs from 6 (\"very, very light\") to 20 (\"very, very hard\"), and multiplying the rating by ten gives a rough estimate of heart rate at that effort. It's the scientific basis for pace-by-feel training: if you can hold a conversation, you're in the aerobic range that builds a base.",
      },
    ],
  },
  {
    slug: "data-and-analytics",
    title: "Data & Analytics",
    mission:
      "Use heart rate, pace, and training data to support sound coaching judgment.",
    topics: ["Training zones", "Race analytics", "Technology with context"],
    category: "the-science",
  },
  {
    slug: "coaching-library",
    title: "Coaching Library",
    mission:
      "Comparative study of influential coaching systems and shared principles across eras.",
    topics: ["Lydiard", "Daniels", "Canova and modern systems"],
    category: "coaching-and-training",
    content: [
      { type: "heading", text: "The Lydiard System" },
      {
        type: "paragraph",
        text: "Arthur Lydiard's system came out of Auckland, New Zealand, and produced Olympic medalists Peter Snell and John Davies. The core premise: most runners lack endurance, not speed, and the aerobic base has to be built before anything else is layered on top of it — a structural bet that shows up clearly against Daniels' more VO2max-and-pace-zone-driven system and Canova's higher-intensity marathon-specific blocks. All three systems agree endurance matters; they disagree on how much of training should be spent building it versus sharpening it.",
      },
      { type: "heading", text: "The Pyramid" },
      {
        type: "paragraph",
        text: "Lydiard structured training as a pyramid: three to six months of aerobic conditioning at the base, then four-week blocks of hill strength, interval training, and speed and skills work, finishing with a three-to-four-week taper into the goal race. The wider the base, the higher the peak it can support.",
      },
      { type: "heading", text: "Identical Workouts, Different Outcomes" },
      {
        type: "paragraph",
        text: "At the '64 Tokyo Olympics, Lydiard's athletes ran a hard session of 20 quarter-miles. The next day, a rival Canadian runner watched them, then ran the exact same session himself. Asked what he thought of it, Lydiard said, \"I think it was the last nail in his coffin.\" His own athletes had needed that session; the Canadian didn't — he missed his event's final while Snell and Davies medaled. Good training and bad training can look identical on paper. What matters is whether that specific athlete needed it.",
      },
      { type: "heading", text: "How Peter Snell Trained for a World Record" },
      {
        type: "paragraph",
        text: "In 1962, Peter Snell — coached by Lydiard — built up to a 100-mile training week, ran hill circuits, and logged long aerobic runs up to 22 miles, all in the months before he broke the world mile record (3:54.4) and, weeks later, the 880-yard world record. He wasn't doing marathon-specific training; he was an 800/1500m runner. But the aerobic capacity built through that volume is what let him hold his speed deep into a race when it mattered most.",
      },
      { type: "heading", text: "Same Ingredients, Different Distances" },
      {
        type: "paragraph",
        text: "Lydiard's own explanation for why he had milers run marathon-length long runs rather than piling on track intervals: speed is common — plenty of runners can manage a single fast quarter-mile — but almost none can hold that pace for four in a row. His view was that stamina, not raw speed, was the real limiter for most runners, and that endurance built through volume translated directly into the ability to finally use the speed they already had, right when the race demanded it.",
      },
    ],
  },
  {
    slug: "marathon-training",
    title: "Marathon Training",
    mission:
      "Structured marathon cycles with practical frameworks for workouts, fueling, tapering, and race execution.",
    topics: ["Workouts", "Fueling", "Race strategy"],
    category: "coaching-and-training",
    content: [
      { type: "heading", text: "Racing the Last 25%" },
      {
        type: "paragraph",
        text: "A more useful question than pace splits: how long can this athlete actually think clearly under race stress? Mental fatigue tends to hit early, so if all the concentration gets spent in the first mile, there's nothing left for the finish. The fix is to bookend the effort — a controlled open, a quiet middle third that conserves mental energy, and a hard, deliberate close — decided before the start. Changing strategy mid-race rarely works.",
      },
      { type: "heading", text: "Race-Day Checklist" },
      {
        type: "list",
        items: [
          "Eat normally in the days beforehand — protein, carbs, and fat are all part of a balanced pre-race diet; finish your last full meal about three hours before the start.",
          "Lace your shoes with your heel forced back into the shoe first, snug but not tight — loose lacing is what causes blistering.",
          "Start conservatively and warm into the effort. Going out too fast early costs far more than it can ever gain back.",
          "On hot days, drink water and electrolytes throughout the race, not just at the start — and keep your body wet. Sponging is one of the simplest defenses against overheating.",
          "Don't surge mid-race. Every surge spends energy you don't get back.",
        ],
      },
    ],
  },
  {
    slug: "workout-library",
    title: "Workout Library",
    mission:
      "Workout references organized by objective, adaptation target, and training phase.",
    topics: ["Aerobic sessions", "Threshold sessions", "Specificity"],
    category: "coaching-and-training",
    content: [
      { type: "heading", text: "Dialing In a Tempo Run" },
      {
        type: "paragraph",
        text: "A tempo run works best around 20–24 minutes of sustained effort, held at roughly a 6 out of 10 perceived effort — hard enough to be real work, controlled enough that you could keep going if you had to. Struggling to hold pace past 7–9 minutes in is the signal to back off, not push through: the point is time spent at the right intensity, not a number on the watch. Full duration at the correct effort beats redlining for half the time, usually within months.",
      },
      { type: "heading", text: "Hill Circuit Training" },
      {
        type: "paragraph",
        text: "Find a hill graded around 1-in-3, with a flat stretch at the bottom for sprint work. After warming up, spring up the hill with a bouncing action, using your own body weight as resistance rather than just lifting the knees higher. Jog for about three minutes at the top, then stride back down fast to develop leg speed. At the bottom, run a few windsprints (50–400m) before starting the next lap. Repeat for about an hour, three days a week, alternating with dedicated leg-speed days.",
      },
      { type: "heading", text: "Leg-Speed Repetitions" },
      {
        type: "paragraph",
        text: "On a flat or gently sloped stretch of 120–150 meters, run it ten times with a full three-minute recovery between each rep. The only thing to focus on is turning the legs over as fast as possible — not stride length. It can feel unproductive at first; results typically show up after four to six weeks of consistent work.",
      },
    ],
  },
  {
    slug: "5k-training",
    title: "5K Training",
    mission:
      "Structured 5K and cross country training built for the distances high school and collegiate racers actually run — periodization, pacing, and race-week execution.",
    topics: ["Track periodization", "Race-week schedule", "Pacing"],
    category: "coaching-and-training",
    content: [
      { type: "heading", text: "Building Toward the Track Season" },
      {
        type: "paragraph",
        text: "Lydiard broke a track buildup into three phases. The first four weeks focus on anaerobic and speed development — hard running totaling around three miles per session (whether that's 12x400m, 6x600m, or similar), always with at least a day of recovery between hard efforts, alternating with dedicated sprint-technique days. The next four and a half weeks shift to coordination: a weekly sharpening session of short, fast accelerations, a time trial near race distance to diagnose weaknesses, and a development race or two. The final ten days are for freshening up — small volume, short efforts, legs kept fresh rather than fatigued going into the goal race.",
      },
      { type: "heading", text: "Non-Race Week" },
      {
        type: "list",
        items: [
          "Repetitions early in the week to develop anaerobic capacity.",
          "Aerobic running mid-week to hold the base.",
          "A time trial near race pace to check fitness and pacing.",
          "Fast relaxed striding to keep leg speed sharp.",
          "A second time trial later in the week.",
          "An aerobic run to close out the week and recover into the next cycle.",
        ],
      },
      { type: "heading", text: "Race Week" },
      {
        type: "list",
        items: [
          "Monday: windsprints.",
          "Tuesday: easy fartlek.",
          "Wednesday: a short time trial.",
          "Thursday: fast relaxed striding.",
          "Friday: an easy jog.",
          "Saturday: the race.",
          "Sunday: a long aerobic run.",
        ],
      },
    ],
  },
  {
    slug: "training-plans",
    title: "Training Plans",
    mission:
      "Progressive plans from beginner to elite for cross country, 5K, 10K, half marathon, and marathon.",
    topics: ["Beginner to elite", "Race-specific plans", "Progression"],
    category: "coaching-and-training",
    content: [
      { type: "heading", text: "From Zero to 20 Minutes: An 8-Week Start" },
      {
        type: "paragraph",
        text: "The Lydiard Foundation's beginner program is built on walk/jog intervals, three days a week, starting at just 15 minutes total. Each week, the jogging segments get slightly longer and the walking segments get shorter, with one slightly longer session built in on the third training day. By the end of eight weeks, most beginners are running 20 minutes continuously — not because the schedule pushed them there, but because the body adapts faster than most people expect once the stress is applied consistently and recovery days are respected.",
      },
      { type: "heading", text: "The Golden Rules" },
      {
        type: "list",
        items: [
          "Train, don't strain — you genuinely cannot run too slowly.",
          "It's not the distance that stops you, it's the speed. If in doubt, do less.",
          "If a week feels too hard, repeat it rather than pushing forward on schedule.",
          "Listen to your body over the plan on paper — the schedule is a guide, not an order.",
        ],
      },
      { type: "heading", text: "Finding Your Training Heart Rate" },
      {
        type: "paragraph",
        text: "A simple formula for an approximate training range: (220 minus your age, minus your resting heart rate) times 70%, plus your resting heart rate again — add 3 if you're a woman. Give yourself about five beats on either side of that number as your range. Treat it as a rough guideline, not gospel — how an effort feels should always override what a number on a screen says.",
      },
    ],
  },
  {
    slug: "sports-psychology",
    title: "Sports Psychology",
    mission:
      "How confidence, motivation, identity, and resilience shape championship performance.",
    topics: ["Mental toughness", "Intrinsic motivation", "Pressure management"],
    category: "mind-and-recovery",
    content: [
      { type: "heading", text: "The Mental Performance Plan" },
      {
        type: "paragraph",
        text: "A simple template worth filling out before a big race — not just once, but before every one:",
      },
      {
        type: "list",
        items: [
          "My team at its best",
          "Myself at my best",
          "To fear and pain",
          "Start",
          "First third",
          "Second third",
          "Final third",
          "Finish",
          "What matters",
        ],
      },
      {
        type: "paragraph",
        text: "Writing real answers to each turns vague nerves into something specific enough to act on.",
      },
      { type: "heading", text: "Keep a Log, Not a Comparison Tool" },
      {
        type: "paragraph",
        text: "The strongest predictor of long-term success isn't raw talent — it's having a coach, a team, and a training log. Write the week's goals at the top of each page, note anything that isn't going well plus your own best guess at a solution, and write down what went right and why. Apps that let you compare your splits against everyone else's turn your own training into someone else's competition. Keep the comparison out of it.",
      },
      { type: "heading", text: "Goal Setting" },
      {
        type: "paragraph",
        text: "Write the goal itself as a \"cloud\" — something not entirely in your control, like a time or a place. Then write the steps as things that ARE in your control. A goal only really takes hold when it's roughly 10% written down, 45% felt — the emotions attached to reaching it — and 45% visualized. Share it with people who will lift you up, not weigh it down.",
      },
      { type: "heading", text: "Mantras and Affirmations" },
      {
        type: "paragraph",
        text: "A real affirmation isn't a negated worry — \"I will not procrastinate\" doesn't function the same way in your head as \"I always do things on time.\" They work best positive, present tense, specific, and stated as already true. Think of the conscious mind as an ant riding an elephant, the subconscious: the ant can steer, but only by repeating the direction until the elephant actually turns.",
      },
      { type: "heading", text: "Ten Rules for the Long Game" },
      {
        type: "list",
        items: [
          "Take chances.",
          "Sleep often.",
          "Dream big.",
          "Be positive.",
          "Be nervous in a good way — it means it matters.",
          "The journey is what you're actually here for.",
          "Smile when a race hurts.",
          "Being alone is sometimes exactly what you need.",
          "Ask for help when you need it.",
          "Believe in belief, and believe in yourself.",
        ],
      },
      { type: "heading", text: "Five Things to Carry Into a Race" },
      {
        type: "list",
        items: [
          "Be happy in the moment and enjoy the process rather than waiting for results to justify it.",
          "Learn from defeats, but hold on to victories vividly.",
          "You can't control what happens mid-race, only your reaction to it.",
          "Keep affirmations and goals visible — see them daily.",
          "Visualize daily: write, read, visualize.",
        ],
      },
      { type: "heading", text: "The Wheel" },
      {
        type: "paragraph",
        text: "A team is a wheel, and each runner is a spoke — self-investment, goal setting, prioritizing, positive self-talk, and visualizing success. No spoke matters more than another, and the wheel only holds together if every spoke does its job. One spoke might reach the finish first, but without the others, the wheel doesn't arrive at all. There's no time to feel sorry for yourself mid-race — slowing down or waiting doesn't just cost you, it costs the team.",
      },
    ],
  },
  {
    slug: "recovery",
    title: "Recovery",
    mission:
      "Sustainable performance through sleep, nutrition, strength, mobility, and injury prevention.",
    topics: ["Sleep and stress", "Nutrition", "Injury prevention"],
    category: "mind-and-recovery",
    content: [
      { type: "heading", text: "Eat Without a Label" },
      {
        type: "paragraph",
        text: "If it's man-made, it's probably not good for you — the simplest nutrition rule that actually holds up. Eat whatever you want, as much as you want, as long as it doesn't have a label on it: fruits, vegetables, and meat, not processed food. Carbohydrates digest faster than protein or fat, which is why they belong before training or racing, not after. Complex carbs — rice, potatoes, pasta — provide longer-lasting energy than simple sugars. Unsaturated fats, liquid at room temperature, are the better everyday choice over saturated fats, solid at room temperature, though the body needs some of both, along with sugar and red meat in moderation. Papaya and pineapple are worth having on hand for sore muscles.",
      },
      { type: "heading", text: "Fueling Before You Race" },
      {
        type: "paragraph",
        text: "Eat 3–4 hours before a race — something carbohydrate-based, around 300–400 calories — and give it time to clear, since digestion competes with running muscles for blood flow. For early starts where a full meal isn't practical, liquid calories (100–200 calories) digest faster and sit better than solid food. Test the routine in training first, not on race morning.",
      },
      { type: "heading", text: "Hydration" },
      {
        type: "paragraph",
        text: "A simple daily target: water need in ounces equals body weight in pounds divided by two. Sip through the day — aim for at least one sip every 20 minutes — rather than trying to catch up all at once.",
      },
    ],
  },
  {
    slug: "articles",
    title: "Articles",
    mission:
      "Educational writing that connects physiology, psychology, and philosophy to practical training.",
    topics: ["Deep dives", "Practical lessons", "Applied theory"],
    category: "writing-and-resources",
  },
  {
    slug: "resources",
    title: "Resources",
    mission:
      "Curated books, podcasts, tools, and references for lifelong learning in the sport.",
    topics: ["Reading list", "Tools", "External references"],
    category: "writing-and-resources",
    content: [
      { type: "heading", text: "Foundational Reading" },
      {
        type: "list",
        items: [
          "Run to the Top / Running to the Top — Arthur Lydiard",
          "Jogging with Arthur Lydiard — Arthur Lydiard",
          "Healthy Intelligent Training — Keith Livingstone",
          "Daniels' Running Formula — Jack Daniels",
          "On the Wings of Mercury — Lorraine Moller",
          "\"The Basics of Jogging\" — Dr. George Sheehan",
        ],
      },
      { type: "heading", text: "Where the Physiology Comes From" },
      {
        type: "paragraph",
        text: "Much of the research referenced on this site traces back to Stephen Seiler's work at the University of Agder on training-intensity distribution in elite endurance athletes, including the 2014 PLOS ONE study \"The Road to Gold.\" See the Research Library for the specific findings.",
      },
    ],
  },
  {
    slug: "contact",
    title: "Contact",
    mission:
      "Reach out for coaching questions, collaborations, speaking, and long-term development support.",
    topics: ["Coaching inquiries", "Collaborations", "Speaking"],
    category: "writing-and-resources",
  },
  {
    slug: "heat-tracker",
    title: "Heat Tracker",
    mission:
      "Live WBGT readings and a 48-hour outlook to help you plan safe training around heat.",
    topics: ["WBGT estimate", "48-hour outlook", "ACSM flag guidance"],
    category: "tools",
  },
];

export const sectionMap = new Map(
  sections.map((section) => [section.slug, section]),
);

export const categoryMap = new Map(
  categories.map((category) => [category.slug, category]),
);

export function sectionsInCategory(categorySlug: string): Section[] {
  return sections.filter((section) => section.category === categorySlug);
}
