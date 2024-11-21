const { app } = require('@azure/functions');

// GET /dunkleburg - Beschreibung der Dunklen Burg und Hinweis auf den Drachen
app.http('dunkleburg', {
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    authLevel: 'anonymous',
    handler: async (req, context) => {
        context.log("Accessing the Dunkle Burg");

        if (req.method !== 'GET'){
            return {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "Abgesehen vom Drachen und der Prinzessin scheint in der Dunklen Burg nichts weiter von Bedeutung zu sein."
                })
            };
        }
        return {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                description: "Die Dunkle Burg erhebt sich vor dir, kalt und bedrohlich. Am Eingang siehst du den Drachen, der dir mit glühenden Augen den Weg versperrt.",
                action: "Um weiterzukommen, musst du den Drachen besiegen. Versuche nicht, an ihm vorbeizukommen, solange er dort ist.",
                routen: {
                    drache: "/dunkleburg/drache",
                    prinzessin: "/dunkleburg/prinzessin"
                }
            })
        };
    }
});

// GET /dunkleburg/prinzessin - Der Drache blockiert den Zugang zur Prinzessin
app.http('prinzessin', {
    route: "dunkleburg/prinzessin",
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (req, context) => {
        context.log("Trying to reach the Prinzessin");

        return {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: "Der Weg zur Prinzessin wird vom Drachen blockiert. Besiege ihn, um sie zu retten!"
            })
        };
    }
});

// GET & DELETE /dunkleburg/drache - Interaktion mit dem Drachen
app.http('drache', {
    route: "dunkleburg/drache", 
    methods: ['GET', 'DELETE', 'PUT'],
    authLevel: 'anonymous',
    handler: async (req, context) => {
        const item = req.query.get('item');
        
        if (req.method === 'GET') {
            context.log("Interacting with the Dragon");
            return {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "Der Drache faucht und wirft dir einen glühenden Blick zu. Deine Versuche, an ihm vorbeizukommen, scheitern kläglich.",
                    punkte: "-50"
                })
            };
        } else if (req.method === 'DELETE') {
            context.log("Defeating the Dragon");
            return {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "Mit einem gewaltigen Hieb besiegst du den Drachen. Der Weg zur Prinzessin Kunigunde ist nun frei.",
                    nextStep: "Du kannst jetzt zur Prinzessin gelangen: /dunkleburg/kunigunde"
                })
            };
        } else if (req.method === 'PUT' && item === 'petunie') {
            context.log("Giving the Dragon a Petunie (Easter Egg)");
            return {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "Der Drache betrachtet die Petunie mit einem verwirrten Ausdruck, schnüffelt kurz daran und verschluckt sie dann mit einem leichten Grunzen. Vielleicht hat ihm die Blume tatsächlich gefallen... Er greift dich und fliegt mit dir zu seinem Hort, wo er dich Zeit deines Lebens umsorgt.", 
                    punkte: 200
                })
            };
        } else {
            return {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "Der Drache zeigt keinerlei Interesse an diesem Gegenstand und faucht dich bedrohlich an."
                })
            };
        }
    }
});

// GET /dunkleburg/kunigunde - Zugriff auf die Prinzessin nach dem Besiegen des Drachen
app.http('kunigunde', {
    route: "dunkleburg/kunigunde",
    methods: ['GET', 'PUT'],
    authLevel: 'anonymous',
    handler: async (req, context) => {
        context.log("Interacting with the Prinzessin Kunigunde");
        if (req.method === 'PUT') {
            if (item === 'petunie') {
                return {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: "Die Prinzessin nimmt die Petunie mit einem strahlenden Lächeln entgegen. 'Eine wunderschöne Blume! Sie erinnert mich an die Freiheit jenseits dieser Mauern. Danke, edler Retter!'",
                        punkte: 200
                    })
                };
            } else {
                return {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: "Die Prinzessin scheint nicht an diesem Gegenstand interessiert zu sein."
                    })
                };
            }
        }
        return {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: "Du findest die Prinzessin Kunigunde, die dich mit einem dankbaren Lächeln ansieht. 'Ich wusste, dass jemand mich retten würde! Nun bring mich bitte zurück zu meinem Vater.'",
                route: "Beende das Spiel mit PUT /thronsaal/koenig?person=kunigunde"
            })
        };
    }
});

