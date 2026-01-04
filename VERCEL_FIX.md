# 🔧 POPRAWKA - Naprawiony błąd buildu na Vercel

## ❌ Problem:
```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/vercel/path0/script/build.ts'
```

## ✅ Rozwiązanie:

### Co się stało?
- Poprzednio `npm run build` uruchamiał `tsx script/build.ts`
- Ten plik budował zarówno serwer Express jak i frontend
- Na Vercel **nie potrzebujemy** budować serwera Express (używamy serverless functions)
- Folder `script/` był w `.vercelignore`

### Co zrobiłem?

1. **Zmieniono `package.json`:**
   ```json
   "build": "vite build",           // Dla Vercel - tylko frontend
   "build:full": "tsx script/build.ts",  // Dla lokalnego - full build
   ```

2. **Zaktualizowano `.vercelignore`:**
   - Usunąłem `script/` i `server/` z ignore
   - Teraz Vercel nie próbuje ich używać

3. **`vercel.json` pozostał bez zmian:**
   - `buildCommand: "npm run build"` teraz uruchamia tylko `vite build`
   - Serverless functions w `/api` są kompilowane automatycznie

## 📦 Build process na Vercel:

```
1. npm install
   ↓
2. npm run build (= vite build)
   ↓
3. Generuje dist/public/
   ↓
4. Kompiluje api/*.ts automatycznie
   ↓
5. Deploy ✓
```

## ✅ Przetestowane lokalnie:

```bash
npm run build
# ✓ Działa - generuje dist/public/
# ✓ index.html, assets/, wszystko OK
```

## 🚀 Teraz możesz:

1. **Commitnij zmiany:**
   ```bash
   git add .
   git commit -m "Fix Vercel build - use vite build instead of tsx script"
   git push
   ```

2. **Redeploy na Vercel:**
   - Vercel automatycznie wykryje nowy commit
   - Lub kliknij "Redeploy" w dashboardzie
   - Build powinien przejść bez problemów! ✓

## 📝 Co się zmieniło w plikach:

- ✅ `package.json` - Nowy script `build`
- ✅ `.vercelignore` - Usunięte `script/` i `server/`
- ✅ `vercel.json` - Bez zmian
- ✅ Dokumentacja zaktualizowana

## 🎯 Status: GOTOWE DO DEPLOYMENTU! 🚀
