# Vercel Deployment Anleitung

## Problem
Vercel findet das `app` Verzeichnis nicht, weil das Projekt in einem Unterverzeichnis liegt.

## Lösung

### Option 1: Root-Verzeichnis in Vercel konfigurieren (Empfohlen)

1. Gehe zu deinem Vercel-Projekt
2. Klicke auf **Settings** → **General**
3. Scrolle zu **Root Directory**
4. Setze das Root-Verzeichnis auf: `NapfundCo_OG`
5. Klicke auf **Save**
6. Führe einen neuen Deployment durch

### Option 2: Projekt-Struktur ändern

Falls Option 1 nicht funktioniert, stelle sicher, dass:
- `package.json` im Root-Verzeichnis liegt
- `app/` Verzeichnis im Root-Verzeichnis liegt
- `next.config.js` im Root-Verzeichnis liegt

### Option 3: Monorepo-Konfiguration

Falls du mehrere Projekte im Repository hast, verwende eine `vercel.json` im Repository-Root:

```json
{
  "buildCommand": "cd NapfundCo_OG && npm run build",
  "devCommand": "cd NapfundCo_OG && npm run dev",
  "installCommand": "cd NapfundCo_OG && npm install",
  "outputDirectory": "NapfundCo_OG/.next"
}
```

## Wichtige Dateien

Stelle sicher, dass folgende Dateien vorhanden sind:
- ✅ `package.json`
- ✅ `next.config.js`
- ✅ `tsconfig.json`
- ✅ `app/` Verzeichnis
- ✅ `components/` Verzeichnis
- ✅ `lib/` Verzeichnis

## Build-Befehle

Die Standard-Befehle sollten funktionieren:
- `npm install`
- `npm run build`
- `npm run start`

