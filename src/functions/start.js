const { app } = require('@azure/functions');

app.http('start', {
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    authLevel: 'anonymous',
    handler: async (req, context) => {
        context.log("Request received with method:", req.method);

        try {
            const method = req.method;
            context.log("Processing request for method:", method);
            
            // GET, PUT, POST -> Spielregeln zurückgeben
            if (method === 'GET' || method === 'PUT' || method === 'POST') {
                return {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: "Willkommen zum Spiel API-Kingdom! Hier sind die Regeln:",
                        regeln: {
                            orte: "- Untersuche Orte mit GET /ort",
                            personen: "- Sprich mit Personen an einem Ort mit GET /ort/person",
                            items: "- Übergib Items mit PUT /ort/person und item=xxx als Argument",
                            quest: "Die erste Aufgabe ist es einen Weg zu finden, diese URL eine andere response schicken zu lassen. Finde mehr Hinweise im Verlauf des Spiels. Viel Erfolg!"
                        }
                                 
                    })
                };
            } 
            // DELETE -> Route zum ersten Einstiegspunkt zurückgeben
            else if (method === 'DELETE') {
                return {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: "Du hast mich gefunden! Eine magische Kraft zieht dich in das innere des API-Kingdoms. Dann ist alles schwarz. Gehe zum ersten Einstiegspunkt:",
                        route: "/thronsaal"
                    })
                };
            } 
            // Methode nicht unterstützt
            else {
                return {
                    status: 405,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: "Methode nicht unterstützt. Bitte nutze GET, PUT, POST oder DELETE."
                    })
                };
            }

        } catch (error) {
            context.log.error("An error occurred:", error);
            return {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: "Es ist ein interner Fehler aufgetreten." })
            };
        }
    }
});