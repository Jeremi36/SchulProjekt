# Know your Schoolday – GUI-Prototyp

Ein vollständig klickbarer Frontend-Prototyp im Stil einer Mischung aus Microsoft Teams und Schulmanager Online.

## Enthaltene Bereiche

- `/` – Start- und Rollenwahl
- `/schüler` – Schüler-Dashboard
- `/lehrer` – Lehrer-Dashboard
- Alias: `/schueler` funktioniert ebenfalls
- Unterseiten für Kalender, Hausaufgaben, Leistungsnachweise, Stoff, Hefteinträge, KI-Übungen, Noten, Stundenplan, Chat und Elternbriefe
- Responsive Darstellung für Desktop, Tablet und Smartphone
- Lokale Demo-Interaktionen ohne Datenbank

## Lokal starten

```bash
npm install
npm start
```

Danach `http://localhost:3000` öffnen.

## Auf Render deployen

1. Repository auf GitHub hochladen.
2. In Render **New + → Blueprint** wählen und das Repository verbinden.
3. Render liest `render.yaml` automatisch ein.
4. Alternativ einen **Web Service** mit folgenden Werten anlegen:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Health Check Path: `/health`

## Wichtig

Dies ist bewusst ein GUI-Prototyp. Änderungen werden nur im Browser simuliert und nach einem Neuladen zurückgesetzt. Für eine echte Anwendung wären anschließend Login, Rollen/Rechte, Datenbank, Datei-Upload, Benachrichtigungen und Datenschutzkonzept umzusetzen.

## Render-Hinweis
Der Build verwendet ausdrücklich die öffentliche npm-Registry über `.npmrc`. Build Command: `npm install`; Start Command: `npm start`; Health Check Path: `/health`.
