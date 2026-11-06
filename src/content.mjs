// All site copy, in French and English.
// Edit text here, then run:  node src/build.mjs
// Each page exists in both languages; keys must match between fr and en.

export const pages = {
  home:       { fr: '/',          en: '/en' },
  ventures:   { fr: '/ventures',  en: '/en/ventures' },
  about:      { fr: '/a-propos',  en: '/en/about' },
  consulting: { fr: '/conseil',   en: '/en/consulting' },
  contact:    { fr: '/contact',   en: '/en/contact' },
};

const fr = {
  lang: 'fr',
  locale: 'fr_FR',
  nav: { ventures: 'Ventures', about: 'À propos', consulting: 'Conseil', cta: 'Demander un appel', switchLabel: 'English', switchShort: 'EN' },
  footer: {
    tagline: "L'IA pour rendre les humains plus humains.",
    privacy: 'Confidentialité',
    terms: 'Conditions',
    rights: 'Tous droits réservés',
  },
  ctaBand: {
    title: 'Un premier appel suffit pour savoir s’il y a de la valeur à aller chercher.',
    button: 'Demander un appel',
  },

  home: {
    title: 'SEBROBIN AI · Conseil et déploiement IA, centrés sur l’humain',
    description: "J'aide les entreprises à confier à l'IA le travail répétitif, pour que leurs équipes se consacrent à ce que seul un humain sait faire.",
    h1: 'Arrêtez de payer des salaires humains pour du travail de robot.',
    lead: "Je repère avec vos équipes les tâches qu'une machine fait mieux, je les confie à l'IA, et vos collaborateurs retrouvent le travail pour lequel vous les avez embauchés : décider, convaincre, créer, prendre soin de vos clients.",
    ctaPrimary: 'Demander un appel',
    ctaSecondary: 'Voir comment ça se passe',
    week: {
      title: 'Une semaine ordinaire',
      robot: [
        'Recopier des données d’un outil à l’autre',
        'Relancer les devis sans réponse',
        'Mettre en forme le reporting du lundi',
        'Trier cent candidatures',
        'Répondre dix fois à la même question client',
      ],
      human: [
        'Négocier avec un client clé',
        'Former un nouveau collègue',
        'Trouver la prochaine idée',
      ],
      legend: 'Barré : l’IA s’en charge. Le reste, c’est votre valeur.',
    },
    stance: 'Pas remplacer les humains. Les rendre meilleurs.',
    gainsTitle: 'Ce que ça change, concrètement',
    gains: [
      { t: 'Des heures rendues', d: 'Chaque tâche confiée à l’IA est mesurée : temps gagné, par poste, semaine après semaine.' },
      { t: 'Des équipes qui restent', d: 'Moins de corvées, c’est moins de lassitude, moins de départs, et des postes plus faciles à pourvoir.' },
      { t: 'Des projets qui aboutissent', d: 'Rien ne démarre tant qu’on ne sait pas qu’on peut le financer et le livrer.' },
    ],
    builderTitle: 'Je ne théorise pas l’IA. Je construis avec.',
    builderText: 'Trois applications en production, quatre en développement : conçues, développées et déployées avec l’IA. Ce que je vous recommande, je l’ai déjà mis en œuvre, et j’en connais les coûts réels.',
    builderLink: 'Voir les ventures',
    doors: [
      { key: 'consulting', t: 'Conseil', d: 'Où l’IA rapporte vraiment dans votre entreprise, et comment le livrer.' },
      { key: 'ventures', t: 'Ventures', d: 'Les applications que je construis, en ligne et en développement.' },
      { key: 'about', t: 'À propos', d: 'Mon parcours, mes références, mes principes de travail.' },
    ],
  },

  consulting: {
    title: 'Conseil IA · SEBROBIN AI',
    description: "Pas d'audit, pas de diagnostic : je vous aide à décider où l'IA rapporte vraiment, puis je le construis.",
    h1: 'L’IA ne vaut que ce qu’elle rend à vos équipes.',
    lead: 'Pas d’audit, pas de diagnostic. Je vous aide à décider où l’IA rapporte vraiment, en temps, en argent et en motivation. Puis je le construis.',
    valueTitle: 'Ce que vous y gagnez',
    value: [
      { t: 'Du temps, mesuré', d: 'Des heures rendues à chaque poste, suivies dans la durée. Pas une promesse : un chiffre.' },
      { t: 'Des équipes qui ont envie de rester', d: 'Quand les corvées disparaissent, le moral remonte, le turnover baisse et recruter devient plus simple.' },
      { t: 'Une IA comprise, pas subie', d: 'Vos équipes savent ce que l’IA fait, ce qu’elle ne fait pas, et où sont ses biais. Ça les aide à l’adopter, et vous à répondre à l’obligation de culture IA de l’AI Act européen.' },
      { t: 'Des décisions, pas des slides', d: 'Vous repartez avec une liste d’actions chiffrée et priorisée, et un oui ou un non clair pour chacune.' },
      { t: 'Celui qui conseille sait construire', d: 'Je développe moi-même des applications IA. Pas d’intermédiaire entre la recommandation et la réalisation.' },
    ],
    methodTitle: 'Six conversations, une décision',
    methodLead: 'On parle de vos ambitions avant de parler d’outils.',
    phases: ['Comprendre', 'Mesurer', 'Décider'],
    steps: [
      { t: 'Vos ambitions', q: 'Où voulez-vous aller, et qu’est-ce qui vous freine ?', out: 'Un cap partagé' },
      { t: 'Démystifier', q: 'Ce que l’IA fait, ne fait pas, et les réticences de chacun.', out: 'Une équipe alignée' },
      { t: 'Le travail humain', q: 'Qui fait quoi, et pour quel résultat ?', out: 'La carte des tâches' },
      { t: 'Le coût des irritants', q: 'Ce qu’ils coûtent en chiffre d’affaires, en moral, en départs, en recrutement.', out: 'Des irritants chiffrés' },
      { t: 'La liste de souhaits', q: 'Ce que l’IA pourrait prendre en charge, classé par valeur.', out: 'Une liste priorisée' },
      { t: 'Go / No-go', q: 'Faisabilité, budget, ressources : peut-on livrer ?', out: 'Un oui argumenté, ou un non honnête' },
    ],
    outLabel: 'Vous repartez avec',
    deliver: { t: 'On construit. On mesure.', d: 'Seulement après un go.' },
    gate: 'Avant tout projet, on vérifie qu’on peut l’exécuter, le financer et le livrer. Sinon, on ne commence pas.',
    forTitle: 'Pour qui',
    forText: 'Dirigeants et managers de TPE et PME qui veulent des résultats avant des tendances. En français ou en anglais, en France comme à l’international.',
  },

  ventures: {
    title: 'Ventures · SEBROBIN AI',
    description: 'Les applications IA conçues et construites par SEBROBIN AI : Fluencing, Starlings, Qalcyom.',
    h1: 'Ce que je construis.',
    lead: 'Chaque venture est un terrain d’essai. Ce que j’y apprends, en réussites comme en échecs, nourrit directement mes conseils.',
    liveTitle: 'En ligne',
    devTitle: 'En développement',
    visit: 'Ouvrir',
    soon: 'Bientôt',
  },

  about: {
    title: 'À propos · Seb Robin · SEBROBIN AI',
    description: 'Seb Robin : fondateur de SEBROBIN AI, bâtisseur d’applications IA, formateur en anglais et évaluateur CLOE.',
    h1: 'Seb Robin',
    lead: 'Je construis des applications IA, je forme des professionnels, et je suis convaincu d’une chose : la technologie doit rendre du temps aux humains.',
    bioTitle: 'Parcours',
    bio: [
      'Plus de vingt ans au Royaume-Uni et une carrière à l’international m’ont appris que la valeur d’une entreprise tient à ses gens : à leur jugement, à leurs relations, à leurs idées.',
      'Formateur en anglais et évaluateur CLOE depuis 2020, j’aide des professionnels à mieux communiquer. Aujourd’hui, je construis aussi des applications IA (Fluencing, la suite Starlings, Qalcyom) que je conçois, développe et déploie moi-même.',
      'C’est cette pratique quotidienne que j’apporte à mes clients : pas une théorie de l’IA, mais l’expérience de ce qui marche, de ce qui casse et de ce que ça coûte vraiment.',
    ],
    credTitle: 'Repères',
    creds: [
      'Plus de 20 ans au Royaume-Uni',
      'Formateur en anglais',
      'Évaluateur CLOE depuis 2020',
      'Fondateur de SEBROBIN AI',
      '3 applications IA en production',
      'Bilingue français et anglais',
    ],
    principlesTitle: 'Mes principes de travail',
    principles: [
      { t: 'Vos objectifs, votre décision', d: 'Je ne juge pas votre stratégie. Je vous montre ce qui est possible et ce que ça vaut. Vous décidez.' },
      { t: 'Rendre les humains meilleurs à ce qui est humain', d: 'La question n’est pas ce que l’IA peut remplacer. C’est ce que vos équipes font de mieux une fois libérées du répétitif, et les opportunités que ça ouvre.' },
      { t: 'Conçu pour évoluer', d: 'Construire Fluencing et Starlings me l’a appris : un outil IA n’est jamais fini. L’IA fait partie de la conversation, et le projet garde la souplesse de s’adapter à l’usage réel.' },
      { t: 'On ne commence que ce qu’on peut finir', d: 'Si on ne peut pas l’exécuter, le financer et le livrer, je vous le dis avant de commencer.' },
      { t: 'Ce qui ne se mesure pas n’est pas fini', d: 'Un projet est terminé quand le gain est visible, pas quand l’outil est installé.' },
      { t: 'Autonomes, jamais seuls', d: 'Vos équipes savent faire tourner et faire évoluer ce qu’on construit. Et quand vous avez besoin de moi, je suis là.' },
    ],
    based: 'Basé à Breteuil (Oise). J’interviens en France et à l’international.',
  },

  contact: {
    title: 'Demander un appel · SEBROBIN AI',
    description: 'Demandez un premier appel avec Seb Robin pour parler de vos ambitions et de la place de l’IA dans votre entreprise.',
    h1: 'Demander un appel',
    lead: 'Dites-m’en un peu sur votre entreprise et ce que vous aimeriez changer. Je vous recontacte personnellement pour fixer un créneau.',
    side: [
      'On parle de vos ambitions, pas d’outils.',
      'Aucun engagement.',
      'En français ou en anglais.',
    ],
    f: {
      first: 'Prénom', last: 'Nom', email: 'E-mail professionnel', phone: 'Téléphone (facultatif)',
      company: 'Entreprise', role: 'Fonction (facultatif)', size: 'Taille de l’entreprise', sizeChoose: 'Choisir',
      sizes: { '1-9': '1 à 9 personnes', '10-49': '10 à 49', '50-249': '50 à 249', '250+': '250 et plus' },
      callLang: 'Langue de l’appel', langFr: 'Français', langEn: 'Anglais',
      message: 'Qu’aimeriez-vous changer ?',
      messagePh: 'Ex. : nos commerciaux passent leurs vendredis sur le reporting.',
      consent: 'J’accepte que ces informations soient utilisées pour me recontacter au sujet de ma demande.',
      privacyLink: 'Politique de confidentialité',
      submit: 'Demander mon appel',
      sending: 'Envoi…',
      success: 'Demande envoyée. Je vous recontacte personnellement très vite.',
      errRequired: 'Remplissez les champs obligatoires et cochez la case de consentement.',
      errEmail: 'Cette adresse e-mail n’est pas valide.',
      errNetwork: 'La demande n’est pas partie. Réessayez, ou écrivez directement à',
    },
  },

  notFound: { title: 'Page introuvable', text: 'Cette page n’existe pas ou a changé d’adresse.', back: 'Retour à l’accueil' },
};

