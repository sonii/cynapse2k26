export interface Event {
  id: string;
  name: string;
  tagline: string;
  category: "technical" | "non-technical";
  icon: string;
  image: string;
  overview: string;
  requirements: string[];
  contacts: {
    name: string;
    phone: string;
  }[];
  registerLink: string;
  busRouteLink: string;
}

export const events: Event[] = [
  {
    id: "compendium",
    name: "COMPENDIUM",
    tagline: "A Premier Paper Presentation Showcase",
    category: "technical",
    icon: "🧠",
    image: "compendium",
    overview: "Compendium is a premier paper presentation event that brings together inquisitive minds to showcase innovative research, novel concepts, and emerging ideas. The event provides a platform for participants to articulate their work, engage in intellectual discussions, and gain insights through scholarly interaction.",
    requirements: [
      "Eligibility: Open to students pursuing UG and PG",
      "Team Size: 3 members per team",
      "Presentation Time: 8-10 minutes per team, followed by a Q&A session",
      "Abstract Submission: Required during registration. Only selected participants can present",
      "File Format: PPT with 8-10 slides",
      "Participants must bring laptops, power adapters, and extension cords"
    ],
    contacts: [
      { name: "Padmasree G M", phone: "+91 8072 470 616" },
      { name: "Gangadevi P", phone: "+91 86674 69371" }
    ],
    registerLink: "https://forms.gle/3sitbR1R6Zerqser8",
    busRouteLink: "/BusRoute.pdf"
  },
  {
    id: "syntax-saga",
    name: "{SYNTAX SAGA}",
    tagline: "Every Saga begins with a single line of code",
    category: "technical",
    icon: "❄️",
    image: "syntax-saga",
    overview: "Embark on the ultimate coding journey! {Syntax Saga} is a competitive programming event designed to test your logic, debugging skills, and ability to reverse-engineer complex problems. From cracking quizzes to unlocking hidden keys and conquering the mysterious Blackbox, do you have what it takes to complete the saga?",
    requirements: [
      "Participation: Individual",
      "Languages: C, C++, Python, Java",
      "Round 1: The Qualifier (Quiz) – Technical MCQs and algorithmic riddles to test foundational knowledge",
      "Round 2: The Syntax Vault – Solve mini-puzzles (debugging, logic, output tracing) to forge the 'Key' to the finals",
      "Round 3: The Blackbox Challenge – Deduce hidden logic from Inputs/Outputs and reconstruct the source code",
      "Prizes: Exciting rewards for the ultimate code voyagers!",
      "The event will be conducted in the laboratory."
    ],
    contacts: [
      { name: "R Harshavardhan", phone: "+91 79048 67352" },
      { name: "Priyadharshini S", phone: "+91 90030 96993" }
    ],
    registerLink: "https://forms.gle/TGWnXuUQTDmQpYxx8",
    busRouteLink: "/BusRoute.pdf"
  },
  {
    id: "coalescence",
    name: "COALESCENCE",
    tagline: "Roll the dice. Code the wild. Level up your reality.",
    category: "technical",
    icon: "🤖",
    image: "coalescence",
    overview: "Coalescence Build-a-thon is a fast-paced, creative website-building challenge where participants design and develop a functional website within a limited time using AI tools. The event focuses on creativity, adaptability, and presentation skills, encouraging participants to think on their feet and build smart solutions under pressure.",
    requirements: [
      "Event Format: Three rounds with eliminations — Round 1 (Initial Building), Round 2 (Advanced Development), Round 3 (Final Presentation)",
      "Team Size: 2–3 members",
      "Participants must bring their own laptops",
      "Internet will be provided",
      "AI tools are encouraged",
      "Judges' decision is final"
    ],
    contacts: [
      { name: "Senthamizpandian S", phone: "+91 93424 42927" },
      { name: "Lakshyaa C", phone: "+91 63838 45942" }
    ],
    registerLink: "https://forms.gle/j9Af6tjeZCKiCZRs5",
    busRouteLink: "/BusRoute.pdf"
  },
  {
    id: "trust-issues",
    name: "UNTOLD VERDICT",
    tagline: "Only one conclusion is correct. Can you prove it?",
    category: "non-technical",
    icon: "⚖️",
    image: "trust-issues",
    overview: "Court of Truth is a mock trial and investigation-based challenge where logic, reasoning, and evidence determine justice. Teams are presented with a mysterious murder case filled with clues, suspects, timelines, and misleading information. Participants must analyze the case, connect the evidence, and present a convincing argument to uncover the real culprit.",
    requirements: [
      "Eligibility: Open to UG and PG students from all departments",
      "Team Size: Exactly 3 members per team",
      "Qualifier Round: A preliminary elimination round to shortlist teams for the main event",
      "Final Round – Courtroom Challenge: Shortlisted teams investigate the case and present arguments before the Judge/Investigator",
      "Time Limits: Strictly enforced"
    ],
    contacts: [
      { name: "S Divyanth", phone: "+91 98844 59720" },
      { name: "Neha C M", phone: "+91 86674 34505" }
    ],
    registerLink: "https://forms.gle/wh3sT1KDhZyL8VmZ8",
    busRouteLink: "/BusRoute.pdf"
  }
];
