// src/data/audio.ts - VERSION ENRICHIE
export type AudioQA = { q: string; accept: string[] };
export type AudioItem = {
  id: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  title: string;
  country: "Espagne" | "Mexique" | "Colombie" | "Argentine";
  src: string;
  script: string;
  questions: AudioQA[];
};

export const audios: AudioItem[] = [
  // ========== A1 ESPAGNE (10 exercices) ==========
  {
    id: "es_a1_saludos",
    level: "A1",
    country: "Espagne",
    title: "Saludos y presentaciones",
    src: "/audio/es_a1_saludos.mp3",
    script: "Hola, me llamo Lucía. Vivo en Valencia y trabajo en una cafetería. Tengo 25 años. ¿Cómo te llamas?",
    questions: [
      { q: "¿Cómo se llama?", accept: ["lucía", "lucia"] },
      { q: "¿Dónde vive?", accept: ["valencia"] },
      { q: "¿Cuántos años tiene?", accept: ["25", "veinticinco"] },
    ],
  },
  {
    id: "es_a1_familia",
    level: "A1",
    country: "Espagne",
    title: "Mi familia",
    src: "/audio/es_a1_familia.mp3",
    script: "Tengo dos hermanos y una hermana. Mi padre se llama Carlos y mi madre se llama Ana. Vivimos en Barcelona.",
    questions: [
      { q: "¿Cuántos hermanos tiene?", accept: ["dos", "2"] },
      { q: "¿Cómo se llama su padre?", accept: ["carlos"] },
      { q: "¿Dónde viven?", accept: ["barcelona"] },
    ],
  },
  {
    id: "es_a1_numeros",
    level: "A1",
    country: "Espagne",
    title: "En la tienda",
    src: "/audio/es_a1_numeros.mp3",
    script: "Buenos días, quiero tres manzanas, dos kilos de tomates y cinco huevos. ¿Cuánto es?",
    questions: [
      { q: "¿Cuántas manzanas quiere?", accept: ["tres", "3"] },
      { q: "¿Cuántos kilos de tomates?", accept: ["dos", "2"] },
    ],
  },
  {
    id: "es_a1_hora",
    level: "A1",
    country: "Espagne",
    title: "¿Qué hora es?",
    src: "/audio/es_a1_hora.mp3",
    script: "Son las ocho de la mañana. Tengo que ir al trabajo a las nueve.",
    questions: [
      { q: "¿Qué hora es?", accept: ["ocho", "las ocho"] },
      { q: "¿A qué hora va al trabajo?", accept: ["nueve", "las nueve", "9"] },
    ],
  },
  {
    id: "es_a1_colores",
    level: "A1",
    country: "Espagne",
    title: "Los colores",
    src: "/audio/es_a1_colores.mp3",
    script: "Mi casa es blanca. Tengo un coche rojo y un gato negro.",
    questions: [
      { q: "¿De qué color es la casa?", accept: ["blanca", "blanco"] },
      { q: "¿De qué color es el gato?", accept: ["negro"] },
    ],
  },
  {
    id: "es_a1_comida",
    level: "A1",
    country: "Espagne",
    title: "En el restaurante",
    src: "/audio/es_a1_comida.mp3",
    script: "Para mí, una paella y un vino tinto, por favor. De postre, un flan.",
    questions: [
      { q: "¿Qué pide de comer?", accept: ["paella", "una paella"] },
      { q: "¿Qué pide de postre?", accept: ["flan", "un flan"] },
    ],
  },
  {
    id: "es_a1_dias",
    level: "A1",
    country: "Espagne",
    title: "Los días de la semana",
    src: "/audio/es_a1_dias.mp3",
    script: "Trabajo de lunes a viernes. Los sábados y domingos descanso.",
    questions: [
      { q: "¿Cuándo trabaja?", accept: ["lunes a viernes", "de lunes a viernes"] },
      { q: "¿Cuándo descansa?", accept: ["sábados y domingos", "fin de semana"] },
    ],
  },
  {
    id: "es_a1_clima",
    level: "A1",
    country: "Espagne",
    title: "El tiempo",
    src: "/audio/es_a1_clima.mp3",
    script: "Hoy hace sol y calor. Mañana va a llover.",
    questions: [
      { q: "¿Qué tiempo hace hoy?", accept: ["sol", "calor", "hace sol"] },
      { q: "¿Qué tiempo hará mañana?", accept: ["llover", "lluvia", "va a llover"] },
    ],
  },
  {
    id: "es_a1_animales",
    level: "A1",
    country: "Espagne",
    title: "Los animales",
    src: "/audio/es_a1_animales.mp3",
    script: "Tengo un perro grande y dos gatos pequeños. Me gustan mucho los animales.",
    questions: [
      { q: "¿Qué animales tiene?", accept: ["perro y gatos", "un perro y dos gatos"] },
      { q: "¿Cómo es el perro?", accept: ["grande"] },
    ],
  },
  {
    id: "es_a1_transporte",
    level: "A1",
    country: "Espagne",
    title: "Transporte",
    src: "/audio/es_a1_transporte.mp3",
    script: "Voy al trabajo en metro. Tarda veinte minutos. A veces voy en autobús.",
    questions: [
      { q: "¿Cómo va al trabajo?", accept: ["metro", "en metro"] },
      { q: "¿Cuánto tarda?", accept: ["veinte minutos", "20 minutos"] },
    ],
  },

  // ========== A1 MEXIQUE (10 exercices) ==========
  {
    id: "mx_a1_mercado",
    level: "A1",
    country: "Mexique",
    title: "En el mercado",
    src: "/audio/mx_a1_mercado.mp3",
    script: "Quiero un kilo de tortillas y medio kilo de frijoles. También dos chiles.",
    questions: [
      { q: "¿Qué quiere comprar?", accept: ["tortillas y frijoles", "tortillas frijoles chiles"] },
      { q: "¿Cuántas tortillas?", accept: ["un kilo", "kilo"] },
    ],
  },
  {
    id: "mx_a1_tacos",
    level: "A1",
    country: "Mexique",
    title: "Pidiendo tacos",
    src: "/audio/mx_a1_tacos.mp3",
    script: "Quiero tres tacos de carne asada con cilantro y cebolla, por favor.",
    questions: [
      { q: "¿Cuántos tacos pide?", accept: ["tres", "3"] },
      { q: "¿De qué son los tacos?", accept: ["carne asada", "carne"] },
    ],
  },
  {
    id: "mx_a1_camion",
    level: "A1",
    country: "Mexique",
    title: "El camión",
    src: "/audio/mx_a1_camion.mp3",
    script: "Tomo el camión para ir al centro. El boleto cuesta diez pesos.",
    questions: [
      { q: "¿Qué toma?", accept: ["camión", "el camión"] },
      { q: "¿Cuánto cuesta?", accept: ["diez pesos", "10 pesos"] },
    ],
  },
  {
    id: "mx_a1_familia_mx",
    level: "A1",
    country: "Mexique",
    title: "Mi familia mexicana",
    src: "/audio/mx_a1_familia_mx.mp3",
    script: "Vivo con mi mamá, mi papá y mis dos hermanas. Somos cinco en total.",
    questions: [
      { q: "¿Con quién vive?", accept: ["familia", "mamá papá hermanas"] },
      { q: "¿Cuántos son?", accept: ["cinco", "5"] },
    ],
  },
  {
    id: "mx_a1_escuela",
    level: "A1",
    country: "Mexique",
    title: "En la escuela",
    src: "/audio/mx_a1_escuela.mp3",
    script: "Estudio en la escuela de lunes a viernes. Mi clase favorita es matemáticas.",
    questions: [
      { q: "¿Cuándo estudia?", accept: ["lunes a viernes", "de lunes a viernes"] },
      { q: "¿Cuál es su clase favorita?", accept: ["matemáticas", "matematicas"] },
    ],
  },
  {
    id: "mx_a1_casa",
    level: "A1",
    country: "Mexique",
    title: "Mi casa",
    src: "/audio/mx_a1_casa.mp3",
    script: "Mi casa tiene tres cuartos, una cocina y un patio grande.",
    questions: [
      { q: "¿Cuántos cuartos tiene?", accept: ["tres", "3"] },
      { q: "¿Qué más tiene?", accept: ["cocina y patio", "patio"] },
    ],
  },
  {
    id: "mx_a1_frutas",
    level: "A1",
    country: "Mexique",
    title: "Frutas mexicanas",
    src: "/audio/mx_a1_frutas.mp3",
    script: "Me gustan mucho las mangos y las papayas. También el aguacate.",
    questions: [
      { q: "¿Qué frutas le gustan?", accept: ["mangos y papayas", "mango papaya"] },
      { q: "¿Qué más le gusta?", accept: ["aguacate", "el aguacate"] },
    ],
  },
  {
    id: "mx_a1_fiesta",
    level: "A1",
    country: "Mexique",
    title: "La fiesta",
    src: "/audio/mx_a1_fiesta.mp3",
    script: "Mañana es mi cumpleaños. Voy a hacer una fiesta con música y comida.",
    questions: [
      { q: "¿Cuándo es su cumpleaños?", accept: ["mañana"] },
      { q: "¿Qué va a hacer?", accept: ["fiesta", "una fiesta"] },
    ],
  },
  {
    id: "mx_a1_trabajo_mx",
    level: "A1",
    country: "Mexique",
    title: "Mi trabajo",
    src: "/audio/mx_a1_trabajo_mx.mp3",
    script: "Trabajo en una tienda. Vendo ropa y zapatos.",
    questions: [
      { q: "¿Dónde trabaja?", accept: ["tienda", "una tienda"] },
      { q: "¿Qué vende?", accept: ["ropa y zapatos", "ropa zapatos"] },
    ],
  },
  {
    id: "mx_a1_bebidas",
    level: "A1",
    country: "Mexique",
    title: "Bebidas",
    src: "/audio/mx_a1_bebidas.mp3",
    script: "Quiero un agua de jamaica y un café con leche, por favor.",
    questions: [
      { q: "¿Qué bebidas pide?", accept: ["agua de jamaica y café", "jamaica cafe"] },
    ],
  },

  // ========== A2 ESPAGNE (10 exercices) ==========
  {
    id: "es_a2_rutina",
    level: "A2",
    country: "Espagne",
    title: "Mi rutina diaria",
    src: "/audio/es_a2_rutina.mp3",
    script: "De lunes a viernes me levanto a las seis y media. Desayuno rápido y voy al trabajo en metro. Por la tarde estudio español una hora antes de cenar.",
    questions: [
      { q: "¿A qué hora se levanta?", accept: ["seis y media", "6:30"] },
      { q: "¿Cómo va al trabajo?", accept: ["metro", "en metro"] },
      { q: "¿Cuánto estudia?", accept: ["una hora", "1 hora"] },
    ],
  },
  {
    id: "es_a2_sevilla",
    level: "A2",
    country: "Espagne",
    title: "Visita a Sevilla",
    src: "/audio/es_a2_sevilla.mp3",
    script: "El sábado fuimos a Sevilla. Visitamos la catedral por la mañana y por la tarde paseamos por el barrio de Triana. Por la noche comimos tapas.",
    questions: [
      { q: "¿Cuándo fueron?", accept: ["sábado", "el sábado"] },
      { q: "¿Qué visitaron?", accept: ["catedral", "la catedral"] },
      { q: "¿Qué hicieron por la noche?", accept: ["comieron tapas", "tapas"] },
    ],
  },
  {
    id: "es_a2_infancia",
    level: "A2",
    country: "Espagne",
    title: "Cuando era niño",
    src: "/audio/es_a2_infancia.mp3",
    script: "Cuando era pequeño, vivía en un pueblo cerca de Madrid. Jugaba en la calle con mis amigos todos los días.",
    questions: [
      { q: "¿Dónde vivía?", accept: ["pueblo", "un pueblo cerca de madrid"] },
      { q: "¿Con quién jugaba?", accept: ["amigos", "sus amigos"] },
    ],
  },
  {
    id: "es_a2_vacaciones",
    level: "A2",
    country: "Espagne",
    title: "Vacaciones en la playa",
    src: "/audio/es_a2_vacaciones.mp3",
    script: "El verano pasado fui a Málaga con mi familia. Pasamos dos semanas en la playa. Nadamos mucho y comimos pescado fresco.",
    questions: [
      { q: "¿Adónde fue?", accept: ["málaga", "malaga"] },
      { q: "¿Cuánto tiempo?", accept: ["dos semanas", "2 semanas"] },
    ],
  },
  {
    id: "es_a2_trabajo",
    level: "A2",
    country: "Espagne",
    title: "En la oficina",
    src: "/audio/es_a2_trabajo.mp3",
    script: "Trabajo en una oficina desde hace tres años. Me gusta mi trabajo pero a veces es estresante.",
    questions: [
      { q: "¿Cuánto tiempo lleva trabajando?", accept: ["tres años", "3 años"] },
      { q: "¿Cómo es el trabajo?", accept: ["estresante", "a veces estresante"] },
    ],
  },
  {
    id: "es_a2_restaurante",
    level: "A2",
    country: "Espagne",
    title: "Cena en restaurante",
    src: "/audio/es_a2_restaurante.mp3",
    script: "Anoche cenamos en un restaurante italiano. Pedí pasta y mi novio pidió pizza. Estaba todo delicioso.",
    questions: [
      { q: "¿Qué tipo de restaurante?", accept: ["italiano"] },
      { q: "¿Qué pidió ella?", accept: ["pasta"] },
    ],
  },
  {
    id: "es_a2_planes",
    level: "A2",
    country: "Espagne",
    title: "Planes para el fin de semana",
    src: "/audio/es_a2_planes.mp3",
    script: "Este fin de semana voy a ir al cine con mis amigos. Después vamos a tomar algo en un bar del centro.",
    questions: [
      { q: "¿Qué va a hacer?", accept: ["ir al cine", "cine"] },
      { q: "¿Con quién?", accept: ["amigos", "sus amigos"] },
    ],
  },
  {
    id: "es_a2_medico",
    level: "A2",
    country: "Espagne",
    title: "En el médico",
    src: "/audio/es_a2_medico.mp3",
    script: "Ayer fui al médico porque me dolía la garganta. Me recetó antibióticos y me dijo que descanse.",
    questions: [
      { q: "¿Por qué fue al médico?", accept: ["dolor garganta", "le dolía la garganta"] },
      { q: "¿Qué le recetó?", accept: ["antibióticos", "antibioticos"] },
    ],
  },
  {
    id: "es_a2_compras",
    level: "A2",
    country: "Espagne",
    title: "De compras",
    src: "/audio/es_a2_compras.mp3",
    script: "Esta mañana he ido al supermercado. He comprado verduras, fruta y carne para toda la semana.",
    questions: [
      { q: "¿Adónde ha ido?", accept: ["supermercado", "al supermercado"] },
      { q: "¿Qué ha comprado?", accept: ["verduras fruta carne", "comida"] },
    ],
  },
  {
    id: "es_a2_deporte",
    level: "A2",
    country: "Espagne",
    title: "Hacer deporte",
    src: "/audio/es_a2_deporte.mp3",
    script: "Voy al gimnasio tres veces por semana. Hago ejercicio durante una hora. Me siento mucho mejor.",
    questions: [
      { q: "¿Cuántas veces va?", accept: ["tres", "tres veces", "3"] },
      { q: "¿Cuánto tiempo hace ejercicio?", accept: ["una hora", "1 hora"] },
    ],
  },

  // ========== A2 MEXIQUE (10 exercices) ==========
  {
    id: "mx_a2_dia_muertos",
    level: "A2",
    country: "Mexique",
    title: "Día de Muertos",
    src: "/audio/mx_a2_dia_muertos.mp3",
    script: "El dos de noviembre celebramos el Día de Muertos. Ponemos flores y velas en el altar. Hacemos pan de muerto y visitamos el cementerio.",
    questions: [
      { q: "¿Cuándo es?", accept: ["dos de noviembre", "2 de noviembre"] },
      { q: "¿Qué ponen en el altar?", accept: ["flores y velas", "flores velas"] },
    ],
  },
  {
    id: "mx_a2_mariachis",
    level: "A2",
    country: "Mexique",
    title: "Los mariachis",
    src: "/audio/mx_a2_mariachis.mp3",
    script: "En la plaza de Garibaldi tocan mariachis toda la noche. Llevan trajes elegantes y tocan guitarras, violines y trompetas.",
    questions: [
      { q: "¿Dónde tocan?", accept: ["plaza garibaldi", "garibaldi"] },
      { q: "¿Qué instrumentos tocan?", accept: ["guitarras violines trompetas", "guitarra violin trompeta"] },
    ],
  },
  {
    id: "mx_a2_oaxaca",
    level: "A2",
    country: "Mexique",
    title: "Viaje a Oaxaca",
    src: "/audio/mx_a2_oaxaca.mp3",
    script: "El mes pasado viajé a Oaxaca. Probé el mole negro y visité Monte Albán. La ciudad es muy bonita y la gente muy amable.",
    questions: [
      { q: "¿Cuándo viajó?", accept: ["mes pasado", "el mes pasado"] },
      { q: "¿Qué comió?", accept: ["mole negro", "mole"] },
    ],
  },
  {
    id: "mx_a2_independencia",
    level: "A2",
    country: "Mexique",
    title: "Independencia",
    src: "/audio/mx_a2_independencia.mp3",
    script: "El 16 de septiembre celebramos la independencia de México. Hay música, baile y fuegos artificiales. Gritamos ¡Viva México!",
    questions: [
      { q: "¿Qué fecha es?", accept: ["16 septiembre", "16 de septiembre"] },
      { q: "¿Qué gritan?", accept: ["viva méxico", "viva mexico"] },
    ],
  },
  {
    id: "mx_a2_abuela",
    level: "A2",
    country: "Mexique",
    title: "Mi abuela cocina",
    src: "/audio/mx_a2_abuela.mp3",
    script: "Mi abuela cocina muy bien. Hace tamales, pozole y chiles rellenos. Siempre nos invita a comer los domingos.",
    questions: [
      { q: "¿Qué cocina?", accept: ["tamales pozole chiles", "comida mexicana"] },
      { q: "¿Cuándo invita?", accept: ["domingos", "los domingos"] },
    ],
  },
  {
    id: "mx_a2_universidad",
    level: "A2",
    country: "Mexique",
    title: "En la universidad",
    src: "/audio/mx_a2_universidad.mp3",
    script: "Estudio ingeniería en la UNAM. Las clases son difíciles pero interesantes. Tengo muchos proyectos que hacer.",
    questions: [
      { q: "¿Qué estudia?", accept: ["ingeniería", "ingenieria"] },
      { q: "¿Dónde?", accept: ["unam", "la unam"] },
    ],
  },
  {
    id: "mx_a2_chiapas",
    level: "A2",
    country: "Mexique",
    title: "Viaje a Chiapas",
    src: "/audio/mx_a2_chiapas.mp3",
    script: "Fuimos a Chiapas en diciembre. Visitamos Palenque y San Cristóbal. Vimos muchas ruinas mayas y comimos comida tradicional.",
    questions: [
      { q: "¿Qué visitaron?", accept: ["palenque san cristóbal", "palenque"] },
      { q: "¿Qué vieron?", accept: ["ruinas mayas", "ruinas"] },
    ],
  },
  {
    id: "mx_a2_metro",
    level: "A2",
    country: "Mexique",
    title: "El metro de la Ciudad",
    src: "/audio/mx_a2_metro.mp3",
    script: "Uso el metro todos los días para ir al trabajo. Es rápido y barato. La línea 3 está siempre muy llena.",
    questions: [
      { q: "¿Cómo va al trabajo?", accept: ["metro", "en metro"] },
      { q: "¿Qué línea está llena?", accept: ["línea 3", "linea 3", "3"] },
    ],
  },
  {
    id: "mx_a2_lucha",
    level: "A2",
    country: "Mexique",
    title: "Lucha libre",
    src: "/audio/mx_a2_lucha.mp3",
    script: "Ayer fui a ver lucha libre en la Arena México. Los luchadores llevaban máscaras de colores. Fue muy emocionante.",
    questions: [
      { q: "¿Dónde fue?", accept: ["arena méxico", "arena mexico"] },
      { q: "¿Qué llevaban?", accept: ["máscaras", "mascaras"] },
    ],
  },
  {
    id: "mx_a2_posada",
    level: "A2",
    country: "Mexique",
    title: "Las posadas",
    src: "/audio/mx_a2_posada.mp3",
    script: "En diciembre celebramos las posadas. Cantamos villancicos, rompemos piñatas y comemos ponche caliente.",
    questions: [
      { q: "¿Cuándo son?", accept: ["diciembre", "en diciembre"] },
      { q: "¿Qué hacen?", accept: ["cantar romper piñatas", "villancicos piñatas"] },
    ],
  },

  // ========== B1 ESPAGNE (5 exercices) ==========
  {
    id: "es_b1_viaje_granada",
    level: "B1",
    country: "Espagne",
    title: "Fin de semana en Granada",
    src: "/audio/es_b1_viaje_granada.mp3",
    script: "El sábado por la mañana salimos temprano hacia Granada. Visitamos la Alhambra que es impresionante. Por la noche probamos tapas en el Albaicín y escuchamos flamenco en vivo. El domingo regresamos en tren muy cansados pero felices.",
    questions: [
      { q: "¿Qué visitaron?", accept: ["alhambra", "la alhambra"] },
      { q: "¿Dónde comieron tapas?", accept: ["albaicín", "albaicin", "el albaicín"] },
      { q: "¿Cómo regresaron?", accept: ["tren", "en tren"] },
    ],
  },
  {
    id: "es_b1_cambio_trabajo",
    level: "B1",
    country: "Espagne",
    title: "Cambio de trabajo",
    src: "/audio/es_b1_cambio_trabajo.mp3",
    script: "Después de cinco años trabajando en la misma empresa, decidí buscar nuevas oportunidades. Aunque era arriesgado, sentía que necesitaba un cambio. Ahora estoy mucho más contento con mi nuevo puesto.",
    questions: [
      { q: "¿Cuánto tiempo trabajó allí?", accept: ["cinco años", "5 años"] },
      { q: "¿Por qué cambió?", accept: ["necesitaba cambio", "quería cambio"] },
    ],
  },
  {
    id: "es_b1_aprender_idiomas",
    level: "B1",
    country: "Espagne",
    title: "Aprender idiomas",
    src: "/audio/es_b1_aprender_idiomas.mp3",
    script: "Creo que aprender idiomas es fundamental en el mundo actual. No solo te permite comunicarte, sino también entender otras culturas. Por eso estudio inglés y francés además del español.",
    questions: [
      { q: "¿Por qué es importante?", accept: ["comunicarse entender culturas", "fundamental"] },
      { q: "¿Qué idiomas estudia?", accept: ["inglés francés", "ingles frances"] },
    ],
  },
  {
    id: "es_b1_medio_ambiente",
    level: "B1",
    country: "Espagne",
    title: "Medio ambiente",
    src: "/audio/es_b1_medio_ambiente.mp3",
    script: "El cambio climático es uno de los problemas más graves que enfrentamos. Es importante reciclar, usar menos plástico y consumir de manera responsable. Todos debemos contribuir.",
    questions: [
      { q: "¿Qué problema menciona?", accept: ["cambio climático", "cambio climatico"] },
      { q: "¿Qué debemos hacer?", accept: ["reciclar consumir responsable", "reciclar"] },
    ],
  },
  {
    id: "es_b1_tecnologia",
    level: "B1",
    country: "Espagne",
    title: "Tecnología en la vida diaria",
    src: "/audio/es_b1_tecnologia.mp3",
    script: "La tecnología ha cambiado completamente nuestra forma de vivir. Ahora podemos trabajar desde casa, comprar online y