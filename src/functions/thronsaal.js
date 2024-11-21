const { app } = require('@azure/functions');

app.http('thronsaal', {
    methods: ['GET', 'PUT', 'DELETE', 'POST'],
    authLevel: 'anonymous',
    handler: async (req, context) => {
        context.log("Accessing the Thronsaal");

        if (req.method !== 'GET') {
            return {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "Es gibt nichts Interessantes hier. Vielleicht solltest du dich genauer umsehen oder mit den Figuren sprechen."
                })
            };
        }
        return {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                location: "Thronsaal",
                intro: "Du erwachst im Thronsaal, eine imposante, hohe Halle, deren Wände mit prunkvollen Wandteppichen geschmückt sind. Die Halle wird von Fackeln erleuchtet, deren Flammen in einem sanften, aber majestätischen Licht flackern. In der Mitte thront ein prächtiger, vergoldeter Stuhl, auf dem der König mit ernster Miene sitzt. Neben ihm steht ein Ritter, dessen Rüstung in dem Licht glänzt. Am Fuße des Thrones kniet ein junger Knappe, der mit einer Mischung aus Ehrfurcht und Nervosität auf dich blickt.",
                characters: [
                    { name: "König", route: "/thronsaal/koenig", description: "Der König sitzt erhaben auf seinem Thron und beobachtet dich streng." },
                    { name: "Ritter", route: "/thronsaal/ritter", description: "Der Ritter steht still neben dem Thron, seine Augen stets wachsam." },
                    { name: "Knappe", route: "/thronsaal/knappe", description: "Der Knappe kniet ehrfürchtig zu Füßen des Königs und blickt neugierig in deine Richtung." }
                ]
            })
        };
    }
});

// GET /thronsaal/koenig - Der König erzählt von der entführten Prinzessin und der Aufgabe
app.http('koenig', {
    route: "thronsaal/koenig",
    methods: ['GET', 'PUT'],
    authLevel: 'anonymous',
    handler: async (req, context) => {
        context.log("Interacting with the König");

        const item = req.query.get('item');
        const person = req.query.get('person')
        
        if (req.method === 'PUT' && person === 'kunigunde') {
            return {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "Der König steht am Tor und wartet voller Ungeduld. Als er endlich die Prinzessin erblickt, die in Sicherheit zurückkehrt, breitet sich ein Lächeln auf seinem Gesicht aus, das den ganzen Thronsaal erhellt. ,,Mein geliebtes Kind! Du bist wieder hier, unversehrt!“, ruft er mit bebender Stimme und schließt sie in seine Arme. Dann wendet er sich dir zu und legt eine Hand auf deine Schulter. „Ehrenwerter Retter“, sagt er. „Du hast das Unmögliche vollbracht und meine Tochter aus den Klauen des Bösen befreit. Das Königreich ist dir zu ewigem Dank verpflichtet. Heute feiern wir nicht nur die Rückkehr meiner Tochter, sondern auch den Mut und die Tapferkeit eines wahren Helden.“ Die Halle füllt sich mit Jubel, und das Königreich feiert eine Festlichkeit, die noch viele Generationen in Erinnerung behalten werden.",
                    message2: "Herzlichen Glückwunsch, du hast das Ende des Spiels erreicht. Doch vielleicht gibt es noch mehr zu finden? Insgesamt 2 Eastereggs und insgesamt 1000 Punkte",
                    punkte: 100
                })
            };
        }
        // Antwort, wenn der Rubinring gegeben wird
        if (req.method === 'PUT' && item === 'ring') {
            return {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "Der König seufzt und schüttelt den Kopf: 'Das ist nicht das, was ich suche. Nur das sichere Zurückbringen meiner Tochter wird mein Herz beruhigen.'"
                })
            };
        }
        // Antwort, wenn der schwert gegeben wird
        if (req.method === 'PUT' && item === 'zweihandschwert') {
            return {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "Der König seufzt und schüttelt den Kopf: 'Ist das ein schlechter Witz? Warum gibst du mir in meiner Traurigkeit ein Schwert?'"
                })
            };
        }
        return {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: "Der König seufzt tief und spricht: 'Meine geliebte Tochter, die Prinzessin, wurde entführt. Mein Herz wird erst dann wieder ruhig schlagen, wenn sie sicher zurückkehrt. Wenn du sie mir zurückbringst, werde ich dir großen Dank schulden. Doch du solltest den Ritter mitnehmen – er ist mein stärkster Krieger.'"
            })
        };
    }
});

