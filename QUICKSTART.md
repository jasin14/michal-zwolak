# 🚀 Quick Start - Vercel Deployment

## Krok 1: Przygotuj Resend API
1. Idź na https://resend.com/signup
2. Załóż darmowe konto (100 emaili/dzień)
3. Zweryfikuj swój email
4. W zakładce **API Keys** stwórz nowy klucz
5. Skopiuj klucz (zaczyna się od `re_`)

## Krok 2: Deploy na Vercel
1. Idź na https://vercel.com/new
2. Zaimportuj swoje repozytorium z GitHub
3. Vercel wykryje automatycznie konfigurację
4. W sekcji **Environment Variables** dodaj:
   - Name: `RESEND_API_KEY`
   - Value: `re_twoj_klucz_api`
5. Kliknij **Deploy**

## Krok 3: Gotowe! 🎉
Po 2-3 minutach Twoja strona będzie live.

## Testowanie formularza
1. Otwórz swoją stronę na Vercel
2. Przewiń do sekcji kontakt
3. Wypełnij formularz
4. Kliknij "Wyślij wiadomość"
5. Sprawdź swojego emaila (michalzwolak87@gmail.com)

## ⚠️ Ważne!
- Adres nadawcy dla darmowego konta Resend to: `onboarding@resend.dev`
- Jeśli chcesz używać własnej domeny, musisz ją zweryfikować w Resend
- Limit darmowego planu: 100 emaili/dzień, 3,000/miesiąc

## 🐛 Problemy?

### "Email service not configured"
- Sprawdź czy dodałeś `RESEND_API_KEY` w Vercel
- Sprawdź czy klucz jest poprawny (skopiowany w całości)

### Nie dostaję emaili
- Sprawdź folder SPAM
- Sprawdź czy używasz zweryfikowanego adresu w Resend
- Sprawdź logi w Vercel Dashboard (Functions → Logs)

### Frontend się nie ładuje
- Poczekaj 2-3 minuty na zakończenie buildu
- Sprawdź logi budowania w Vercel Dashboard
- Sprawdź czy wszystkie pliki zostały commitnięte

## 📚 Więcej informacji
- [Pełna dokumentacja deployment](./VERCEL_DEPLOYMENT.md)
- [Lista zmian](./CHANGELOG.md)
- [README](./README.md)
