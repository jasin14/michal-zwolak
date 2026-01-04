# 🔧 PROBLEM Z CACHE VERCEL - ROZWIĄZANIE

## ❌ Problem:

Vercel używa starego cache i instaluje `@vercel/node@3.0.0` zamiast najnowszej wersji.

```
Restored build cache from previous deployment
Installing Builder: @vercel/node@3.0.0  ← STARY!
```

## ✅ Co zostało naprawione:

### 1. Usunięto zahardcodowaną wersję z `vercel.json`:

```diff
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
- "functions": {
-   "api/*.ts": {
-     "runtime": "@vercel/node@3.0.0"  ← USUNIĘTO!
-   }
- },
  "rewrites": [...]
}
```

**Dlaczego?**
- Vercel automatycznie wybierze najnowszą kompatybilną wersję
- `@vercel/node@3.0.0` było za stare
- Teraz będzie używać wersji z `package.json` (`@vercel/node@3.2.29`)

### 2. Dodano jasną konfigurację:

```json
{
  "framework": null,
  "installCommand": "npm install"
}
```

To wymusza świeżą instalację zgodnie z `package.json`.

---

## 🚀 JAK WYCZYŚCIĆ CACHE NA VERCEL:

### Opcja 1: Przez Dashboard (NAJŁATWIEJSZE)

1. Idź do Vercel Dashboard → Twój projekt
2. Settings → General
3. Przewiń w dół do **"Clear Build Cache"**
4. Kliknij **"Clear Build Cache"**
5. Wróć do Deployments
6. Kliknij **"Redeploy"** → wybierz **"Redeploy without cache"**

### Opcja 2: Przy następnym commicie

Commitnij poprawkę `vercel.json`:
```bash
git add vercel.json
git commit -m "Remove hardcoded @vercel/node version and clear cache"
git push origin main
```

Następnie w Vercel Dashboard:
- Znajdź najnowszy deployment
- Kliknij menu (trzy kropki) → **"Redeploy"**
- **WAŻNE:** Zaznacz opcję **"Use existing Build Cache"** → **ODZNACZ!**
- Kliknij "Redeploy"

### Opcja 3: Przez CLI

```bash
vercel --force
```

Flaga `--force` wymusza rebuild bez cache.

---

## 📋 Kompletna procedura deploymentu:

### 1. Commitnij wszystkie zmiany:
```bash
git add .
git commit -m "Fix Vercel config: remove old runtime version, use Node.js 24.x"
git push origin main
```

### 2. Wyczyść cache w Vercel:
- Settings → General → Clear Build Cache

### 3. Redeploy bez cache:
- Deployments → najnowszy → Redeploy
- **Ważne:** Odznacz "Use existing Build Cache"

---

## ✅ Po poprawce zobaczysz:

```
Installing Builder: @vercel/node@latest  ✓
Using Node.js 24.x  ✓
Installing dependencies...
npm install (bez warnów)
```

---

## 🔍 Weryfikacja:

Po deploymencie sprawdź logi:
- Build logs powinny pokazać Node.js 24.x
- Brak warnów o @vercel/node@3.0.0
- Functions powinny działać poprawnie

---

## 📝 Co zostało zmienione w projekcie:

```
modified:   vercel.json
  - Usunięto sekcję "functions" z zahardcodowaną wersją
  - Dodano "framework": null
  - Dodano "installCommand": "npm install"
```

---

## ⚠️ WAŻNE:

Vercel cache'uje:
- ✅ `node_modules` (to OK)
- ✅ Build output (to OK)
- ❌ Wersję runtime'u (@vercel/node) - **TO BYŁ PROBLEM**

Usunięcie sekcji `functions` z `vercel.json` pozwala Vercel automatycznie wybrać najnowszą wersję zgodną z `package.json`.

---

## 🎯 Dlaczego to się stało?

1. W `vercel.json` było `"runtime": "@vercel/node@3.0.0"`
2. Vercel cache'ował tę wersję
3. Nawet jeśli `package.json` miał nowszą wersję, Vercel używał cache

**Rozwiązanie:** Usunięcie zahardcodowanej wersji + czyszczenie cache.

---

## ✨ Status po poprawce:

✅ `vercel.json` - bez zahardcodowanej wersji runtime  
✅ `package.json` - engines: "24.x", @vercel/node: "^3.2.29"  
✅ `.node-version` - 24  
✅ `@types/node` - ^25.0.3  

**GOTOWE DO REDEPLOY Z CZYSZCZENIEM CACHE! 🚀**