// GET /thronsaal/koenig/passwort - Der König gibt das Passwort
app.http('passwort', {
    route: "thronsaal/koenig/passwort",
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (req, context) => {
        context.log("Asking the König for the password");

        return {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'x-passwort': "ohalukashatjavolldaskrassegamegemacht"  // Passwort wird im Header übergeben
            },
            body: JSON.stringify({
                message: "Der König flüstert dir das geheime Passwort zu. Denk daran, es auf die gleiche Weise zu verwenden, wenn du es dem Troll gibst."
            })
        };
    }
});

// GET /thronsaal/ritter - Der Ritter verweigert das Mitkommen ohne ein Schwert
app.http('ritter', {
    route: "thronsaal/ritter",
    methods: ['GET', 'PUT'],
    authLevel: 'anonymous',
    handler: async (req, context) => {
        context.log("Interacting with the Ritter");

        // Prüft, ob ein Schwert übergeben wurde (bei PUT-Anfrage)
        const item = req.query.get('item');
        if (req.method === 'PUT' && item === 'zweihandschwert') {
            return {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "Der Ritter nimmt das Schwert und nickt zustimmend. 'Gut, nun bin ich bereit, an deiner Seite zu kämpfen. Lass uns die Prinzessin retten!' Wir müssen über die /felder zum /vulkan",
                    routen: "felder und vulkan",
                    punkte: 100
                })
            };
        }
            if (req.method === 'PUT' && item === 'petunie') {
                return {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: "'Hihihihi' - Der Ritter kichert und wird etwas Rot - 'Das ist aber lieb, dass du so an mich denkst.'",
                        glueckwunsch: "Du hast den Ritter etwas glücklicher gemacht",
                        punkte: 100
                    })
                };
            }
         // Antwort, wenn der Rubinring gegeben wird
         if (req.method === 'PUT' && item === 'rubinring') {
            return {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "Der Ritter betrachtet den Rubinring und schüttelt den Kopf: 'Ich schätze das Geschenk, aber ich brauche ein Schwert, nicht einen Ring, um die Prinzessin zu retten.'"
                })
            };
        }
        if (req.method === 'PUT') {
            return {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "Der Ritter blickt das Item an und schüttelt den Kopf. 'Das ist kein Schwert. Zumindest wüsste ich nicht wo du das her haben solltest. Ich komme nicht mit, ohne eine anständige Waffe.'"
                })
            };
        }

        return {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: "Der Ritter sieht dich an und sagt: 'Ich kann meine Pflicht nicht ohne eine anständige Waffe erfüllen. Bring mir ein Schwert, dann werde ich dich begleiten.'"
            })
        };
    }
});

// GET /thronsaal/knappe - Der Knappe gibt einen Hinweis über die Katakomben gegen eine Belohnung
app.http('knappe', {
    route: "thronsaal/knappe", 
    methods: ['GET', 'PUT'],
    authLevel: 'anonymous',
    handler: async (req, context) => {
        context.log("Interacting with the Knappe");

        // Prüft, ob Schmuck oder Geld übergeben wurde (bei PUT-Anfrage)
        const item = req.query.get('item');
        if (req.method === 'PUT' && (item === 'rubinring')) {
            return {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "Der Knappe grinst und sagt: 'Danke für die Großzügigkeit! Wenn du ein Schwert suchst, geh in die /waffenkammer.'"
                })
            };
        }
         // Antwort, wenn der Rubinring gegeben wird
        if (req.method === 'PUT' && item === 'rubinring') {
            return {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "Der Ritter betrachtet den Rubinring und schüttelt den Kopf: 'Ich schätze das Geschenk, aber ich brauche ein Schwert, nicht einen Ring, um die Prinzessin zu retten.'"
                })
            };
        }
        if (req.method === 'PUT') {
            return {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "Der Knappe schüttelt den Kopf und murmelt: 'Damit kann ich nichts anfangen. Schmuck oder Geld könnte mich schon eher zum Reden bringen. Aber das musst du erstmal finden. Such doch mal in den /katakomben'"
                })
            };
        }

        return {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: "Der Knappe flüstert: 'Ich könnte dir verraten, wo man ein Schwert findet... aber das kostet. Ein bisschen Schmuck oder Geld würde mich zum Reden bringen.'"
            })
        };
    }
});


