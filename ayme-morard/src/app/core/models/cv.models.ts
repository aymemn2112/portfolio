export interface CVHeader {
  name: string;
  title: string;
  titleFr: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  tagline: string;
}

export interface AboutData {
  bio: string;
  whyMe: string[];
  whySchool: string[];
}

export interface CVContentItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
  details?: string[];
  technologies?: string[];
  link?: string;
}

export interface CVSection {
  id: string;
  title: string;
  type: 'experience' | 'projects' | 'skills' | 'education' | 'languages' | 'hobbies';
  content: CVContentItem[];
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: { name: string; level: number }[];
}

export interface CVData {
  header: CVHeader;
  about: AboutData;
  sections: CVSection[];
  skillCategories: SkillCategory[];
}

export const CV_CONTENT: CVData = {
  header: {
    name: 'Aymé Morard',
    title: 'Étudiant en Cybersécurité - Epitech Paris',
    titleFr: 'Étudiant en Cybersécurité - Epitech Paris',
    location: 'Paris, France',
    email: 'ayme.morard@epitech.eu',
    phone: '+33 07 62 68 03 21',
    github: 'github.com/aymemn2112',
    tagline: 'Passionné par la sécurité offensive, le pentesting et le développement full-stack'
  },
  about: {
    bio: 'Passionné d\'informatique et de cybersécurité, spécialisé en sécurité réseau, pentesting et développement full-stack. Actuellement en RNCP Niveau 7 à Epitech Paris, je développe mon expertise en sécurité offensive et en génie logiciel.',
    whyMe: [
      'e-Todo : Application full-stack de gestion de tâches avec Angular, Node.js/Express, MySQL et Docker — authentification JWT et interface complète',
      'Tardis : Analyse et prédiction de retards SNCF via Machine Learning (Gradient Boosting) avec dashboard Streamlit interactif',
      'Nextbuy : Analyse de 13,7M de commandes alimentaires avec segmentation clients, prédiction de réachat (DNN) et dashboard décisionnel',
      'Alice (Bookworm) : Moteur NLP léger analysant des livres Project Gutenberg — diversité lexicale, NER, résumé automatique et similarité',
      'Eliza (FinSight) : Assistant IA financier pour KPMG avec LLM local (Ollama/Mistral), interface Angular, bot Discord et conformité IFRS/GAAP',
      'Yowl : Conception UX/UI complète d\'un produit digital — recherche utilisateur, personas, wireframes, maquettes et prototypage Figma',
      'hack_juice : Exploitation de vulnérabilités OWASP sur Juice Shop (XSS, Broken Access Control, Cryptographic Issues, etc.) en Python'
    ],
    whySchool: [
      "Formation d'excellence ayant aujourd'hui fait ses preuves en entreprise.",
      'Pédagogie par projets : Un cahier des charges. Une équipe. Une deadline. Une fois terminée l\'équipe sera soumise à la "Défense du projet", une présentation devant la direction pédagogique.',
      'Les projets créés par Epitech sont tirés de ceux présents aujourd\'hui en entreprise : Intelligence artificielle / Cybersécurité / Cloud & Web3 / Développement full-stack / Tech-business-management',
      'Les piscines : Période très intense de 2 à 4 semaines d\'apprentissage sur une tech précise (ex : data analysis, prediction and visualisation), où l\'objectif est de tenir sur la durée en maintenant un niveau de performance optimal.'
    ]
  },
  sections: [
    {
      id: 'experience',
      title: 'Experience',
      type: 'experience',
      content: [
        {
          id: 'kernel42',
          title: 'Kernel 42',
          subtitle: 'Stagiaire Dev',
          date: 'févr. 2025 - juil. 2025',
          description: 'Stage en agence de développement, travaillant sur des projets clients sous supervision.',
          details: [
            'Affecté sous supervision en post-prod au projet client GRDF',
            'Intégration de feature métier en post-production (Mobigaz)',
            'Data visualisation / Dashboard depuis de grands flux de données',
            'Outil d\'automatisation interne (Jira, processus internes)',
            'Audit de code sur la partie interface utilisateur',
            'Maîtrise des outils de gestion de projet (Gitlab, Jira etc.)'
          ],
          technologies: ['Angular', 'ThreeJS', 'GSAP', 'NodeJS', 'PostgreSQL', 'Docker', 'Gitlab', 'Jira']
        }
      ]
    },
    {
      id: 'projects',
      title: 'Projects',
      type: 'projects',
      content: [
        {
          id: 'pentest-tools',
          title: 'Pentest Tools',
          subtitle: 'Outil de Test d\'Intrusion Réseau',
          description: 'Outil de test d\'intrusion réseau développé en C et .NET pour les tests de sécurité et la manipulation réseau.',
          details: [
            'Manipulation de paquets réseau (SYN, ACK, FIN, etc.)',
            'Gestion de certificats SSL/TLS pour attaques MITM',
            'Spoofing d\'adresse MAC (manipulation de trames Ethernet)',
            'Création de paquets personnalisés pour réseaux multi-machines'
          ],
          technologies: ['C', '.NET (C#)', 'Programmation Réseau', 'Création de Paquets']
        },
        {
          id: 'job-aggregator',
          title: 'Job Aggregator',
          subtitle: 'Plateforme Full-Stack d\'Agrégation d\'Emplois',
          description: 'Plateforme full-stack d\'agrégation d\'offres d\'emploi et de stages avec Angular, Express.js, PostgreSQL, Docker — collecte de données WeLoveDevs, fonctionnalités IA de classification et recommandation, tableau de bord analytique et CI/CD.',
          details: [
            'Intégration API WeLoveDevs avec collecte et normalisation des offres en temps réel',
            'Dashboard interactif avec visualisations des tendances salariales et répartition géographique',
            'Fonctionnalité IA de classification et scoring de pertinence des offres',
            'Interface admin avec modération, gestion des utilisateurs et rôles',
            'Déploiement Docker multi-service avec CI/CD GitHub Actions'
          ],
          technologies: ['Angular', 'Express.js', 'PostgreSQL', 'Docker', 'Node.js', 'GitHub Actions', 'JWT']
        },
        {
          id: 'agentic',
          title: 'Architectures Agentiques & Multi-Agents',
          subtitle: 'Avancé',
          description: 'Utilisation avancée et compréhension approfondie des architectures agentiques et multi-agents, de la conception à l\'orchestration de systèmes autonomes.',          details: [
            'Conception d\'architectures multi-agents avec orchestration, délégation et résolution collaborative de problèmes',
            'Maîtrise des patterns agentiques : raisonnement itératif, planification, mémoire, outils et boucles de rétroaction',
            'Implémentation de systèmes agentiques autonomes pour l\'analyse, la classification et la génération de contenu',
            'Intégration de modèles de langage (LLM) dans des pipelines agentiques avec gestion de contexte et prompt engineering avancé',
            'Expérience avec frameworks agentiques (LangChain, CrewAI, AutoGPT) et déploiement en environnement Docker'
          ],
          technologies: ['Python', 'LangChain', 'CrewAI', 'LLM', 'Docker', 'Prompt Engineering', 'RAG', 'API']
        },
        {
          id: 'htb',
          title: 'HTB Starting Point',
          subtitle: 'Terminé',
          description: 'Défis HackTheBox Starting Point complétés, construisant une base solide en test d\'intrusion.',
          details: [
            'Bases en test d\'intrusion',
            'Fondamentaux de la sécurité réseau',
            'Configuration de machines vulnérables variées'
          ],
          technologies: ['Test d\'Intrusion', 'Sécurité Réseau', 'Burpsuite', 'Wireshark']
        }
      ]
    },
    {
      id: 'skills',
      title: 'Skills & Technologies',
      type: 'skills',
      content: [
        {
          id: 'frontend',
          title: 'Frontend',
          technologies: ['Angular', 'React', 'ThreeJS', 'GSAP']
        },
        {
          id: 'backend',
          title: 'Backend',
          technologies: ['NodeJS', 'Express', 'PostgreSQL', 'Docker']
        },
        {
          id: 'security',
          title: 'Security',
          technologies: ['Burpsuite', 'Wireshark', 'C', '.NET (C#)', 'Nmap', 'Sécurité Réseau', 'Test d\'Intrusion']
        },
        {
          id: 'data',
          title: 'Data & AI',
          technologies: ['NLTK', 'GLiNER', 'Jupyter Notebook', 'Streamlit', 'Python']
        },
        {
          id: 'tools',
          title: 'Tools & Design',
          technologies: ['Figma', 'Gitlab', 'Jira', 'Linux', 'Bash']
        }
      ]
    },
    {
      id: 'education',
      title: 'Education',
      type: 'education',
      content: [
        {
          id: 'epitech',
          title: 'Epitech Paris',
          subtitle: 'RNCP Niveau 7 - Programme Grande École',
          date: 'sept. 2025 - juil. 2030',
          description: 'Programme Grande École en informatique avec spécialisation cybersécurité.'
        },
        {
          id: 'epita',
          title: 'Epita',
          subtitle: 'Sup - Post-Bac',
          date: 'sept. 2024 - févr. 2025',
          description: 'Première année post-bac en informatique.'
        },
        {
          id: 'bac',
          title: 'Baccalauréat Général',
          subtitle: 'Spécialités HLP & NSI',
          date: '2024',
          description: 'Lycée Saint-Jean-Baptiste de la Salle, Reims — 3 ans d\'internat'
        }
      ]
    },
    {
      id: 'languages',
      title: 'Languages',
      type: 'languages',
      content: [
        {
          id: 'french',
          title: 'Français',
          subtitle: 'Langue maternelle',
          description: 'Langue maternelle'
        },
        {
          id: 'english',
          title: 'English',
          subtitle: 'B2 oral / C1 écrit',
          description: 'Intermédiaire supérieur à l\'oral, avancé à l\'écrit — niveau professionnel'
        }
      ]
    },
    {
      id: 'hobbies',
      title: 'Hobbies',
      type: 'hobbies',
      content: [
        {
          id: 'fencing',
          title: 'Escrime',
          subtitle: 'Blason Vert (Plus Haut Grade)',
          date: '12 Ans',
          description: 'Escrime de compétition — plus haut grade obtenu'
        },
        {
          id: 'reading',
          title: 'Lecture',
          subtitle: 'Littérature Fantastique & Science-Fiction',
          description: 'Passionné de romans fantastiques et de récits immersifs'
        }
      ]
    }
  ],
  skillCategories: [
    {
      id: 'frontend',
      name: 'Frontend',
      skills: [
        { name: 'Angular', level: 80 },
        { name: 'React', level: 65 },
        { name: 'ThreeJS', level: 75 },
        { name: 'GSAP', level: 70 }
      ]
    },
    {
      id: 'backend',
      name: 'Backend',
      skills: [
        { name: 'NodeJS', level: 75 },
        { name: 'Express', level: 70 },
        { name: 'PostgreSQL', level: 65 },
        { name: 'Docker', level: 60 }
      ]
    },
    {
      id: 'security',
      name: 'Security',
      skills: [
        { name: 'Sécurité Réseau', level: 70 },
        { name: 'Test d\'Intrusion', level: 65 },
        { name: 'Burpsuite', level: 60 },
        { name: 'Wireshark', level: 65 }
      ]
    },
    {
      id: 'languages',
      name: 'Programming Languages',
      skills: [
        { name: 'C', level: 75 },
        { name: 'Python', level: 70 },
        { name: 'C# (.NET)', level: 60 },
        { name: 'Bash', level: 65 },
        { name: 'SQL', level: 60 }
      ]
    }
  ]
};
