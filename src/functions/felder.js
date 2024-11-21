const { app } = require('@azure/functions');

// GET /felder - Beschreibung der Felder und Hinweis auf die Blume
app.http('felder', {
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    authLevel: 'anonymous',
    handler: async (req, context) => {
        context.log("Accessing the Felder");

        if (req.method !== 'GET') {
            return {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "Außer der Blume scheint auf den Feldern nichts von Interesse zu sein. Vielleicht solltest du dich anderswo umsehen."
                })
            };
        }
        return {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                description: "Du stehst auf weiten Feldern, die im Wind sanft hin und her wiegen. Weit und breit gibt es nichts Interessantes, außer einer kleinen, zarten Blume, die allein in der Mitte des Feldes wächst und eine mächtige magische Aura ausstrahlt.",
            })
        };
    }
});

// GET /felder/blume - Pflückt die Blume
app.http('blume', {
    route: "felder/blume",
    methods: ['GET', 'DELETE'],
    authLevel: 'anonymous',
    handler: async (req, context) => {
        context.log("Picking the flower on the Felder");

        if (req.method === 'DELETE') {
            return {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "Du zertrittst die Blume mit deinem Fuß. Ihre Blütenblätter verstreuen sich im Wind, und die Schönheit des Feldes scheint ein wenig verloren zu gehen. Lukas fragt sich was falsch mit dir ist. Aber schön, dass du das easteregg gefunden hast!",
                    punkte: 100
                })
            };
        }
        if (req.method === 'GET') {
            return {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: "Du pflückst die zarte Blume vorsichtig. Sie duftet angenehm und verbreitet einen Hauch von Frische in der Luft. Vielleicht solltest du sie jemandem geben um eine Freude zu machen",
                item: "petunie"
            })
        }};
        return {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: "Außer der Blume scheint auf den Feldern nichts von Interesse zu sein. Vielleicht solltest du es anders versuchen"
            })
        };
    }}
);

