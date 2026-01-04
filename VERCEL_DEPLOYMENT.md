# Deployment na Vercel - Instrukcje

## Przygotowanie projektu

Projekt został skonfigurowany do wdrożenia na Vercel z wykorzystaniem serverless functions.
**Nie wymaga bazy danych** - wiadomości z formularza są wysyłane bezpośrednio na email przez Resend.

### Struktura projektu:
- `/api` - Serverless functions dla endpointów API
- `/client` - Frontend React + Vite
- `vercel.json` - Konfiguracja Vercel

## Kroki wdrożenia:

### 1. Skonfiguruj konto Resend (WYMAGANE)

1. Załóż konto na https://resend.com (darmowy plan - 100 emaili/dzień)
2. Zweryfikuj swoją domenę (lub użyj testowej domeny `onboarding@resend.dev`)
3. Stwórz API Key w panelu Resend

### 2. Skonfiguruj zmienne środowiskowe w Vercel Dashboard

Po połączeniu projektu z Vercel, dodaj następujące zmienne środowiskowe w ustawieniach projektu:

- `RESEND_API_KEY` - **WYMAGANE** - Klucz API do Resend
- `NODE_ENV` - ustaw na `production`

### 3. Deploy na Vercel

#### Przez Vercel Dashboard:
1. Przejdź do https://vercel.com/new
2. Zaimportuj swoje repozytorium GitHub
3. Vercel automatycznie wykryje konfigurację z `vercel.json`
4. Dodaj zmienną środowiskową `RESEND_API_KEY`
5. Kliknij "Deploy"

#### Przez CLI:
```bash
vercel
```

### 4. Sprawdź deployment

Po deploymencie sprawdź:
- Frontend powinien być dostępny pod głównym URL
- Formularz kontaktowy powinien wysyłać wiadomości na email
- API endpoint `/api/contact/submit` powinien działać

## Struktura plików Vercel:

```
vercel.json        - Główna konfiguracja
api/index.ts       - Serverless function dla API
.vercelignore      - Pliki ignorowane podczas deploymentu
.env.example       - Przykładowe zmienne środowiskowe
```

## Rozwiązywanie problemów:

### Problem: "Email service not configured" 
- Sprawdź czy `RESEND_API_KEY` jest ustawiony w Vercel Dashboard
- Upewnij się, że klucz API jest poprawny
- Sprawdź logi w Vercel Dashboard (Functions → Logs)

### Problem: "500 Internal Server Error" na API
- Sprawdź logi w Vercel Dashboard (Functions → Logs)
- Upewnij się, że `RESEND_API_KEY` jest ustawiony
- Sprawdź czy format danych z formularza jest poprawny

### Problem: Frontend się nie ładuje
- Sprawdź czy build się wykonał poprawnie
- Sprawdź logi budowania w Vercel Dashboard
- Upewnij się, że `outputDirectory` w `vercel.json` jest poprawny

## Lokalne testowanie funkcji Vercel:

```bash
vercel dev
```

To uruchomi lokalne środowisko emulujące Vercel, gdzie możesz przetestować serverless functions.

## Uwagi:

1. **Resend API**: Koniecznie wymagany do wysyłania wiadomości z formularza kontaktowego
2. **Bez bazy danych**: Projekt nie wymaga bazy danych, wszystko działa przez email
3. **Darmowy plan Resend**: 100 emaili dziennie, 3,000 miesięcznie
4. **Cold starts**: Pierwsze wywołanie funkcji może być wolniejsze (cold start)
5. **Limity Vercel**: Sprawdź limity planu Vercel (czas wykonania, memory, bandwidth)
