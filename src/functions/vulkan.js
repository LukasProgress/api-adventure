const { app } = require('@azure/functions');

// Globales Passwort, das der König dem Spieler mitteilt
const PASSWORT = "ohalukashatjavolldaskrassegamegemacht";

// GET /vulkan - Beschreibung des Vulkans und des Trolls
app.http('vulkan', {
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    authLevel: 'anonymous',
    handler: async (req, context) => {
        context.log("Accessing the Vulkan");

        if (req.method !== 'GET'){
            return {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "Es gibt hier nichts weiter zu sehen. Der Vulkan scheint nur von der Brücke und dem Troll bewacht zu sein."
                })
            };
        }
        return {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                description: "Du stehst vor einem Vulkan, dessen Hitze unerträglich wirkt. Eine Brücke führt über einen Lavasee, aber sie wird von einem großen, furchteinflößenden Troll bewacht.",
                charactere: {
                    troll: {
                        description: "Ein großer und buckliger Troll, der dich grimmig ansieht und den Weg über die Brücke versperrt", route: "/vulkan/troll"
                    }
                }
            })
        };
    }
});



// GET /vulkan/troll - Der Troll überprüft das Passwort im Header
app.http('troll', {
    route: "vulkan/troll",
    methods: ['GET', 'PUT'],
    authLevel: 'anonymous',
    handler: async (req, context) => {
        context.log("Interacting with the Troll at the Vulkan");

        // Überprüft, ob das Passwort im Header übergeben wurde und korrekt ist
        const receivedPassword = req.headers.get('x-passwort');
        const item = req.query.get('item');

        if (receivedPassword === PASSWORT) {
            return {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "Der Troll nickt zufrieden und tritt zur Seite. 'Du darfst die Brücke passieren.'",
                    route: "/dunkleburg",
                    punkte: 100
                })
            };
        } else if (receivedPassword == null) {
            return {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "Der Troll knurrt 'GIB MIR DAS PASSWORT! Vielleicht solltest du deinen ach so unschuldigen König danach fragen!'",
                    route: "/thronsaal/koenig/passwort"
                })
            };
        } else if (req.method === 'PUT' && item === 'petunie'){
            return {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "'DU KANNST MICH NICHT BESTECHEN, BLUMENMANN!!!!"
                })
            };
        } else {
            return {
                status: 403,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "Der Troll knurrt: 'Du hast das falsche Passwort. Geh zum König und frag ihn, bevor du es wieder versuchst!'"
                })
            };
        }
    }
});


