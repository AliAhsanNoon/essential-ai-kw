
export interface Option {
  value: string;
  label: string;
  next?: string;
}

export type StepType =
  | "single-choice"
  | "multiple-choice"
  | "input text field"
  | "dropdown"
  | "message";

export interface WizardStep {
  id: string;
  title: string;
  description: string;
  type: StepType;
  options?: Option[];
  placeholder?: string;
  next?: string;
  previous?: string;
  detail?: string;
}


export interface WizardNode {
  [key: string]: WizardStep;
}


export interface WizardFlowOption extends Option {
  node?: WizardNode;
}

// Main wizard interface
export interface Wizard {
  id: string;
  title: string;
  description: string;
  type: StepType;
  options: WizardFlowOption[];
}

// Wizards collection
export interface Wizards {
  initial: Wizard;
  guidance: Wizard;
  "no-guidance": Record<string, never>;
}


export interface WizardSystem {
  wizards: Wizards;
}


export type EssentialAIKWData = WizardSystem;

export const wizardSystem: WizardSystem = {
  wizards: {
    initial: {
      id: "initial",
      title: "Hi, I'm Mia Mentor!You can either ask me questions directly, or I can guide you through some areas to get to know each other better. Which would you prefer?",
      description: "You can either ask me questions directly, or I can guide you through some areas to get to know each other better. Which would you prefer?",
      type: "single-choice",
      options: [
        {
          value: "no-guidance",
          label: "No guidance, I'm ready to ask questions.",
          next: "end"
        },
        {
          value: "yes-guidance",
          label: "Yes, guidance please!",
          next: "guidance"
        }
      ]
    },
    guidance: {
      id: "guidance",
      title: "Great, Let's Get Started!",
      description: "Here are some things I can help with. What do you need most help with today?",
      type: "single-choice",
      options: [
        {
          value: "New Agent Onboarding",
          label: "New Agent Onboarding",
          node: {
            "New Agent Onboarding": {
              id: "New Agent Onboarding",
              title: "New Agent Onboarding",
              description: "Have you met with so far?",
              type: "multiple-choice",
              options: [
                {
                  value: "Val Guerette",
                  label: "Val Guerette (KW Metro Onboarding Specialist)",
                },
                {
                  value: "Orientation Leader",
                  label: "Orientation Leader",
                },
                {
                  value: "Team Leader",
                  label: "Team Leader",
                },
                {
                  value: "I haven't met with anyone yet",
                  label: "I haven't met with anyone yet",
                },
              ],
              next: "adventure",
              previous: "guidance",
            },
            adventure: {
              id: "adventure",
              title: "New Agent Onboarding",
              description: "How's your onboarding adventure going so far?",
              type: "multiple-choice",
              options: [
                {
                  value: "Trying to get my bearings",
                  label: "Trying to get my bearings",
                },
                {
                  value: "Checked off some initial to-dos",
                  label: "Checked off some initial to-dos",
                },
                {
                  value: "Completed initial meetings",
                  label: "Completed initial meetings",
                },
                {
                  value: "Looking for a helping hand",
                  label: "Looking for a helping hand",
                },
                { value: "Feeling confident", label: "Feeling confident" },
              ],
              next: "question",
              previous: "New agent onboarding",
            },
            question: {
              id: "question",
              title: "New Agent Onboarding",
              description: "Are there any aspects of getting up to speed that you're struggling with?",
              type: "input text field",
              placeholder: "Write your thoughts here...",
              next: "end",
              previous: "adventure",
            },
            end: {
              id: "end",
              title: "Thanks for sharing!",
              description: "I appreciate your input — we'll use this to guide your next steps.",
              type: "message",
            },
          },
        },
        {
          value: "Finding Essential Documents",
          label: "Finding documents",
          node: {
            "Finding Essential Documents": {
              id: "Finding Essential Documents",
              title: "Finding Documents",
              description: "Who are you working with?",
              type: "dropdown",
              options: [
                { value: "please Select", label: "please select" },
                { value: "Buyer", label: "Buyer" },
                { value: "Seller", label: "Seller" },
                { value: "Tenant", label: "Tenant" },
              ],
              next: "end",
              previous: "guidance",
            },
            end: {
              id: "end",
              title: "Thanks for sharing!",
              description: "I appreciate your input — we'll use this to guide your next steps.",
              type: "message",
            },
          },
        },
        {
          value: "Connecting with the Right People",
          label: " Finding someone",
          node: {
            "Connecting with the Right People": {
              id: "Connecting with the Right People",
              title: "Connecting with the Right People",
              description: "I can help you connect with the right person.",
              detail: "You can give me a name, role, phone number, or describe what you need help with, and I will find the right person for you.How would you like to find someone?",
              type: "single-choice",
              options: [
                {
                  value: "By name",
                  label: "By name - give me name of person (i.e. Valerie Guerette)",
                  next: "findByName",
                },
                {
                  value: "By role",
                  label: "By role - what the person does (i.e. IT, Admin, Marketing)",
                  next: "findByRole",
                },
                {
                  value: "By phone number",
                  label: "By phone number - find someone by phone number (i.e. 555-1212)",
                  next: "findByPhone",
                },
                {
                  value: "help",
                  label: "Or just describe what you need help with",
                  next: "findByHelp",
                },
              ],
            },
            findByName: {
              id: "findByName",
              title: "Please enter the person's name",
              description: "Enter the name of the person you're looking for",
              type: "input text field",
              placeholder: "Type a name (e.g. Valerie Guerette)...",
              next: "end",
            },
            findByRole: {
              id: "findByRole",
              title: "Please enter the role or department",
              description: "Enter the role or department you're looking for",
              type: "input text field",
              placeholder: "Type a role (e.g. Marketing, IT, Admin)...",
              next: "end",
            },
            findByPhone: {
              id: "findByPhone",
              title: "Please enter the phone number",
              description: "Enter the phone number to find the person",
              type: "input text field",
              placeholder: "Type a phone number (e.g. 555-1212)...",
              next: "end",
            },
            findByHelp: {
              id: "findByHelp",
              title: "Please describe what you need help with",
              description: "Describe what you need help with so we can find the right person",
              type: "input text field",
              placeholder: "Type your question or request...",
              next: "end",
            },
            end: {
              id: "end",
              title: "Thanks for sharing!",
              description: "I'll use that info to connect you with the right person.",
              type: "message",
            },
          },
        },
        {
          value: "Setting Up Technology and Tools",
          label: "Setting up tech and tools",
          node: {
            "Setting Up Technology and Tools": {
              id: "Setting Up Technology and Tools",
              title: "Setting Up Technology and Tools",
              description: "Which tools do you need help with? (Select all that apply)",
              type: "multiple-choice",
              options: [
                { value: "KW Command", label: "KW Command (central platform)" },
                { value: "Agent Website", label: "Agent Website" },
                { value: "Database Management", label: "Database Management" },
                { value: "Marketing Tools", label: "Marketing Tools" },
                { value: "Smart Plans", label: "Smart Plans" },
                {
                  value: "Social Media Campaigns",
                  label: "Social Media Campaigns",
                },
                {
                  value: "Design for Print or Email",
                  label: "Design for Print or Email",
                },
                {
                  value: "Business Planning Tools",
                  label: "Business Planning Tools",
                },
                {
                  value: "KW Email, Voicemail, and Profile Setup",
                  label: "KW Email, Voicemail, and Profile Setup",
                },
                { value: "MLS Access", label: "MLS Access" },
                {
                  value: "Office Information - Door Code, Wifi Passwords",
                  label: "Office Information - Door Code, Wifi Passwords",
                },
                { value: "Something Else", label: "Something Else" },
              ],
              next: "challenge",
            },
            challenge: {
              id: "challenge",
              title: "Setting Up Technology and Tools",
              description: "Any specific question or challenges you're facing?",
              type: "input text field",
              placeholder: "Write your thoughts here...",
              next: "end",
            },
            end: {
              id: "end",
              title: "Thanks for sharing!",
              description: "I'll use that info to connect you with the right person.",
              type: "message",
            },
          },
        },
        {
          value: "Getting the Education You Need",
          label: "Getting education",
          node: {
            "Getting the Education You Need": {
              id: "Getting the Education You Need",
              title: "Getting the Education You Need",
              description: "Are you looking for:",
              type: "single-choice",
              options: [
                { value: "Live classes", label: "Live classes" },
                { value: "On-demand", label: "On-demand" },
                {
                  value: "Continuing education",
                  label: "Continuing education",
                },
                { value: " Either", label: " Either" },
              ],
              next: "topic",
            },
            topic: {
              id: "topic",
              title: "Getting the Education You Need",
              description: "Are you looking for a specific topic? E.g. how to create a Comprehensive Marketing Analysis (CMA)",
              type: "input text field",
              placeholder: "Enter the specific topic of interest",
              next: "end",
            },
            end: {
              id: "end",
              title: "Thanks for sharing!",
              description: "I'll use that info to connect you with the right person.",
              type: "message",
            },
          },
        },
        {
          value: "Working with buyers and sellers",
          label: "Working with buyers & sellers",
          node: {
            "Working with buyers and sellers": {
              id: "Working with buyers and sellers",
              title: "Working with Buyers and Sellers",
              description: "I can help you prepare for working with buyers and sellers. I can answer questions like:",
              detail: "What should I do meeting buyers and sellers first time? / What are tips for negotiating a sales price? /How to conduct an open house? /Tips on pricing strategies? /Negotiating an offer? /Steps for signing up a new listing? /Signing up a client who is a buyer? /Understanding buyers and sellers goals and timelines?",
              type: "input text field",
              placeholder: "Enter Your Question Here",
              next: "end",
            },
            end: {
              id: "end",
              title: "Thanks for sharing!",
              description: "I'll use that info to connect you with the right person.",
              type: "message",
            },
          },
        },
      ],
    },
    "no-guidance": {},
  },
};