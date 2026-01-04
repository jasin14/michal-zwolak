import { Navbar } from "@/components/Navbar";
import { SectionHeading } from "@/components/SectionHeading";
import { ChallengeCard } from "@/components/ChallengeCard";
import { useContact } from "@/hooks/use-contact";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "react-countup";
import {
  ArrowRight,
  Dumbbell,
  Mountain,
  Bike,
  Trophy,
  Heart,
  TrendingUp,
  Users,
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import michalImage from "../assets/Michal-hero.jpg";
import michalAboutMe from "../assets/Michal-2.jpg";
import charity1 from "../assets/Michal-charity-1.jpg";
import charity2 from "../assets/Michal-charity-2.jpg";
import charity3 from "../assets/Michal-charity-3.jpg";
import charity4 from "../assets/Michal-charity-4.jpg";
import charity5 from "../assets/Michal-charity-5.jpg";

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const { mutate, isPending } = useContact();

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertMessage) => {
    mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  const stats = [
    { label: "Wykonanych Burpees", value: 31396, suffix: "" },
    { label: "Bieg Ultra (km)", value: 641, suffix: " km" },
    { label: "Rowerem", value: 500, suffix: " km" },
    { label: "Zebrane środki", value: 75000, suffix: "+ zł" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-body">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <img
            src={michalImage}
            alt="Michał Zwolak Hero"
            className="w-full h-full object-cover object-center scale-105"
          />
        </motion.div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20 pt-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            {/* <h2 className="text-primary font-bold tracking-[0.3em] uppercase mb-4 text-sm md:text-base">
              Sportowiec Wytrzymałościowy & Działacz
            </h2> */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white uppercase leading-[0.9] mb-8">
              Przesuwam <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-600">
                Granice.
              </span>
              <br />
              Dla Siebie.
              <br />
              Dla Innych.
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-xl mb-10 leading-relaxed border-l-2 border-primary pl-6">
              Nazywam się Michał Zwolak. Moją misją jest pokazywanie, że
              niemożliwe to tylko opinia. Łączę ekstremalny wysiłek fizyczny z
              pomaganiem potrzebującym.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() =>
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-wider hover:bg-red-600 transition-all flex items-center justify-center gap-2 group"
                data-testid="button-about"
              >
                Poznaj moją historię
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="https://www.instagram.com/michalzwolak87/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-wider hover:bg-white/5 transition-all text-center flex items-center justify-center"
                data-testid="link-instagram-hero"
              >
                Bądź na bieżąco
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2 z-20"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* STATS STRIP */}
      <div className="border-y border-white/10 bg-background/50 backdrop-blur-sm relative z-30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="py-8 px-4 text-center group hover:bg-white/5 transition-colors"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    separator=" "
                    suffix={stat.suffix}
                    enableScrollSpy
                  />
                </div>
                <div className="text-xs md:text-sm text-gray-500 uppercase tracking-widest font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ABOUT ME SECTION */}
      <section
        id="about"
        className="py-24 md:py-32 bg-background relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[3/4] overflow-hidden bg-secondary relative">
                <img
                  src={michalAboutMe}
                  alt="Michał Zwolak Portrait"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary/10 border border-primary/30 hidden md:flex items-center justify-center p-4 backdrop-blur-sm">
                <p className="font-display text-4xl font-bold text-primary text-center leading-none">
                  NEVER
                  <br />
                  QUIT
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading title="Kim Jestem" subtitle="Filozofia" />

              <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                <p>
                  Nie jestem zawodowym sportowcem. Jestem człowiekiem, który
                  postanowił sprawdzić, gdzie leży granica ludzkiej
                  wytrzymałości – i za każdym razem przesuwać ją o krok dalej.
                </p>
                <p>
                  Moja przygoda zaczęła się od chęci zmiany własnego życia, ale
                  szybko przerodziła się w coś większego. Zrozumiałem, że każdy
                  kilometr biegu, każde powtórzenie burpees i każda kropla potu
                  może mieć głębszy sens.
                </p>
                <p>
                  Dziś łączę ekstremalne wyzwania fizyczne z działalnością
                  charytatywną. Wierzę, że siła charakteru budowana w bólu i
                  zmęczeniu przekłada się na siłę do pomagania innym.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-6">
                {[
                  "Determinacja ponad talent",
                  "Siła mentalna",
                  "Działanie charytatywne",
                  "Ciągły rozwój",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary w-6 h-6 shrink-0" />
                    <span className="font-display font-bold uppercase text-white tracking-wide">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CHARITY CHALLENGES */}
      <section
        id="charity"
        className="py-24 md:py-32 bg-[#0a0e27] relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Wyzwania Charytatywne"
            subtitle="Sport dla wyższego celu"
            alignment="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "31 H Burpee dla Maćka",
                date: "5-6.12.2025",
                raised: "43 tyś+ zł",
                description:
                  "Cel 12 tys powtórzeń. Zdrowie pozwoliło na 8,040 w 21h.",
                location: "Strength & Conditioning Performance",
                url: "https://facebook.com/events/s/1304909057789680/",
                img: charity5,
                delay: 0.1,
              },
              {
                title: "24 H Burpee dla Mai",
                date: "3-4.12.2022",
                raised: "20 tyś+ zł",
                description: "Cel 10 tys powtórzeń. Wykonałem 10,294",
                location: "Strength & Conditioning Performance",
                url: "https://facebook.com/events/s/24-h-burpe-by-wesprzec-maje/594974192409892/",
                img: charity4,
                delay: 0.2,
              },
              {
                title: "12 h Burpee dla Marysi",
                date: "7.12.2021",
                raised: "5.8 tyś zł",
                description: "Nieoficjalny Rekord Guinnessa: 6061 powtórzeń",
                location: "Strength & Conditioning Performance",
                url: "https://facebook.com/events/s/12-h-burpee-dla-marysi/838462000179050/",
                img: charity3,
                delay: 0.3,
              },
              {
                title: "4000 Burpee dla Bartka",
                date: "8.03.2021",
                raised: "4 tyś+ zł",
                description: "Czas: 7 h 56 min.",
                location: "Strength & Conditioning Performance",
                url: "https://facebook.com/events/s/4-000-burpee-dla-bartka/3457811807776608/",
                img: charity2,
                delay: 0.4,
              },
              {
                title: "3000 Burpee dla Asi",
                date: "19.07.2020",
                raised: "2 tyś+ zł",
                description: "Czas: 5 h 50 min.",
                location: "Strength & Conditioning Performance",
                url: "https://facebook.com/events/s/3324709981087919/",
                img: charity1,
                delay: 0.5,
              },
            ].map((challenge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: challenge.delay }}
                className="group relative aspect-[4/5] overflow-hidden bg-card border border-white/5"
              >
                <img
                  src={challenge.img}
                  alt={challenge.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <p className="text-primary font-bold text-xs uppercase tracking-widest mb-2">
                    {challenge.date} • {challenge.location}
                  </p>
                  <h3 className="text-2xl font-display font-bold text-white uppercase mb-2">
                    {challenge.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3 group-hover:line-clamp-none transition-all">
                    {challenge.description}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-primary fill-primary" />
                      <span className="text-white font-bold">
                        Zebrane: {challenge.raised}
                      </span>
                    </div>
                    {challenge.url && (
                      <a
                        href={challenge.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs uppercase font-bold text-primary hover:text-white transition-colors border-b border-primary/30"
                      >
                        Zobacz wydarzenie
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CHALLENGES GRID */}
      <section id="challenges" className="py-24 md:py-32 bg-[#0d1230]">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Moje Wyzwania"
            subtitle="Ekstremalne Projekty Sportowe"
            alignment="center"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <ChallengeCard
              title="Maraton Poznań"
              stats="42.195 km"
              description="Klasyczny dystans maratoński. Test szybkości i wytrzymałości na ulicach Poznania."
              icon={Trophy}
              status="Completed"
              delay={0.1}
            />
            <ChallengeCard
              title="Maraton Warszawa"
              stats="+10kg Kamizelka"
              description="Maraton przebiegnięty z dodatkowym obciążeniem. Ekstremalny test siły nóg i woli walki."
              icon={Dumbbell}
              status="Completed"
              delay={0.2}
            />
            <ChallengeCard
              title="Półmaraton Wrocław"
              stats="+20kg Kamizelka"
              description="Podwójne obciążenie na dystansie 21km. Każdy krok to walka z grawitacją."
              icon={Dumbbell}
              status="Completed"
              delay={0.3}
            />
            <ChallengeCard
              title="Ultramaraton Gdańsk"
              stats="92 km"
              description="Ekstremalny dystans ultra. Ponad dwa klasyczne maratony jeden po drugim."
              icon={Mountain}
              status="Completed"
              delay={0.4}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-block p-12 border border-dashed border-primary/30 bg-primary/5">
              <h3 className="text-3xl font-display font-bold text-white uppercase mb-4 italic">
                Następne wyzwanie?
              </h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Granice są po to, by je przesuwać. Kolejny projekt jest już w
                fazie planowania. Chcesz stać się częścią tej historii?
              </p>
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-wider hover:bg-red-600 transition-all"
              >
                Bądź na bieżąco
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SUPPORT & COOPERATION */}
      <section id="support" className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading title="Współpraca" subtitle="Dołącz do mnie" />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Wsparcie Charytatywne",
                desc: "Masz cel charytatywny, który potrzebuje rozgłosu? Zróbmy razem coś szalonego, by o nim usłyszano.",
                action: "Zgłoś cel",
              },
              {
                icon: Users,
                title: "Współpraca Biznesowa",
                desc: "Szukasz ambasadora marki, który uosabia determinację i siłę? Promuj swoją firmę poprzez sport.",
                action: "Oferta dla firm",
              },
              {
                icon: TrendingUp,
                title: "Trenuj ze mną",
                desc: "Chcesz przesuwać swoje granice lub pracować nad fizycznością? Zapraszam, pomogę Ci w realizacji Twoich celów.",
                action: "Darmowa konsultacja",
              },
            ].map((box, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-card p-8 border border-white/5 hover:border-primary/30 transition-all group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-none flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <box.icon size={28} />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-4 uppercase">
                  {box.title}
                </h3>
                <p className="text-gray-400 mb-8 min-h-[80px]">{box.desc}</p>
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-primary font-bold uppercase tracking-wider text-sm hover:text-white transition-colors flex items-center gap-2"
                >
                  {box.action} <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-card relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
            <div>
              <SectionHeading title="Kontakt" subtitle="Napisz do mnie" />
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Masz pomysł na wyzwanie? Chcesz nawiązać współpracę? A może po
                prostu chcesz rozwijać się fizycznie razem ze mną?
                <br />
                <br />
                Skontaktuj się ze mną na Instagramie lub wypełnij formularz, a
                ja się do Ciebie odezwę w ciągu 24 godzin.
              </p>

              <div className="space-y-4">
                  <div className="p-6 border border-white/5 bg-white/5 space-y-4">
                    <h4 className="text-white font-display font-bold uppercase tracking-wider pb-2">
                      Lokalizacje treningów
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-primary font-bold text-sm uppercase mb-1">
                          Tarnogaj - Treningi Personalne
                        </p>
                        <a
                          href="https://maps.app.goo.gl/MauBnepapjYtshL6A"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-primary transition-colors flex items-center gap-2 group"
                        >
                          <MapPin size={16} className="text-primary" />
                          <span className="group-hover:text-primary transition-colors">Strength & Conditioning Performance</span>
                        </a>
                        <p className="text-gray-400 text-sm italic ml-6">
                          Międzyleska 4, 50-514 Wrocław
                        </p>
                      </div>
                      <div>
                        <p className="text-primary font-bold text-sm uppercase mb-1">
                          Psie Pole - Zajęcia Grupowe
                        </p>
                        <a
                          href="https://maps.app.goo.gl/EdJV8XcjhyFWnAGa8"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-primary transition-colors flex items-center gap-2 group"
                        >
                          <MapPin size={16} className="text-primary" />
                          <span className="group-hover:text-primary transition-colors">CrossGym</span>
                        </a>
                        <p className="text-gray-400 text-sm italic ml-6">
                          Kiełczowska 177, 51-315 Wrocław
                        </p>
                      </div>
                    </div>
                  </div>

                <a
                  href="https://www.instagram.com/michalzwolak87/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-gray-300 hover:text-primary transition-colors p-4 border border-white/5 hover:bg-white/5"
                >
                  <Instagram className="text-primary" />
                  <span className="font-display tracking-wide uppercase font-bold">
                    Skontaktuj się na Instagram
                  </span>
                </a>
              </div>
            </div>

            <div className="bg-background p-8 md:p-10 border border-white/5 shadow-2xl">
              <h3 className="text-2xl font-display font-bold text-white mb-6 uppercase">
                Wyślij wiadomość
              </h3>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Imię i Nazwisko
                  </label>
                  <input
                    {...form.register("name")}
                    className="w-full bg-card border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Jan Kowalski"
                  />
                  {form.formState.errors.name && (
                    <p className="text-primary text-xs mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Adres Email
                  </label>
                  <input
                    {...form.register("email")}
                    className="w-full bg-card border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="jan@example.com"
                  />
                  {form.formState.errors.email && (
                    <p className="text-primary text-xs mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                  {form.formState.errors.root && (
                    <p className="text-primary text-xs mt-1">
                      {form.formState.errors.root.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Numer Telefonu (Opcjonalnie)
                  </label>
                  <input
                    {...form.register("phone")}
                    className="w-full bg-card border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="+48 123 456 789"
                  />
                  {form.formState.errors.phone && (
                    <p className="text-primary text-xs mt-1">
                      {form.formState.errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Wiadomość
                  </label>
                  <textarea
                    {...form.register("message")}
                    rows={4}
                    className="w-full bg-card border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                    placeholder="Treść wiadomości..."
                  />
                  {form.formState.errors.message && (
                    <p className="text-primary text-xs mt-1">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-4 bg-primary text-white font-bold uppercase tracking-wider hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
                >
                  {isPending ? "Wysyłanie..." : "Wyślij Wiadomość"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-background border-t border-white/10 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-display font-bold text-white tracking-widest uppercase mb-4">
            Michał<span className="text-primary">Zwolak</span>
          </h2>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Wszelkie prawa zastrzeżone. <br />
            Designed with{" "}
            <Heart size={12} className="inline text-primary mx-1" /> by AI
            Design Engineer.
          </p>
        </div>
      </footer>
    </div>
  );
}
