# Portfolio Michała Zwolaka

Nowoczesne portfolio personal branding stworzone w React + Vite + TypeScript.

## ✨ Funkcje

- 📱 Responsywny design
- 🎨 Nowoczesny UI z animacjami
- 📧 Formularz kontaktowy z integracją Resend
- 🚀 Gotowe do wdrożenia na Vercel
- ⚡ Bez bazy danych - uproszczona architektura

## 🛠️ Technologie

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- Framer Motion (animacje)
- React Query
- Wouter (routing)
- Shadcn/ui (komponenty)

### Backend
- Express.js (development)
- Vercel Serverless Functions (production)
- Resend (wysyłka emaili)

## 📋 Wymagania

- Node.js 24+
- npm lub yarn
- Konto Resend (darmowe - 100 emaili/dzień)

## 🚀 Instalacja i uruchomienie

### 1. Klonowanie repozytorium
```bash
git clone <repo-url>
cd michal-zwolak
```

### 2. Instalacja zależności
```bash
npm install
```

### 3. Konfiguracja środowiska
Stwórz plik `.env` w głównym katalogu:
```bash
cp .env.example .env
```

Uzupełnij zmienne środowiskowe:
```env
RESEND_API_KEY=your_resend_api_key_here
NODE_ENV=development
```

### 4. Uruchomienie w trybie deweloperskim
```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem: http://localhost:5000

## 📦 Build produkcyjny

```bash
npm run build
npm start
```

## 🌐 Deployment na Vercel

### Szybki start:
1. Połącz repozytorium z Vercel
2. Dodaj zmienną środowiskową `RESEND_API_KEY` w ustawieniach projektu
3. Deploy!

### Szczegółowe instrukcje:
Zobacz [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

## 📁 Struktura projektu

```
├── api/                    # Vercel Serverless Functions
│   └── index.ts           # Endpoint formularza kontaktowego
├── client/                # Frontend React
│   ├── public/           # Pliki statyczne
│   └── src/
│       ├── assets/       # Obrazy
│       ├── components/   # Komponenty React
│       ├── hooks/        # Custom hooks
│       ├── pages/        # Strony
│       └── lib/          # Utilities
├── server/               # Backend Express (development)
├── shared/               # Współdzielone typy i schemy
└── script/               # Build scripts
```

## 🔧 Konfiguracja

### Zmiana adresu email docelowego
W pliku `api/index.ts` i `server/routes.ts` zmień:
```typescript
to: 'twoj-email@example.com'
```

### Dostosowanie formularza
Edytuj plik `client/src/pages/Home.tsx` w sekcji `CONTACT SECTION`

## 📝 Scripts

- `npm run dev` - Uruchomienie serwera deweloperskiego (Express + Vite)
- `npm run build` - Build produkcyjny dla Vercel (tylko Vite)
- `npm run build:full` - Build pełny (Express + Vite) dla lokalnego uruchomienia
- `npm start` - Uruchomienie buildu produkcyjnego z Express
- `npm run check` - Sprawdzenie typów TypeScript

## 🐛 Rozwiązywanie problemów

### Formularz nie wysyła wiadomości
- Sprawdź czy `RESEND_API_KEY` jest ustawiony
- Sprawdź logi w konsoli
- Upewnij się, że adres email w Resend jest zweryfikowany

### Build się nie kompiluje
- Usuń folder `node_modules` i `dist`
- Uruchom `npm install` ponownie
- Sprawdź czy wszystkie zależności są zainstalowane

## 📄 Licencja

MIT

## 👤 Autor

Michał Zwolak
- Email: michalzwolak87@gmail.com

---

**Uwaga:** Ten projekt nie wymaga bazy danych. Wszystkie wiadomości z formularza kontaktowego są wysyłane bezpośrednio na email przez Resend API.