const en = {
  lang: 'en',
  locale: 'en_GB',
  nav: { ventures: 'Ventures', about: 'About', consulting: 'Consulting', cta: 'Request a call', switchLabel: 'Français', switchShort: 'FR' },
  footer: {
    tagline: 'AI to make humans more human.',
    privacy: 'Privacy (FR)',
    terms: 'Terms (FR)',
    rights: 'All rights reserved',
  },
  ctaBand: {
    title: 'One call is enough to know whether there’s value worth going after.',
    button: 'Request a call',
  },

  home: {
    title: 'SEBROBIN AI · Human-centred AI consulting and deployment',
    description: 'I help companies hand repetitive work to AI, so their people can focus on what only humans can do.',
    h1: 'Stop paying human salaries for robot work.',
    lead: 'I work with your teams to find the tasks a machine does better, hand them to AI, and give your people back the work you hired them for: deciding, persuading, creating, looking after your customers.',
    ctaPrimary: 'Request a call',
    ctaSecondary: 'See how it works',
    week: {
      title: 'An ordinary week',
      robot: [
        'Copy data from one tool to another',
        'Chase unanswered quotes',
        'Format Monday’s report',
        'Sort through a hundred CVs',
        'Answer the same customer question ten times',
      ],
      human: [
        'Negotiate with a key client',
        'Train a new colleague',
        'Find the next idea',
      ],
      legend: 'Struck out: AI handles it. The rest is your value.',
    },
    stance: 'Not replacing people. Making them better.',
    gainsTitle: 'What actually changes',
    gains: [
      { t: 'Hours given back', d: 'Every task handed to AI is measured: time saved, per role, week after week.' },
      { t: 'Teams that stay', d: 'Less drudgery means less fatigue, fewer resignations, and roles that are easier to fill.' },
      { t: 'Projects that land', d: 'Nothing starts until we know it can be funded and delivered.' },
    ],
    builderTitle: 'I don’t theorise about AI. I build with it.',
    builderText: 'Three apps live, four in development: designed, built and deployed with AI. What I recommend, I’ve already put into practice, and I know what it really costs.',
    builderLink: 'See the ventures',
    doors: [
      { key: 'consulting', t: 'Consulting', d: 'Where AI genuinely pays off in your company, and how to deliver it.' },
      { key: 'ventures', t: 'Ventures', d: 'The apps I build, live and in development.' },
      { key: 'about', t: 'About', d: 'My background, credentials and working principles.' },
    ],
  },

  consulting: {
    title: 'AI consulting · SEBROBIN AI',
    description: 'No audits, no diagnostics: I help you decide where AI actually pays off, then I build it.',
    h1: 'AI is only worth what it gives back to your people.',
    lead: 'No audits, no diagnostics. I help you decide where AI actually pays off, in time, money and motivation. Then I build it.',
    valueTitle: 'What you gain',
    value: [
      { t: 'Time, measured', d: 'Hours given back to each role, tracked over time. Not a promise: a number.' },
      { t: 'Teams that want to stay', d: 'When the drudgery goes, morale rises, turnover falls and hiring gets easier.' },
      { t: 'AI that’s understood, not feared', d: 'Your teams know what AI does, what it doesn’t, and where its biases are. That helps them adopt it, and helps you meet the EU AI Act’s staff AI-literacy requirement.' },
      { t: 'Decisions, not slide decks', d: 'You leave with a costed, prioritised action list, and a clear yes or no on each item.' },
      { t: 'The adviser can build', d: 'I build AI apps myself. Nothing gets lost between the recommendation and the delivery.' },
    ],
    methodTitle: 'Six conversations, one decision',
    methodLead: 'We talk about your ambitions before we talk about tools.',
    phases: ['Understand', 'Measure', 'Decide'],
    steps: [
      { t: 'Your ambitions', q: 'Where do you want to go, and what’s holding you back?', out: 'A shared direction' },
      { t: 'Demystify', q: 'What AI does, what it doesn’t, and everyone’s reservations.', out: 'An aligned team' },
      { t: 'The human work', q: 'Who does what, and for what result?', out: 'A map of the tasks' },
      { t: 'The cost of friction', q: 'What it costs in revenue, morale, staff turnover and hiring.', out: 'Friction, priced' },
      { t: 'The wish list', q: 'What AI could take on, ranked by value.', out: 'A prioritised list' },
      { t: 'Go / no-go', q: 'Feasibility, budget, resources: can we deliver?', out: 'A reasoned yes, or an honest no' },
    ],
    outLabel: 'You leave with',
    deliver: { t: 'We build. We measure.', d: 'Only after a go.' },
    gate: 'Before any project starts, we check we can execute, resource and deliver it. If we can’t, we don’t start.',
    forTitle: 'Who it’s for',
    forText: 'Leaders and managers of small and mid-sized companies who want results before trends. In English or French, in France and internationally.',
  },

  ventures: {
    title: 'Ventures · SEBROBIN AI',
    description: 'AI apps designed and built by SEBROBIN AI: Fluencing, Starlings, Qalcyom.',
    h1: 'What I build.',
    lead: 'Each venture is a proving ground. What I learn there, successes and failures alike, goes straight into my advice.',
    liveTitle: 'Live',
    devTitle: 'In development',
    visit: 'Open',
    soon: 'Coming soon',
  },

  about: {
    title: 'About · Seb Robin · SEBROBIN AI',
    description: 'Seb Robin: founder of SEBROBIN AI, AI app builder, English trainer and CLOE assessor.',
    h1: 'Seb Robin',
    lead: 'I build AI apps, I train professionals, and I’m convinced of one thing: technology should give people their time back.',
    bioTitle: 'Background',
    bio: [
      'More than twenty years in the UK and an international career taught me that a company’s value lies in its people: their judgement, their relationships, their ideas.',
      'An English trainer and CLOE assessor since 2020, I help professionals communicate better. Today I also build AI apps (Fluencing, the Starlings suite, Qalcyom), which I design, develop and deploy myself.',
      'That daily practice is what I bring to clients: not a theory of AI, but first-hand experience of what works, what breaks and what it really costs.',
    ],
    credTitle: 'At a glance',
    creds: [
      '20+ years in the UK',
      'English trainer',
      'CLOE assessor since 2020',
      'Founder of SEBROBIN AI',
      '3 AI apps in production',
      'Bilingual French and English',
    ],
    principlesTitle: 'How I work',
    principles: [
      { t: 'Your goals, your call', d: 'I don’t judge your strategy. I show you what’s possible and what it’s worth. You decide.' },
      { t: 'Make people better at human work', d: 'The question isn’t what AI can replace. It’s what your people do better once the repetitive work is gone, and the opportunities that opens up.' },
      { t: 'Built to evolve', d: 'Building Fluencing and Starlings taught me there’s no such thing as a finished AI tool. AI is part of the conversation, and the project stays flexible enough to adapt to real use.' },
      { t: 'Only start what we can finish', d: 'If we can’t execute, fund and deliver it, I’ll tell you before we start.' },
      { t: 'If it isn’t measured, it isn’t done', d: 'A project is finished when the gain is visible, not when the tool is installed.' },
      { t: 'Autonomous, never alone', d: 'Your team knows how to run and evolve what we build. And when you need me, I’m there.' },
    ],
    based: 'Based in Breteuil, France. Working in France and internationally.',
  },

  contact: {
    title: 'Request a call · SEBROBIN AI',
    description: 'Request a first call with Seb Robin to talk about your ambitions and where AI fits in your company.',
    h1: 'Request a call',
    lead: 'Tell me a little about your company and what you’d like to change. I’ll get back to you personally to set a time.',
    side: [
      'We talk about your ambitions, not tools.',
      'No commitment.',
      'In English or French.',
    ],
    f: {
      first: 'First name', last: 'Last name', email: 'Work email', phone: 'Phone (optional)',
      company: 'Company', role: 'Role (optional)', size: 'Company size', sizeChoose: 'Choose',
      sizes: { '1-9': '1 to 9 people', '10-49': '10 to 49', '50-249': '50 to 249', '250+': '250 or more' },
      callLang: 'Call language', langFr: 'French', langEn: 'English',
      message: 'What would you like to change?',
      messagePh: 'E.g. our sales team spends every Friday on reporting.',
      consent: 'I agree that this information may be used to contact me about my request.',
      privacyLink: 'Privacy policy (in French)',
      submit: 'Request my call',
      sending: 'Sending…',
      success: 'Request sent. I’ll get back to you personally very soon.',
      errRequired: 'Fill in the required fields and tick the consent box.',
      errEmail: 'This email address isn’t valid.',
      errNetwork: 'The request didn’t go through. Try again, or email',
    },
  },

  notFound: { title: 'Page not found', text: 'This page doesn’t exist or has moved.', back: 'Back to home' },
};

