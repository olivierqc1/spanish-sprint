// src/data/cards.ts

// Définis le type Card ici avec tag
export type Card = {
  id: string;
  front: string;
  back: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  tag?: string;
  country?: string;
};

export const cards: Card[] = [
  // ==================== A1 BASE (60 cartes) ====================
  
  // SALUTATIONS & BASE
  { id:"a1-base-1", front:"hola", back:"bonjour/salut", level:"A1", tag:"salutations" },
  { id:"a1-base-2", front:"adiós", back:"au revoir", level:"A1", tag:"salutations" },
  { id:"a1-base-3", front:"gracias", back:"merci", level:"A1", tag:"salutations" },
  { id:"a1-base-4", front:"por favor", back:"s'il vous plaît", level:"A1", tag:"salutations" },
  { id:"a1-base-5", front:"buenos días", back:"bonjour (matin)", level:"A1", tag:"salutations" },
  { id:"a1-base-6", front:"buenas tardes", back:"bonjour (après-midi)", level:"A1", tag:"salutations" },
  { id:"a1-base-7", front:"buenas noches", back:"bonsoir/bonne nuit", level:"A1", tag:"salutations" },
  { id:"a1-base-8", front:"¿Cómo estás?", back:"Comment vas-tu?", level:"A1", tag:"salutations" },
  { id:"a1-base-9", front:"bien", back:"bien", level:"A1", tag:"base" },
  { id:"a1-base-10", front:"mal", back:"mal", level:"A1", tag:"base" },

  // NOMBRES & CHIFFRES
  { id:"a1-num-1", front:"uno", back:"un", level:"A1", tag:"nombres" },
  { id:"a1-num-2", front:"dos", back:"deux", level:"A1", tag:"nombres" },
  { id:"a1-num-3", front:"tres", back:"trois", level:"A1", tag:"nombres" },
  { id:"a1-num-4", front:"diez", back:"dix", level:"A1", tag:"nombres" },
  { id:"a1-num-5", front:"veinte", back:"vingt", level:"A1", tag:"nombres" },
  { id:"a1-num-6", front:"cien", back:"cent", level:"A1", tag:"nombres" },
  { id:"a1-num-7", front:"mil", back:"mille", level:"A1", tag:"nombres" },

  // FAMILLE
  { id:"a1-fam-1", front:"padre/papá", back:"père/papa", level:"A1", tag:"famille" },
  { id:"a1-fam-2", front:"madre/mamá", back:"mère/maman", level:"A1", tag:"famille" },
  { id:"a1-fam-3", front:"hermano", back:"frère", level:"A1", tag:"famille" },
  { id:"a1-fam-4", front:"hermana", back:"sœur", level:"A1", tag:"famille" },
  { id:"a1-fam-5", front:"hijo", back:"fils", level:"A1", tag:"famille" },
  { id:"a1-fam-6", front:"hija", back:"fille", level:"A1", tag:"famille" },
  { id:"a1-fam-7", front:"abuelo", back:"grand-père", level:"A1", tag:"famille" },
  { id:"a1-fam-8", front:"abuela", back:"grand-mère", level:"A1", tag:"famille" },
  { id:"a1-fam-9", front:"tío", back:"oncle", level:"A1", tag:"famille" },
  { id:"a1-fam-10", front:"tía", back:"tante", level:"A1", tag:"famille" },

  // NOURRITURE BASE
  { id:"a1-food-1", front:"pan", back:"pain", level:"A1", tag:"nourriture" },
  { id:"a1-food-2", front:"agua", back:"eau", level:"A1", tag:"nourriture" },
  { id:"a1-food-3", front:"café", back:"café", level:"A1", tag:"nourriture" },
  { id:"a1-food-4", front:"leche", back:"lait", level:"A1", tag:"nourriture" },
  { id:"a1-food-5", front:"carne", back:"viande", level:"A1", tag:"nourriture" },
  { id:"a1-food-6", front:"pollo", back:"poulet", level:"A1", tag:"nourriture" },
  { id:"a1-food-7", front:"pescado", back:"poisson", level:"A1", tag:"nourriture" },
  { id:"a1-food-8", front:"arroz", back:"riz", level:"A1", tag:"nourriture" },
  { id:"a1-food-9", front:"huevo", back:"œuf", level:"A1", tag:"nourriture" },
  { id:"a1-food-10", front:"queso", back:"fromage", level:"A1", tag:"nourriture" },
  { id:"a1-food-11", front:"tomate", back:"tomate", level:"A1", tag:"nourriture" },
  { id:"a1-food-12", front:"patata", back:"pomme de terre", level:"A1", tag:"nourriture", country:"Espagne" },
  { id:"a1-food-13", front:"manzana", back:"pomme", level:"A1", tag:"nourriture" },
  { id:"a1-food-14", front:"naranja", back:"orange", level:"A1", tag:"nourriture" },
  { id:"a1-food-15", front:"plátano", back:"banane", level:"A1", tag:"nourriture" },

  // COULEURS
  { id:"a1-col-1", front:"blanco", back:"blanc", level:"A1", tag:"couleurs" },
  { id:"a1-col-2", front:"negro", back:"noir", level:"A1", tag:"couleurs" },
  { id:"a1-col-3", front:"rojo", back:"rouge", level:"A1", tag:"couleurs" },
  { id:"a1-col-4", front:"azul", back:"bleu", level:"A1", tag:"couleurs" },
  { id:"a1-col-5", front:"verde", back:"vert", level:"A1", tag:"couleurs" },
  { id:"a1-col-6", front:"amarillo", back:"jaune", level:"A1", tag:"couleurs" },
  { id:"a1-col-7", front:"gris", back:"gris", level:"A1", tag:"couleurs" },

  // JOURS & TEMPS
  { id:"a1-time-1", front:"lunes", back:"lundi", level:"A1", tag:"temps" },
  { id:"a1-time-2", front:"martes", back:"mardi", level:"A1", tag:"temps" },
  { id:"a1-time-3", front:"miércoles", back:"mercredi", level:"A1", tag:"temps" },
  { id:"a1-time-4", front:"jueves", back:"jeudi", level:"A1", tag:"temps" },
  { id:"a1-time-5", front:"viernes", back:"vendredi", level:"A1", tag:"temps" },
  { id:"a1-time-6", front:"sábado", back:"samedi", level:"A1", tag:"temps" },
  { id:"a1-time-7", front:"domingo", back:"dimanche", level:"A1", tag:"temps" },
  { id:"a1-time-8", front:"hoy", back:"aujourd'hui", level:"A1", tag:"temps" },
  { id:"a1-time-9", front:"mañana", back:"demain", level:"A1", tag:"temps" },
  { id:"a1-time-10", front:"ayer", back:"hier", level:"A1", tag:"temps" },

  // ==================== A1 ESPAGNE (20 cartes) ====================
  
  { id:"es-a1-1", front:"casa", back:"maison", level:"A1", tag:"vocab", country:"Espagne" },
  { id:"es-a1-2", front:"tren", back:"train", level:"A1", tag:"transport", country:"Espagne" },
  { id:"es-a1-3", front:"metro", back:"métro", level:"A1", tag:"transport", country:"Espagne" },
  { id:"es-a1-4", front:"autobús", back:"bus", level:"A1", tag:"transport", country:"Espagne" },
  { id:"es-a1-5", front:"coche", back:"voiture", level:"A1", tag:"transport", country:"Espagne" },
  { id:"es-a1-6", front:"calle", back:"rue", level:"A1", tag:"ville", country:"Espagne" },
  { id:"es-a1-7", front:"plaza", back:"place", level:"A1", tag:"ville", country:"Espagne" },
  { id:"es-a1-8", front:"tienda", back:"magasin", level:"A1", tag:"commerce", country:"Espagne" },
  { id:"es-a1-9", front:"mercado", back:"marché", level:"A1", tag:"commerce", country:"Espagne" },
  { id:"es-a1-10", front:"bar", back:"bar", level:"A1", tag:"lieux", country:"Espagne" },
  { id:"es-a1-11", front:"cerveza", back:"bière", level:"A1", tag:"boissons", country:"Espagne" },
  { id:"es-a1-12", front:"vino", back:"vin", level:"A1", tag:"boissons", country:"Espagne" },
  { id:"es-a1-13", front:"tapas", back:"petits plats", level:"A1", tag:"nourriture", country:"Espagne" },
  { id:"es-a1-14", front:"paella", back:"paella", level:"A1", tag:"nourriture", country:"Espagne" },
  { id:"es-a1-15", front:"jamón", back:"jambon", level:"A1", tag:"nourriture", country:"Espagne" },
  { id:"es-a1-16", front:"chorizo", back:"chorizo", level:"A1", tag:"nourriture", country:"Espagne" },
  { id:"es-a1-17", front:"tortilla", back:"omelette espagnole", level:"A1", tag:"nourriture", country:"Espagne" },
  { id:"es-a1-18", front:"aceite", back:"huile", level:"A1", tag:"nourriture", country:"Espagne" },
  { id:"es-a1-19", front:"aceituna", back:"olive", level:"A1", tag:"nourriture", country:"Espagne" },
  { id:"es-a1-20", front:"playa", back:"plage", level:"A1", tag:"lieux", country:"Espagne" },

  // ==================== A1 MEXIQUE (20 cartes) ====================
  
  { id:"mx-a1-1", front:"camión", back:"bus (MX)", level:"A1", tag:"transport", country:"Mexique" },
  { id:"mx-a1-2", front:"frijoles", back:"haricots", level:"A1", tag:"nourriture", country:"Mexique" },
  { id:"mx-a1-3", front:"tortilla", back:"galette de maïs", level:"A1", tag:"nourriture", country:"Mexique" },
  { id:"mx-a1-4", front:"chile", back:"piment", level:"A1", tag:"nourriture", country:"Mexique" },
  { id:"mx-a1-5", front:"salsa", back:"sauce piquante", level:"A1", tag:"nourriture", country:"Mexique" },
  { id:"mx-a1-6", front:"taco", back:"taco", level:"A1", tag:"nourriture", country:"Mexique" },
  { id:"mx-a1-7", front:"quesadilla", back:"quesadilla", level:"A1", tag:"nourriture", country:"Mexique" },
  { id:"mx-a1-8", front:"aguacate", back:"avocat", level:"A1", tag:"nourriture", country:"Mexique" },
  { id:"mx-a1-9", front:"maíz", back:"maïs", level:"A1", tag:"nourriture", country:"Mexique" },
  { id:"mx-a1-10", front:"mango", back:"mangue", level:"A1", tag:"fruits", country:"Mexique" },
  { id:"mx-a1-11", front:"papaya", back:"papaye", level:"A1", tag:"fruits", country:"Mexique" },
  { id:"mx-a1-12", front:"mercado", back:"marché", level:"A1", tag:"commerce", country:"Mexique" },
  { id:"mx-a1-13", front:"tianguis", back:"marché populaire", level:"A1", tag:"commerce", country:"Mexique" },
  { id:"mx-a1-14", front:"coche", back:"voiture (MX)", level:"A1", tag:"transport", country:"Mexique" },
  { id:"mx-a1-15", front:"cuadra", back:"pâté de maisons", level:"A1", tag:"ville", country:"Mexique" },
  { id:"mx-a1-16", front:"zócalo", back:"place principale", level:"A1", tag:"ville", country:"Mexique" },
  { id:"mx-a1-17", front:"antojito", back:"en-cas", level:"A1", tag:"nourriture", country:"Mexique" },
  { id:"mx-a1-18", front:"refresco", back:"soda", level:"A1", tag:"boissons", country:"Mexique" },
  { id:"mx-a1-19", front:"jugo", back:"jus", level:"A1", tag:"boissons", country:"Mexique" },
  { id:"mx-a1-20", front:"agua de jamaica", back:"infusion d'hibiscus", level:"A1", tag:"boissons", country:"Mexique" },

  // ==================== A2 BASE (40 cartes) ====================
  
  // VERBES FRÉQUENTS
  { id:"a2-verb-1", front:"hacer", back:"faire", level:"A2", tag:"verbes" },
  { id:"a2-verb-2", front:"poder", back:"pouvoir", level:"A2", tag:"verbes" },
  { id:"a2-verb-3", front:"querer", back:"vouloir", level:"A2", tag:"verbes" },
  { id:"a2-verb-4", front:"deber", back:"devoir", level:"A2", tag:"verbes" },
  { id:"a2-verb-5", front:"saber", back:"savoir", level:"A2", tag:"verbes" },
  { id:"a2-verb-6", front:"conocer", back:"connaître", level:"A2", tag:"verbes" },
  { id:"a2-verb-7", front:"poner", back:"mettre/poser", level:"A2", tag:"verbes" },
  { id:"a2-verb-8", front:"traer", back:"apporter", level:"A2", tag:"verbes" },
  { id:"a2-verb-9", front:"salir", back:"sortir", level:"A2", tag:"verbes" },
  { id:"a2-verb-10", front:"venir", back:"venir", level:"A2", tag:"verbes" },
  { id:"a2-verb-11", front:"sentir", back:"sentir/ressentir", level:"A2", tag:"verbes" },
  { id:"a2-verb-12", front:"pensar", back:"penser", level:"A2", tag:"verbes" },
  { id:"a2-verb-13", front:"creer", back:"croire", level:"A2", tag:"verbes" },
  { id:"a2-verb-14", front:"parecer", back:"sembler/paraître", level:"A2", tag:"verbes" },
  { id:"a2-verb-15", front:"buscar", back:"chercher", level:"A2", tag:"verbes" },

  // ADJECTIFS
  { id:"a2-adj-1", front:"grande", back:"grand", level:"A2", tag:"adjectifs" },
  { id:"a2-adj-2", front:"pequeño", back:"petit", level:"A2", tag:"adjectifs" },
  { id:"a2-adj-3", front:"bueno", back:"bon", level:"A2", tag:"adjectifs" },
  { id:"a2-adj-4", front:"malo", back:"mauvais", level:"A2", tag:"adjectifs" },
  { id:"a2-adj-5", front:"bonito", back:"joli", level:"A2", tag:"adjectifs" },
  { id:"a2-adj-6", front:"feo", back:"laid", level:"A2", tag:"adjectifs" },
  { id:"a2-adj-7", front:"nuevo", back:"nouveau", level:"A2", tag:"adjectifs" },
  { id:"a2-adj-8", front:"viejo", back:"vieux", level:"A2", tag:"adjectifs" },
  { id:"a2-adj-9", front:"joven", back:"jeune", level:"A2", tag:"adjectifs" },
  { id:"a2-adj-10", front:"difícil", back:"difficile", level:"A2", tag:"adjectifs" },
  { id:"a2-adj-11", front:"fácil", back:"facile", level:"A2", tag:"adjectifs" },
  { id:"a2-adj-12", front:"caro", back:"cher", level:"A2", tag:"adjectifs" },
  { id:"a2-adj-13", front:"barato", back:"bon marché", level:"A2", tag:"adjectifs" },

  // CONNECTEURS
  { id:"a2-conn-1", front:"pero", back:"mais", level:"A2", tag:"connecteurs" },
  { id:"a2-conn-2", front:"porque", back:"parce que", level:"A2", tag:"connecteurs" },
  { id:"a2-conn-3", front:"aunque", back:"bien que", level:"A2", tag:"connecteurs" },
  { id:"a2-conn-4", front:"mientras", back:"pendant que", level:"A2", tag:"connecteurs" },
  { id:"a2-conn-5", front:"cuando", back:"quand", level:"A2", tag:"connecteurs" },
  { id:"a2-conn-6", front:"si", back:"si", level:"A2", tag:"connecteurs" },
  { id:"a2-conn-7", front:"entonces", back:"alors", level:"A2", tag:"connecteurs" },
  { id:"a2-conn-8", front:"luego", back:"ensuite", level:"A2", tag:"connecteurs" },
  { id:"a2-conn-9", front:"después", back:"après", level:"A2", tag:"connecteurs" },
  { id:"a2-conn-10", front:"antes", back:"avant", level:"A2", tag:"connecteurs" },
  { id:"a2-conn-11", front:"siempre", back:"toujours", level:"A2", tag:"temps" },
  { id:"a2-conn-12", front:"nunca", back:"jamais", level:"A2", tag:"temps" },

  // ==================== A2 ESPAGNE (15 cartes) ====================
  
  { id:"es-a2-1", front:"anoche", back:"hier soir", level:"A2", tag:"temps", country:"Espagne" },
  { id:"es-a2-2", front:"fuimos", back:"nous sommes allés", level:"A2", tag:"passé", country:"Espagne" },
  { id:"es-a2-3", front:"catedral", back:"cathédrale", level:"A2", tag:"monuments", country:"Espagne" },
  { id:"es-a2-4", front:"barrio", back:"quartier", level:"A2", tag:"ville", country:"Espagne" },
  { id:"es-a2-5", front:"estación", back:"gare", level:"A2", tag:"transport", country:"Espagne" },
  { id:"es-a2-6", front:"billete", back:"billet", level:"A2", tag:"transport", country:"Espagne" },
  { id:"es-a2-7", front:"propina", back:"pourboire", level:"A2", tag:"restaurant", country:"Espagne" },
  { id:"es-a2-8", front:"cuenta", back:"addition", level:"A2", tag:"restaurant", country:"Espagne" },
  { id:"es-a2-9", front:"gazpacho", back:"soupe froide", level:"A2", tag:"nourriture", country:"Espagne" },
  { id:"es-a2-10", front:"calamares", back:"calamars", level:"A2", tag:"nourriture", country:"Espagne" },
  { id:"es-a2-11", front:"churros", back:"churros", level:"A2", tag:"nourriture", country:"Espagne" },
  { id:"es-a2-12", front:"piso", back:"appartement", level:"A2", tag:"logement", country:"Espagne" },
  { id:"es-a2-13", front:"alquiler", back:"loyer", level:"A2", tag:"logement", country:"Espagne" },
  { id:"es-a2-14", front:"móvil", back:"portable", level:"A2", tag:"technologie", country:"Espagne" },
  { id:"es-a2-15", front:"ordenador", back:"ordinateur", level:"A2", tag:"technologie", country:"Espagne" },

  // ==================== A2 MEXIQUE (15 cartes) ====================
  
  { id:"mx-a2-1", front:"mole", back:"sauce traditionnelle", level:"A2", tag:"gastronomie", country:"Mexique" },
  { id:"mx-a2-2", front:"pozole", back:"soupe au maïs", level:"A2", tag:"gastronomie", country:"Mexique" },
  { id:"mx-a2-3", front:"tamales", back:"tamales", level:"A2", tag:"gastronomie", country:"Mexique" },
  { id:"mx-a2-4", front:"elote", back:"épi de maïs", level:"A2", tag:"nourriture", country:"Mexique" },
  { id:"mx-a2-5", front:"esquites", back:"maïs en grains", level:"A2", tag:"nourriture", country:"Mexique" },
  { id:"mx-a2-6", front:"mariachi", back:"musicien traditionnel", level:"A2", tag:"culture", country:"Mexique" },
  { id:"mx-a2-7", front:"fiesta", back:"fête", level:"A2", tag:"culture", country:"Mexique" },
  { id:"mx-a2-8", front:"piñata", back:"piñata", level:"A2", tag:"culture", country:"Mexique" },
  { id:"mx-a2-9", front:"boleto", back:"billet", level:"A2", tag:"transport", country:"Mexique" },
  { id:"mx-a2-10", front:"departamento", back:"appartement", level:"A2", tag:"logement", country:"Mexique" },
  { id:"mx-a2-11", front:"renta", back:"loyer", level:"A2", tag:"logement", country:"Mexique" },
  { id:"mx-a2-12", front:"celular", back:"portable", level:"A2", tag:"technologie", country:"Mexique" },
  { id:"mx-a2-13", front:"computadora", back:"ordinateur", level:"A2", tag:"technologie", country:"Mexique" },
  { id:"mx-a2-14", front:"chido", back:"cool (fam.)", level:"A2", tag:"familier", country:"Mexique" },
  { id:"mx-a2-15", front:"güey", back:"mec (fam.)", level:"A2", tag:"familier", country:"Mexique" },

  // ==================== B1 BASE (30 cartes) ====================
  
  // EXPRESSIONS COMPLEXES
  { id:"b1-expr-1", front:"sin embargo", back:"cependant", level:"B1", tag:"connecteurs" },
  { id:"b1-expr-2", front:"por lo tanto", back:"par conséquent", level:"B1", tag:"connecteurs" },
  { id:"b1-expr-3", front:"además", back:"de plus", level:"B1", tag:"connecteurs" },
  { id:"b1-expr-4", front:"en cambio", back:"en revanche", level:"B1", tag:"connecteurs" },
  { id:"b1-expr-5", front:"a pesar de", back:"malgré", level:"B1", tag:"connecteurs" },
  { id:"b1-expr-6", front:"debido a", back:"en raison de", level:"B1", tag:"connecteurs" },
  { id:"b1-expr-7", front:"con respecto a", back:"en ce qui concerne", level:"B1", tag:"connecteurs" },
  { id:"b1-expr-8", front:"en cuanto a", back:"quant à", level:"B1", tag:"connecteurs" },

  // VERBES AVANCÉS
  { id:"b1-verb-1", front:"lograr", back:"réussir à", level:"B1", tag:"verbes" },
  { id:"b1-verb-2", front:"conseguir", back:"obtenir", level:"B1", tag:"verbes" },
  { id:"b1-verb-3", front:"alcanzar", back:"atteindre", level:"B1", tag:"verbes" },
  { id:"b1-verb-4", front:"desarrollar", back:"développer", level:"B1", tag:"verbes" },
  { id:"b1-verb-5", front:"enfrentar", back:"affronter", level:"B1", tag:"verbes" },
  { id:"b1-verb-6", front:"superar", back:"surmonter", level:"B1", tag:"verbes" },
  { id:"b1-verb-7", front:"proponer", back:"proposer", level:"B1", tag:"verbes" },
  { id:"b1-verb-8", front:"suponer", back:"supposer", level:"B1", tag:"verbes" },
  { id:"b1-verb-9", front:"opinar", back:"donner son avis", level:"B1", tag:"verbes" },
  { id:"b1-verb-10", front:"destacar", back:"souligner/se distinguer", level:"B1", tag:"verbes" },

  // VOCABULAIRE ABSTRAIT
  { id:"b1-abs-1", front:"desafío", back:"défi", level:"B1", tag:"abstrait" },
  { id:"b1-abs-2", front:"ventaja", back:"avantage", level:"B1", tag:"abstrait" },
  { id:"b1-abs-3", front:"desventaja", back:"inconvénient", level:"B1", tag:"abstrait" },
  { id:"b1-abs-4", front:"consecuencia", back:"conséquence", level:"B1", tag:"abstrait" },
  { id:"b1-abs-5", front:"impacto", back:"impact", level:"B1", tag:"abstrait" },
  { id:"b1-abs-6", front:"oportunidad", back:"opportunité", level:"B1", tag:"abstrait" },
  { id:"b1-abs-7", front:"objetivo", back:"objectif", level:"B1", tag:"abstrait" },
  { id:"b1-abs-8", front:"meta", back:"but", level:"B1", tag:"abstrait" },
  { id:"b1-abs-9", front:"esfuerzo", back:"effort", level:"B1", tag:"abstrait" },
  { id:"b1-abs-10", front:"desarrollo", back:"développement", level:"B1", tag:"abstrait" },
  { id:"b1-abs-11", front:"crecimiento", back:"croissance", level:"B1", tag:"abstrait" },
  { id:"b1-abs-12", front:"cambio", back:"changement", level:"B1", tag:"abstrait" },

  // ==================== B1 ESPAGNE (10 cartes) ====================
  
  { id:"es-b1-1", front:"hidalgo", back:"gentilhomme", level:"B1", tag:"littérature", country:"Espagne" },
  { id:"es-b1-2", front:"llanura", back:"plaine", level:"B1", tag:"géographie", country:"Espagne" },
  { id:"es-b1-3", front:"Alhambra", back:"palais mauresque", level:"B1", tag:"monuments", country:"Espagne" },
  { id:"es-b1-4", front:"movida", back:"mouvement culturel", level:"B1", tag:"culture", country:"Espagne" },
  { id:"es-b1-5", front:"autonomía", back:"autonomie", level:"B1", tag:"politique", country:"Espagne" },
  { id:"es-b1-6", front:"tertulia", back:"discussion littéraire", level:"B1", tag:"culture", country:"Espagne" },
  { id:"es-b1-7", front:"peña", back:"club de supporters", level:"B1", tag:"culture", country:"Espagne" },
  { id:"es-b1-8", front:"meseta", back:"plateau", level:"B1", tag:"géographie", country:"Espagne" },
  { id:"es-b1-9", front:"convivencia", back:"coexistence", level:"B1", tag:"histoire", country:"Espagne" },
  { id:"es-b1-10", front:"transición", back:"transition démocratique", level:"B1", tag:"histoire", country:"Espagne" },

  //