app.http('katakomben', {
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    authLevel: 'anonymous',
    handler: async (req, context) => {
        context.log("Accessing the Katakomben");

        if (!(req.method === 'GET')) {
            return {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "Es gibt hier nichts weiter zu sehen. Vielleicht solltest du die Skelette bekämpfen oder nach Hinweisen suchen."
                })
            };
        }
        return {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                description: "Du betrittst die düsteren Katakomben unter dem Schloss. Der Boden ist feucht und der Geruch von Moder liegt in der Luft. Lebendige Skelette patrouillieren und klappern mit ihren Knochen, bereit, Eindringlinge anzugreifen.",
                enemies: [
                    { name: "Lebendiges Skelett", route: "/katakomben/skelett" }
                ]
            })
        };
    }
});

// DELETE /katakomben/skelett - Besiegt ein Skelett und informiert über den Rubinring
app.http('skelett', {
    route: 'katakomben/skelett',
    methods: ['DELETE', 'PUT', 'GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (req, context) => {
        const item = req.query.get('item');
        context.log("Interacting with the Skelett with method:", req.method);

        // Besiegen des Skeletts
        if (req.method === 'DELETE') {
            return {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "Das Skelett zerfällt zu Staub und hinterlässt einen glitzernden Rubinring auf dem Boden. Du nimmst den Ring und weißt nun von seiner Existenz.",
                    tutorial: "Übergib Dinge Charakteren mit PUT requests, indem du ein item als Argument mit gibst",
                    punkte: 100,
                    item: "rubinring"
                })
            };
        }

        // Abfangen, wenn versucht wird, dem Skelett ein Schwert zu geben
        if (req.method === 'PUT' && item === 'schwert') {
            return {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "Du versuchst, dem Skelett das Schwert zu übergeben, aber es greift mit klappernden Knochen an! Es scheint, dass das Skelett nicht an deinem Schwert interessiert ist – du solltest dich verteidigen und es bekämpfen."
                })
            };
        }

        // Standardantwort für alle anderen Aktionen
        return {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: "Das Skelett bewegt sich gefährlich auf dich zu. Du spürst, dass du schleunigst etwas dagegen tun solltest, bevor es dich angreift!"
            })
        };
    }
});



// GET /waffenkammer - Beschreibung der Waffenkammer und Verfügbarkeit des Zweihänderschwerts
app.http('waffenkammer', {
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    authLevel: 'anonymous',
    handler: async (req, context) => {
        context.log("Accessing the Waffenkammer");

        if (req.method !== 'GET'){
            return {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "Die übrigen Waffen in der Waffenkammer sind keine Schwerter und für deinen Auftrag nicht geeignet."
                })
            };
        }
        return {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                description: "Du betrittst die Waffenkammer, die voll von unterschiedlichsten Waffen ist – Hellebarden, Speere, Schilde und Äxte. Doch nur ein einzelnes, mächtiges Zweihänderschwert scheint von Bedeutung zu sein.",
                action: "Um das Zweihänderschwert aufzuheben, sende eine GET-Anfrage an /waffenkammer/schwert."
            })
        };
    }
});

// GET /waffenkammer/zweihandschwert - Hebt das Zweihänderschwert auf
app.http('waffenkammer_schwert', {
    route: "waffenkammer/schwert",
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (req, context) => {
        context.log("Picking up the Zweihänderschwert");

        return {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: "Du nimmst das mächtige Zweihänderschwert in die Hand. Es fühlt sich schwer und mächtig an – ein würdiges Werkzeug für deinen Auftrag.",
                item: "zweihandschwert"
            })
        };
    }
});