export const ventures = [
  {
    name: 'Fluencing', status: 'live', url: 'https://sebrobin.com',
    fr: { tag: 'Parler anglais couramment', d: 'Un coach IA de conversation pour les professionnels : de vraies conversations, des retours immédiats, de la confiance pour s’exprimer.' },
    en: { tag: 'Speak English fluently', d: 'An AI conversation coach for professionals: real conversations, instant feedback, the confidence to speak up.' },
  },
  {
    name: 'Starlings SalesFlow', status: 'live', url: 'https://starlings.pro',
    fr: { tag: 'La vente simplifiée', d: 'Du prospect à la signature, un pipeline clair pour les indépendants et petites équipes. Relances IA, rappels, taux de conversion. Sans la complexité d’un CRM.' },
    en: { tag: 'Selling, simplified', d: 'From prospect to signature, a clear pipeline for freelancers and small teams. AI follow-ups, reminders, conversion rates. Without CRM complexity.' },
  },
  {
    name: 'Starlings Store', status: 'live', url: 'https://store.starlings.pro',
    fr: { tag: 'Stock, commandes, ventes', d: 'Pour les showrooms et boutiques indépendantes : stock en temps réel, réassort automatisé, prévisions de demande.' },
    en: { tag: 'Stock, orders, sales', d: 'For showrooms and independent shops: real-time stock, automated restocking, demand forecasts.' },
  },
  {
    name: 'Starlings Marketing', status: 'dev',
    fr: { tag: 'L’exécution marketing', d: 'Campagnes, contenus réseaux sociaux, séquences d’e-mails : planifiés, créés et programmés au même endroit.' },
    en: { tag: 'Marketing, executed', d: 'Campaigns, social content, email sequences: planned, created and scheduled in one place.' },
  },
  {
    name: 'Qalcyom', status: 'dev',
    fr: { tag: 'La conformité ESG sans la complexité', d: 'Ce qui vous concerne dans les exigences ESG européennes, votre progression, et des rapports prêts à soumettre.' },
    en: { tag: 'ESG compliance without the complexity', d: 'What EU ESG requirements mean for you, your progress, and reports ready to submit.' },
  },
  {
    name: 'Starlings Patterns', status: 'dev',
    fr: { tag: 'Repérer ce qui freine', d: 'Analyse vos opérations, fait remonter les points de friction récurrents et propose des solutions concrètes.' },
    en: { tag: 'Find what’s holding you back', d: 'Analyses your operations, surfaces recurring friction points and suggests concrete fixes.' },
  },
  {
    name: 'Starlings Hire', status: 'dev',
    fr: { tag: 'Recruter sans service RH', d: 'Sourcing, présélection, entretiens assistés par IA et intégration, de bout en bout.' },
    en: { tag: 'Hiring without an HR department', d: 'Sourcing, screening, AI-assisted interviews and onboarding, end to end.' },
  },
];

export const t = { fr, en };
