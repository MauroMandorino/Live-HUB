/* ============================================================
   PSG Performance Workspace — language layer (EN/FR/IT/ES).
   Ported from the research-hub + tech-stack prototypes so the
   same localStorage key ('hubLang') and translations carry over.
   Admin/management surfaces stay EN, as in the originals.
     window.HubLang — {get, set, subscribe}
     window.useLang() — {lang, setLang, t, locale}
   ============================================================ */
const HUB_T = {
  en: {
    locale: 'en-GB',
    connecting: 'Connecting to the database...', offline: 'Could not reach the database. Check your connection and reload.',
    today: 'Today', tomorrow: 'Tomorrow', inDays: 'in %n days',
    // Research hub sections
    r_overview: 'Overview', r_idea: 'Submit idea', r_calendar: 'Calendar', r_papers: 'Papers', r_library: 'PDF Library', r_tip: 'Tip of the week', r_phd: 'PhD activities', r_quiz: 'Quiz', r_admin: 'Screening & requests',
    ideaNm: 'Submit a research idea', ideaDesc: 'Share a research proposal for review.',
    calNm: 'Research calendar', calDesc: 'Meetings, congresses, and abstract deadlines.',
    papersNm: 'Latest papers', papersDesc: 'PubMed feed, rate articles, request PDFs.',
    tipNm: 'Tip of the week', tipDesc: 'Short posts with insights, charts, and images.',
    phdNm: 'PhD activities', phdDesc: 'Personal tracker for each PhD student.',
    libraryNm: 'PDF Library', libraryDesc: 'Papers already available on request.',
    quizNm: 'Quiz Challenge', quizDesc: 'Weekly quiz with leaderboard.',
    nextUp: 'Upcoming events', viewCal: 'View calendar', noEvents: 'No upcoming events', tipNoPosts: 'No posts yet', readPost: 'Read',
    meeting: 'Research meeting', congress: 'Congress', deadline: 'Abstract / deadline', other: 'Other',
    // Idea form
    fName: 'Your name', fEmail: 'Your email', fTitle: 'Idea title', fObjective: 'Objective', fSample: 'Sample / population', fMethods: 'Methods', fLinks: 'Related links (optional)', fNotes: 'Additional notes (optional)',
    ideaSubmit: 'Submit idea', ideaSent: 'Thank you. Your idea was submitted for review.', ideaFailed: 'Could not submit right now. Please try again.', ideaIntro: 'Share a research proposal with the department. The research lead reviews every submission.',
    // Papers
    ratings: 'ratings', requestPdf: 'Request PDF', requestSent: 'Request sent', yourEmail: 'Your email', note: 'Note (optional)', notePh: 'Anything the team should know...', send: 'Send', cancel: 'Cancel',
    sortDate: 'Newest', sortRating: 'Top rated', fWeek: 'Week', fMonth: 'Month', fYear: 'Year', fAll: 'All', loadingFeed: 'Loading the article feed...', feedFailed: 'Could not load the article feed.',
    // Library
    libInstructions: 'These papers are available as PDFs on our shared OneDrive folder. Search the PMID shown below in the folder to find the file.',
    journal: 'Journal', copied: 'Copied!', noEntries: 'No papers in the library yet.',
    // Calendar
    upcoming: 'Upcoming events', allTypes: 'All', noEventsYet: 'No events yet',
    // Quiz
    qUsername: 'Choose a username', qUsernamePh: 'e.g. marco.r', qStart: 'Start', qWelcome: 'Welcome', qPlay: 'Play this week\u2019s quiz', qLeaderboard: 'View leaderboard', qLogout: 'Log out', qAlready: 'You already played this week. Come back next Monday!', qNoQuestions: 'No quiz available yet.', qQuestion: 'Question', qOf: 'of', qFinished: 'Quiz complete', qSubmitted: 'Your score was submitted to the leaderboard.', qBack: 'Back', qThisWeek: 'Last week\u2019s podium', qPoints: 'pts', qNoScores: 'No scores yet.', qGold: 'Gold', qSilver: 'Silver', qBronze: 'Bronze',
    // Tech stack
    t_search: 'Search equipment, brand, purpose...', t_domain: 'Domain', t_owner: 'Owner', t_datatype: 'Data type', t_grid: 'Grid', t_table: 'Table', t_bookings: 'Bookings', t_items: 'items', t_item: 'item', t_book: 'Book', t_bookCal: 'Book on the calendar', t_noResults: 'No equipment found', t_noResultsSub: 'Try adjusting your search or filters', t_upBookings: 'Upcoming bookings', t_noBookings: 'No upcoming bookings for this equipment.', t_noBookingsAll: 'No upcoming bookings across any equipment.', t_confirmed: 'Booking confirmed. It now appears in the schedule below.', t_yourName: 'Your name', t_start: 'Start date', t_end: 'End date', t_where: 'Where', t_what: 'What for', t_confirm: 'Confirm booking', t_allUpcoming: 'All upcoming bookings',
    // PhD
    p_pick: 'Select your university and enter your PIN', p_pin: 'PIN code', p_access: 'Access', p_wrongPin: 'Incorrect PIN. Please try again.', p_addStudy: 'Add study', p_noStudies: 'No studies yet. Click "Add study" to get started.', p_presentations: 'Presentations & abstracts', p_addPres: 'Add presentation', p_noPres: 'No presentations yet.', p_back: 'Back'
  },
  fr: {
    locale: 'fr-FR',
    connecting: 'Connexion \u00e0 la base de donn\u00e9es...', offline: "Impossible d'acc\u00e9der \u00e0 la base de donn\u00e9es. V\u00e9rifiez votre connexion et rechargez.",
    today: "Aujourd'hui", tomorrow: 'Demain', inDays: 'dans %n jours',
    r_overview: 'Aper\u00e7u', r_idea: 'Soumettre une id\u00e9e', r_calendar: 'Calendrier', r_papers: 'Articles', r_library: 'PDF Library', r_tip: 'Tip of the week', r_phd: 'PhD activities', r_quiz: 'Quiz', r_admin: '\u00c9valuation & demandes',
    ideaNm: 'Soumettre une id\u00e9e de recherche', ideaDesc: 'Partagez une proposition de recherche pour \u00e9valuation.',
    calNm: 'Calendrier recherche', calDesc: 'R\u00e9unions, congr\u00e8s et \u00e9ch\u00e9ances d\u2019abstract.',
    papersNm: 'Derniers articles', papersDesc: 'Flux PubMed, notez les articles, demandez des PDF.',
    tipNm: 'Tip of the week', tipDesc: 'Posts courts avec insights, graphiques et images.',
    phdNm: 'PhD activities', phdDesc: 'Suivi personnel pour chaque doctorant.',
    libraryNm: 'PDF Library', libraryDesc: 'Articles d\u00e9j\u00e0 disponibles sur demande.',
    quizNm: 'Quiz Challenge', quizDesc: 'Quiz hebdomadaire avec classement.',
    nextUp: '\u00c9v\u00e9nements \u00e0 venir', viewCal: 'Voir le calendrier', noEvents: 'Aucun \u00e9v\u00e9nement \u00e0 venir', tipNoPosts: 'Aucun post pour l\u2019instant', readPost: 'Lire',
    meeting: 'R\u00e9union de recherche', congress: 'Congr\u00e8s', deadline: 'Abstract / \u00e9ch\u00e9ance', other: 'Autre',
    fName: 'Votre nom', fEmail: 'Votre email', fTitle: 'Titre de l\u2019id\u00e9e', fObjective: 'Objectif', fSample: '\u00c9chantillon / population', fMethods: 'M\u00e9thodes', fLinks: 'Liens associ\u00e9s (facultatif)', fNotes: 'Notes suppl\u00e9mentaires (facultatif)',
    ideaSubmit: 'Soumettre l\u2019id\u00e9e', ideaSent: 'Merci. Votre id\u00e9e a \u00e9t\u00e9 soumise pour \u00e9valuation.', ideaFailed: 'Envoi impossible pour le moment. R\u00e9essayez.', ideaIntro: 'Partagez une proposition de recherche avec le d\u00e9partement. Le responsable recherche \u00e9value chaque soumission.',
    ratings: 'votes', requestPdf: 'Demander le PDF', requestSent: 'Demande envoy\u00e9e', yourEmail: 'Votre email', note: 'Note (facultatif)', notePh: '\u00c0 signaler \u00e0 l\u2019\u00e9quipe...', send: 'Envoyer', cancel: 'Annuler',
    sortDate: 'R\u00e9cents', sortRating: 'Mieux not\u00e9s', fWeek: 'Semaine', fMonth: 'Mois', fYear: 'Ann\u00e9e', fAll: 'Tous', loadingFeed: 'Chargement du flux d\u2019articles...', feedFailed: 'Impossible de charger le flux d\u2019articles.',
    libInstructions: 'Ces articles sont disponibles en PDF dans notre dossier OneDrive partag\u00e9. Recherchez le PMID indiqu\u00e9 ci-dessous dans le dossier pour trouver le fichier.',
    journal: 'Revue', copied: 'Copi\u00e9 !', noEntries: 'Aucun article dans la biblioth\u00e8que pour l\u2019instant.',
    upcoming: '\u00c9v\u00e9nements \u00e0 venir', allTypes: 'Tous', noEventsYet: 'Aucun \u00e9v\u00e9nement pour l\u2019instant',
    qUsername: 'Choisissez un pseudo', qUsernamePh: 'ex. marco.r', qStart: 'Commencer', qWelcome: 'Bienvenue', qPlay: 'Jouer au quiz de la semaine', qLeaderboard: 'Voir le classement', qLogout: 'D\u00e9connexion', qAlready: 'Vous avez d\u00e9j\u00e0 jou\u00e9 cette semaine. Revenez lundi !', qNoQuestions: 'Aucun quiz disponible pour l\u2019instant.', qQuestion: 'Question', qOf: 'sur', qFinished: 'Quiz termin\u00e9', qSubmitted: 'Votre score a \u00e9t\u00e9 envoy\u00e9 au classement.', qBack: 'Retour', qThisWeek: 'Podium de la semaine derni\u00e8re', qPoints: 'pts', qNoScores: 'Aucun score pour l\u2019instant.', qGold: 'Or', qSilver: 'Argent', qBronze: 'Bronze',
    t_search: '\u00c9quipement, marque, usage...', t_domain: 'Domaine', t_owner: 'Propri\u00e9taire', t_datatype: 'Type de donn\u00e9es', t_grid: 'Grille', t_table: 'Tableau', t_bookings: 'R\u00e9servations', t_items: '\u00e9l\u00e9ments', t_item: '\u00e9l\u00e9ment', t_book: 'R\u00e9server', t_bookCal: 'R\u00e9server au calendrier', t_noResults: 'Aucun \u00e9quipement trouv\u00e9', t_noResultsSub: 'Ajustez votre recherche ou vos filtres', t_upBookings: 'R\u00e9servations \u00e0 venir', t_noBookings: 'Aucune r\u00e9servation \u00e0 venir pour cet \u00e9quipement.', t_noBookingsAll: 'Aucune r\u00e9servation \u00e0 venir.', t_confirmed: 'R\u00e9servation confirm\u00e9e. Elle appara\u00eet dans le planning ci-dessous.', t_yourName: 'Votre nom', t_start: 'Date de d\u00e9but', t_end: 'Date de fin', t_where: 'O\u00f9', t_what: 'Pour quoi', t_confirm: 'Confirmer la r\u00e9servation', t_allUpcoming: 'Toutes les r\u00e9servations \u00e0 venir',
    p_pick: 'S\u00e9lectionnez votre universit\u00e9 et saisissez votre PIN', p_pin: 'Code PIN', p_access: 'Acc\u00e9der', p_wrongPin: 'PIN incorrect. R\u00e9essayez.', p_addStudy: 'Ajouter une \u00e9tude', p_noStudies: 'Aucune \u00e9tude. Cliquez sur \u00ab Ajouter une \u00e9tude \u00bb.', p_presentations: 'Pr\u00e9sentations & abstracts', p_addPres: 'Ajouter une pr\u00e9sentation', p_noPres: 'Aucune pr\u00e9sentation pour l\u2019instant.', p_back: 'Retour'
  },
  it: {
    locale: 'it-IT',
    connecting: 'Connessione al database...', offline: 'Impossibile raggiungere il database. Controlla la connessione e ricarica.',
    today: 'Oggi', tomorrow: 'Domani', inDays: 'tra %n giorni',
    r_overview: 'Panoramica', r_idea: 'Sottometti idea', r_calendar: 'Calendario', r_papers: 'Articoli', r_library: 'PDF Library', r_tip: 'Tip of the week', r_phd: 'PhD activities', r_quiz: 'Quiz', r_admin: 'Screening & richieste',
    ideaNm: 'Sottometti un\u2019idea di ricerca', ideaDesc: 'Condividi una proposta di ricerca per la revisione.',
    calNm: 'Calendario ricerca', calDesc: 'Meeting, congressi e scadenze abstract.',
    papersNm: 'Ultimi articoli', papersDesc: 'Feed PubMed, vota gli articoli, richiedi i PDF.',
    tipNm: 'Tip of the week', tipDesc: 'Post brevi con insight, grafici e immagini.',
    phdNm: 'PhD activities', phdDesc: 'Tracker personale per ogni dottorando.',
    libraryNm: 'PDF Library', libraryDesc: 'Articoli gi\u00e0 disponibili su richiesta.',
    quizNm: 'Quiz Challenge', quizDesc: 'Quiz settimanale con classifica.',
    nextUp: 'Prossimi eventi', viewCal: 'Vedi calendario', noEvents: 'Nessun evento in programma', tipNoPosts: 'Nessun post ancora', readPost: 'Leggi',
    meeting: 'Research meeting', congress: 'Congresso', deadline: 'Abstract / scadenza', other: 'Altro',
    fName: 'Il tuo nome', fEmail: 'La tua email', fTitle: 'Titolo dell\u2019idea', fObjective: 'Obiettivo', fSample: 'Campione / popolazione', fMethods: 'Metodi', fLinks: 'Link correlati (opzionale)', fNotes: 'Note aggiuntive (opzionale)',
    ideaSubmit: 'Invia idea', ideaSent: 'Grazie. La tua idea \u00e8 stata inviata per la revisione.', ideaFailed: 'Invio non riuscito. Riprova.', ideaIntro: 'Condividi una proposta di ricerca con il dipartimento. Il responsabile ricerca valuta ogni proposta.',
    ratings: 'voti', requestPdf: 'Richiedi PDF', requestSent: 'Richiesta inviata', yourEmail: 'La tua email', note: 'Nota (opzionale)', notePh: 'Qualcosa da segnalare al team...', send: 'Invia', cancel: 'Annulla',
    sortDate: 'Recenti', sortRating: 'Pi\u00f9 votati', fWeek: 'Settimana', fMonth: 'Mese', fYear: 'Anno', fAll: 'Tutti', loadingFeed: 'Caricamento del feed articoli...', feedFailed: 'Impossibile caricare il feed articoli.',
    libInstructions: 'Questi articoli sono disponibili in PDF nella nostra cartella OneDrive condivisa. Cerca il PMID indicato qui sotto nella cartella per trovare il file.',
    journal: 'Giornale', copied: 'Copiato!', noEntries: 'Nessun articolo ancora nella libreria.',
    upcoming: 'Prossimi eventi', allTypes: 'Tutti', noEventsYet: 'Nessun evento ancora',
    qUsername: 'Scegli un username', qUsernamePh: 'es. marco.r', qStart: 'Inizia', qWelcome: 'Benvenuto', qPlay: 'Gioca il quiz della settimana', qLeaderboard: 'Vedi classifica', qLogout: 'Esci', qAlready: 'Hai gi\u00e0 giocato questa settimana. Torna luned\u00ec!', qNoQuestions: 'Nessun quiz disponibile.', qQuestion: 'Domanda', qOf: 'di', qFinished: 'Quiz completato', qSubmitted: 'Il tuo punteggio \u00e8 stato inviato alla classifica.', qBack: 'Indietro', qThisWeek: 'Podio della settimana scorsa', qPoints: 'pt', qNoScores: 'Nessun punteggio ancora.', qGold: 'Oro', qSilver: 'Argento', qBronze: 'Bronzo',
    t_search: 'Attrezzatura, marca, scopo...', t_domain: 'Dominio', t_owner: 'Proprietario', t_datatype: 'Tipo di dati', t_grid: 'Griglia', t_table: 'Tabella', t_bookings: 'Prenotazioni', t_items: 'elementi', t_item: 'elemento', t_book: 'Prenota', t_bookCal: 'Prenota sul calendario', t_noResults: 'Nessuna attrezzatura trovata', t_noResultsSub: 'Modifica la ricerca o i filtri', t_upBookings: 'Prenotazioni in arrivo', t_noBookings: 'Nessuna prenotazione per questa attrezzatura.', t_noBookingsAll: 'Nessuna prenotazione in arrivo.', t_confirmed: 'Prenotazione confermata. Ora appare nel planning qui sotto.', t_yourName: 'Il tuo nome', t_start: 'Data inizio', t_end: 'Data fine', t_where: 'Dove', t_what: 'Per cosa', t_confirm: 'Conferma prenotazione', t_allUpcoming: 'Tutte le prenotazioni in arrivo',
    p_pick: 'Seleziona la tua universit\u00e0 e inserisci il PIN', p_pin: 'Codice PIN', p_access: 'Accedi', p_wrongPin: 'PIN errato. Riprova.', p_addStudy: 'Aggiungi studio', p_noStudies: 'Nessuno studio. Clicca "Aggiungi studio" per iniziare.', p_presentations: 'Presentazioni & abstract', p_addPres: 'Aggiungi presentazione', p_noPres: 'Nessuna presentazione ancora.', p_back: 'Indietro'
  },
  es: {
    locale: 'es-ES',
    connecting: 'Conectando a la base de datos...', offline: 'No se pudo conectar a la base de datos. Comprueba tu conexi\u00f3n y recarga.',
    today: 'Hoy', tomorrow: 'Ma\u00f1ana', inDays: 'en %n d\u00edas',
    r_overview: 'Resumen', r_idea: 'Enviar idea', r_calendar: 'Calendario', r_papers: 'Art\u00edculos', r_library: 'PDF Library', r_tip: 'Tip of the week', r_phd: 'PhD activities', r_quiz: 'Quiz', r_admin: 'Evaluaci\u00f3n & solicitudes',
    ideaNm: 'Enviar una idea de investigaci\u00f3n', ideaDesc: 'Comparte una propuesta de investigaci\u00f3n para su revisi\u00f3n.',
    calNm: 'Calendario de investigaci\u00f3n', calDesc: 'Reuniones, congresos y plazos de abstract.',
    papersNm: '\u00daltimos art\u00edculos', papersDesc: 'Feed de PubMed, punt\u00faa art\u00edculos, solicita PDF.',
    tipNm: 'Tip of the week', tipDesc: 'Publicaciones breves con ideas, gr\u00e1ficos e im\u00e1genes.',
    phdNm: 'PhD activities', phdDesc: 'Seguimiento personal para cada doctorando.',
    libraryNm: 'PDF Library', libraryDesc: 'Art\u00edculos ya disponibles bajo solicitud.',
    quizNm: 'Quiz Challenge', quizDesc: 'Quiz semanal con ranking.',
    nextUp: 'Pr\u00f3ximos eventos', viewCal: 'Ver calendario', noEvents: 'No hay eventos pr\u00f3ximos', tipNoPosts: 'A\u00fan no hay publicaciones', readPost: 'Leer',
    meeting: 'Reuni\u00f3n de investigaci\u00f3n', congress: 'Congreso', deadline: 'Abstract / plazo', other: 'Otro',
    fName: 'Tu nombre', fEmail: 'Tu email', fTitle: 'T\u00edtulo de la idea', fObjective: 'Objetivo', fSample: 'Muestra / poblaci\u00f3n', fMethods: 'M\u00e9todos', fLinks: 'Enlaces relacionados (opcional)', fNotes: 'Notas adicionales (opcional)',
    ideaSubmit: 'Enviar idea', ideaSent: 'Gracias. Tu idea fue enviada para revisi\u00f3n.', ideaFailed: 'No se pudo enviar ahora. Int\u00e9ntalo de nuevo.', ideaIntro: 'Comparte una propuesta de investigaci\u00f3n con el departamento. El responsable de investigaci\u00f3n revisa cada env\u00edo.',
    ratings: 'votos', requestPdf: 'Solicitar PDF', requestSent: 'Solicitud enviada', yourEmail: 'Tu email', note: 'Nota (opcional)', notePh: 'Algo que el equipo deba saber...', send: 'Enviar', cancel: 'Cancelar',
    sortDate: 'Recientes', sortRating: 'Mejor valorados', fWeek: 'Semana', fMonth: 'Mes', fYear: 'A\u00f1o', fAll: 'Todos', loadingFeed: 'Cargando el feed de art\u00edculos...', feedFailed: 'No se pudo cargar el feed de art\u00edculos.',
    libInstructions: 'Estos art\u00edculos est\u00e1n disponibles en PDF en nuestra carpeta compartida de OneDrive. Busca el PMID indicado abajo en la carpeta para encontrar el archivo.',
    journal: 'Revista', copied: '\u00a1Copiado!', noEntries: 'A\u00fan no hay art\u00edculos en la biblioteca.',
    upcoming: 'Pr\u00f3ximos eventos', allTypes: 'Todos', noEventsYet: 'A\u00fan no hay eventos',
    qUsername: 'Elige un nombre de usuario', qUsernamePh: 'ej. marco.r', qStart: 'Empezar', qWelcome: 'Bienvenido', qPlay: 'Jugar el quiz de esta semana', qLeaderboard: 'Ver ranking', qLogout: 'Cerrar sesi\u00f3n', qAlready: 'Ya jugaste esta semana. \u00a1Vuelve el lunes!', qNoQuestions: 'A\u00fan no hay quiz disponible.', qQuestion: 'Pregunta', qOf: 'de', qFinished: 'Quiz completado', qSubmitted: 'Tu puntuaci\u00f3n fue enviada al ranking.', qBack: 'Volver', qThisWeek: 'Podio de la semana pasada', qPoints: 'pts', qNoScores: 'A\u00fan no hay puntuaciones.', qGold: 'Oro', qSilver: 'Plata', qBronze: 'Bronce',
    t_search: 'Equipo, marca, prop\u00f3sito...', t_domain: 'Dominio', t_owner: 'Propietario', t_datatype: 'Tipo de datos', t_grid: 'Cuadr\u00edcula', t_table: 'Tabla', t_bookings: 'Reservas', t_items: 'elementos', t_item: 'elemento', t_book: 'Reservar', t_bookCal: 'Reservar en el calendario', t_noResults: 'No se encontr\u00f3 equipamiento', t_noResultsSub: 'Ajusta la b\u00fasqueda o los filtros', t_upBookings: 'Pr\u00f3ximas reservas', t_noBookings: 'No hay reservas para este equipo.', t_noBookingsAll: 'No hay pr\u00f3ximas reservas.', t_confirmed: 'Reserva confirmada. Ya aparece en el planning de abajo.', t_yourName: 'Tu nombre', t_start: 'Fecha de inicio', t_end: 'Fecha de fin', t_where: 'D\u00f3nde', t_what: 'Para qu\u00e9', t_confirm: 'Confirmar reserva', t_allUpcoming: 'Todas las pr\u00f3ximas reservas',
    p_pick: 'Selecciona tu universidad e introduce tu PIN', p_pin: 'C\u00f3digo PIN', p_access: 'Acceder', p_wrongPin: 'PIN incorrecto. Int\u00e9ntalo de nuevo.', p_addStudy: 'A\u00f1adir estudio', p_noStudies: 'A\u00fan no hay estudios. Haz clic en "A\u00f1adir estudio".', p_presentations: 'Presentaciones & abstracts', p_addPres: 'A\u00f1adir presentaci\u00f3n', p_noPres: 'A\u00fan no hay presentaciones.', p_back: 'Volver'
  }
};

(function () {
  let lang = 'en';
  try { lang = localStorage.getItem('hubLang') || 'en'; } catch (e) {}
  if (!HUB_T[lang]) lang = 'en';
  const subs = new Set();
  window.HubLang = {
    LANGS: ['en', 'fr', 'it', 'es'],
    get: () => lang,
    set: (l) => {
      if (!HUB_T[l]) return;
      lang = l;
      try { localStorage.setItem('hubLang', l); } catch (e) {}
      subs.forEach((f) => f(l));
    },
    subscribe: (f) => { subs.add(f); return () => subs.delete(f); },
    t: (key) => (HUB_T[lang] && HUB_T[lang][key]) || HUB_T.en[key] || key
  };
  window.useLang = function () {
    const { useState, useEffect } = window.React;
    const [l, setL] = useState(lang);
    useEffect(() => window.HubLang.subscribe(setL), []);
    return {
      lang: l,
      setLang: window.HubLang.set,
      locale: (HUB_T[l] || HUB_T.en).locale,
      t: (key) => (HUB_T[l] && HUB_T[l][key]) || HUB_T.en[key] || key
    };
  };
})();
