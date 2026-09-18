import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Boxes,
  Check,
  ChevronRight,
  CloudCog,
  Code2,
  Database,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Network,
  Terminal,
  Workflow,
  X,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const skills = [
  { name: 'Python', icon: Code2, tone: 'primary' },
  { name: 'Flask', icon: Workflow, tone: 'soft' },
  { name: 'FastAPI', icon: Terminal, tone: 'accent' },
  { name: 'Django', icon: Layers3, tone: 'soft' },
  { name: 'AWS Lambda / EC2', icon: CloudCog, tone: 'primary' },
  { name: 'Docker', icon: Boxes, tone: 'soft' },
  { name: 'Microservices', icon: Network, tone: 'accent' },
  { name: 'MongoDB', icon: Database, tone: 'soft' },
  { name: 'Redis + Celery', icon: Workflow, tone: 'primary' },
  { name: 'Shopify APIs', icon: Network, tone: 'soft' },
  { name: 'Amazon SP-API', icon: CloudCog, tone: 'accent' },
  { name: 'React', icon: Code2, tone: 'soft' },
];

const experience = [
  {
    company: 'Simprosys Infomedia',
    role: 'Software Engineer',
    label: 'Current',
    copy: 'Building and scaling a Shopify application used by merchants to make product discovery feel less like a search box and more like a useful tool.',
    highlights: ['1,800+ active merchants', '4.0 / 5 app rating', 'Shopify ecosystem'],
  },
  {
    company: 'Cord4',
    role: 'Software Engineer',
    label: 'Previous',
    copy: 'Worked across APIs, services, and the connective tissue that turns product requirements into dependable software.',
    highlights: ['Python systems', 'API integrations', 'Service architecture'],
  },
  {
    company: 'Learniphi Technology',
    role: 'Software Engineer',
    label: 'Previous',
    copy: 'Built learning-focused product capabilities with an eye for maintainable backends and practical user outcomes.',
    highlights: ['Django / Python', 'OpenEdX', 'Product delivery'],
  },
  {
    company: 'Infolabz',
    role: 'Python Developer',
    label: 'Earlier',
    copy: 'Started where the best engineering careers start: writing code, learning fast, and getting close to the problem.',
    highlights: ['Python foundations', 'Web development', 'Engineering craft'],
  },
];

function useReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal');
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    elements.forEach((element) => observerRef.current?.observe(element));
    return () => observerRef.current?.disconnect();
  }, []);
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { href: '#work', label: 'Work' },
    { href: '#systems', label: 'Systems' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleNav = (href: string) => {
    setMenuOpen(false);
    scrollToId(href.slice(1));
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-30 px-4 pt-4 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between rounded-full border border-[#c8cfcc] bg-[#f4f0e8]/90 px-4 py-3 shadow-[0_12px_30px_rgba(19,38,60,.06)] backdrop-blur-md sm:px-5">
        <button
          type="button"
          onClick={() => scrollToId('top')}
          data-testid="button-brand-home"
          className="group flex items-center gap-2.5 text-left"
          aria-label="Back to top"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#14253b] font-mono-custom text-xs font-medium text-[#d7f84a] transition-transform group-hover:rotate-12">GR</span>
          <span className="hidden font-display text-sm font-semibold tracking-[-.02em] text-[#14253b] sm:block">Gautam Rathore</span>
        </button>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={(event) => { event.preventDefault(); handleNav(link.href); }} className="nav-link text-[12px] font-semibold" data-testid={`link-nav-${link.label.toLowerCase()}`}>
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="mailto:gautamrathore1111@gmail.com?subject=Hello%20Gautam"
          data-testid="link-nav-start-conversation"
          className="lime-button hidden items-center gap-2 rounded-full bg-[#d7f84a] px-4 py-2.5 font-mono-custom text-[10px] font-medium uppercase tracking-[.08em] text-[#14253b] sm:flex"
        >
          Start a conversation <ArrowUpRight size={14} />
        </a>
        <button type="button" onClick={() => setMenuOpen((current) => !current)} data-testid="button-mobile-menu" className="rounded-full p-2 text-[#14253b] md:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {menuOpen && (
        <div className="mx-1 mt-2 rounded-3xl border border-[#c8cfcc] bg-[#f4f0e8] p-3 shadow-[0_12px_30px_rgba(19,38,60,.1)] md:hidden">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={(event) => { event.preventDefault(); handleNav(link.href); }} data-testid={`link-mobile-nav-${link.label.toLowerCase()}`} className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold text-[#14253b] hover:bg-[#d7f84a]">
              {link.label}<ChevronRight size={16} />
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[760px] overflow-hidden px-5 pb-24 pt-36 sm:px-8 lg:px-14 lg:pb-28 lg:pt-48">
      <div className="pointer-events-none absolute -right-44 -top-36 h-[500px] w-[500px] rounded-full border-[1px] border-[#c8cfcc] opacity-70" />
      <div className="pointer-events-none absolute -right-24 -top-16 h-[290px] w-[290px] rounded-full border-[1px] border-[#c8cfcc] opacity-60" />
      <div className="mx-auto grid max-w-[1440px] items-end gap-14 lg:grid-cols-[1.12fr_.88fr] lg:gap-20">
        <div>
          <div className="reveal section-marker eyebrow text-[#51626b]">Python-focused software engineer / Ahmedabad, India</div>
          <h1 className="hero-title reveal reveal-delay-1 mt-7 max-w-[900px] font-display text-[clamp(4.1rem,10.6vw,10.5rem)] font-semibold leading-[.88] tracking-[-.085em] text-[#14253b]">
            Make the<br />
            <span className="relative inline-block">messy <span className="absolute -bottom-1 left-1 right-0 h-[8px] -rotate-1 bg-[#d7f84a] sm:h-[13px]" /></span><br />
            useful.
          </h1>
          <div className="reveal reveal-delay-2 mt-10 flex max-w-[650px] flex-col gap-7 sm:flex-row sm:items-start">
            <div className="h-px w-12 shrink-0 bg-[#14253b] sm:mt-3" />
            <p className="max-w-[510px] text-[16px] leading-[1.65] text-[#51626b]">
              Gautam turns commerce data, third-party APIs, and the hard edges between systems into reliable products people can actually depend on.
            </p>
          </div>
          <div className="reveal reveal-delay-3 mt-10 flex flex-wrap items-center gap-3">
            <a href="#work" onClick={(event) => { event.preventDefault(); scrollToId('work'); }} data-testid="link-hero-see-work" className="lime-button inline-flex items-center gap-3 rounded-full bg-[#d7f84a] px-5 py-3.5 font-mono-custom text-[11px] font-medium uppercase tracking-[.09em] text-[#14253b]">
              See the work <ArrowDown size={15} />
            </a>
            <a href="mailto:gautamrathore1111@gmail.com?subject=Hello%20Gautam" data-testid="link-hero-email" className="outline-button inline-flex items-center gap-3 rounded-full border border-[#14253b] px-5 py-3.5 font-mono-custom text-[11px] font-medium uppercase tracking-[.09em] text-[#14253b]">
              Email Gautam <Mail size={15} />
            </a>
          </div>
        </div>
        <div className="reveal reveal-delay-2 lg:pb-1">
          <div className="terminal-panel relative mx-auto max-w-[510px] rounded-[2px] px-5 py-5 sm:px-7 sm:py-7">
            <div className="mb-8 flex items-center justify-between border-b border-[#f4f0e8]/15 pb-4">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#ff9b7a]" />
                <span className="h-2 w-2 rounded-full bg-[#d7f84a]" />
                <span className="h-2 w-2 rounded-full bg-[#96a4ae]" />
              </div>
              <span className="font-mono-custom text-[10px] text-[#96a4ae]">gautam.py</span>
            </div>
            <pre className="overflow-x-auto font-mono-custom text-[11px] leading-[2.05] sm:text-[13px]"><code>
              <span className="muted-code">01 </span><span className="key-code">class</span> <span className="string-code">ReliableProduct</span>:
              {'\n'}<span className="muted-code">02 </span>  <span className="key-code">def</span> <span className="string-code">__init__</span>(self):
              {'\n'}<span className="muted-code">03 </span>    self.focus = [
              {'\n'}<span className="muted-code">04 </span>      <span className="string-code">&quot;commerce data&quot;</span>,
              {'\n'}<span className="muted-code">05 </span>      <span className="string-code">&quot;API integrations&quot;</span>,
              {'\n'}<span className="muted-code">06 </span>      <span className="string-code">&quot;production scale&quot;</span>,
              {'\n'}<span className="muted-code">07 </span>    ]
              {'\n'}<span className="muted-code">08 </span>    self.default = <span className="key-code">reliable</span>
              {'\n'}<span className="muted-code">09 </span>
              {'\n'}<span className="muted-code">10 </span>  <span className="comment-code"># ship the useful thing</span>
            </code></pre>
            <div className="mt-8 flex items-center justify-between border-t border-[#f4f0e8]/15 pt-4">
              <span className="font-mono-custom text-[10px] text-[#96a4ae]">status: <span className="text-[#d7f84a]">shipping</span></span>
              <span className="h-3 w-[2px] animate-[cursor-blink_1s_steps(1)_infinite] bg-[#d7f84a]" />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-20 max-w-[1440px] border-t border-[#c8cfcc] pt-4">
        <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono-custom text-[10px] uppercase tracking-[.12em] text-[#718087]">
          <span>01 / Engineer at scale</span><span>02 / Backend depth</span><span>03 / Merchant empathy</span>
        </div>
      </div>
    </section>
  );
}

function ProofStrip() {
  return (
    <section className="overflow-hidden border-y border-[#14253b] bg-[#14253b] py-5 text-[#f4f0e8]" aria-label="Key facts">
      <div className="ticker flex items-center gap-9 whitespace-nowrap font-mono-custom text-[11px] uppercase tracking-[.15em]">
        {Array.from({ length: 2 }).flatMap((_, copyIndex) => [
          <span key={`a-${copyIndex}`} className="flex items-center gap-9"><strong className="font-normal text-[#d7f84a]">4+ years</strong> shipping software <span className="text-[#718087]">/</span></span>,
          <span key={`b-${copyIndex}`} className="flex items-center gap-9"><strong className="font-normal text-[#d7f84a]">1,800+</strong> active merchants <span className="text-[#718087]">/</span></span>,
          <span key={`c-${copyIndex}`} className="flex items-center gap-9"><strong className="font-normal text-[#ff9b7a]">4.0 / 5</strong> product rating <span className="text-[#718087]">/</span></span>,
          <span key={`d-${copyIndex}`} className="flex items-center gap-9"><strong className="font-normal text-[#d7f84a]">BCA</strong> Gujarat University <span className="text-[#718087]">/</span></span>,
        ])}
      </div>
    </section>
  );
}

function WorkSection() {
  return (
    <section id="work" className="px-5 py-24 sm:px-8 lg:px-14 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="reveal flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow section-marker text-[#51626b]">01 / Featured work</p>
            <h2 className="mt-5 max-w-[750px] font-display text-[clamp(3rem,7vw,7.2rem)] font-semibold leading-[.9] tracking-[-.075em] text-[#14253b]">A search box<br />with a <span className="text-[#e97958]">point of view.</span></h2>
          </div>
          <p className="max-w-[315px] text-sm leading-[1.7] text-[#51626b] lg:pb-2">One product. A lot of systems underneath. SearchGro is where engineering detail meets a merchant-facing outcome.</p>
        </div>
        <div className="reveal reveal-delay-1 mt-14 grid overflow-hidden border border-[#14253b] bg-[#14253b] lg:grid-cols-[1.1fr_.9fr]">
          <div className="relative min-h-[430px] overflow-hidden bg-[#d7f84a] p-7 sm:p-10 lg:p-14">
            <div className="absolute -right-10 -top-20 h-72 w-72 rounded-full border-[1px] border-[#14253b]/25" />
            <div className="absolute -right-2 -top-12 h-56 w-56 rounded-full border-[1px] border-[#14253b]/20" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="font-mono-custom text-[11px] uppercase tracking-[.13em] text-[#14253b]/65">Case file / 001</span>
                <span className="rounded-full border border-[#14253b]/30 px-3 py-1 font-mono-custom text-[10px] uppercase tracking-[.1em] text-[#14253b]">Shopify app</span>
              </div>
              <div className="mt-24">
                <p className="font-mono-custom text-[12px] text-[#14253b]/60">SearchGro</p>
                <h3 className="mt-2 max-w-[520px] font-display text-[clamp(3.5rem,8vw,7rem)] font-semibold leading-[.83] tracking-[-.09em] text-[#14253b]">Find<br />faster.</h3>
              </div>
              <div className="mt-16 flex items-end justify-between gap-5 border-t border-[#14253b]/25 pt-4">
                <p className="max-w-[270px] text-xs leading-[1.6] text-[#14253b]/75">A better product search experience for Shopify merchants and the people shopping with them.</p>
                <span className="font-mono-custom text-[11px] text-[#14253b]/70">SG / 2024—now</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between p-7 text-[#f4f0e8] sm:p-10 lg:p-14">
            <div>
              <div className="flex items-center gap-2 font-mono-custom text-[11px] uppercase tracking-[.1em] text-[#d7f84a]"><span className="h-1.5 w-1.5 rounded-full bg-[#d7f84a]" /> live in the wild</div>
              <p className="mt-8 max-w-[460px] font-display text-2xl leading-[1.2] tracking-[-.035em] sm:text-3xl">Gautam built and scaled the Shopify application at Simprosys Infomedia to <span className="text-[#d7f84a]">1,800+ active merchants</span>, with a 4.0 / 5 rating.</p>
              <div className="mt-10 grid gap-5 border-t border-[#f4f0e8]/20 pt-6 sm:grid-cols-2">
                <div><p className="font-mono-custom text-[10px] uppercase tracking-[.1em] text-[#96a4ae]">Problem</p><p className="mt-2 text-sm leading-[1.55] text-[#d8ddd8]">Make product discovery useful inside a crowded storefront.</p></div>
                <div><p className="font-mono-custom text-[10px] uppercase tracking-[.1em] text-[#96a4ae]">Role</p><p className="mt-2 text-sm leading-[1.55] text-[#d8ddd8]">Backend systems, APIs, integrations, and the details between.</p></div>
              </div>
            </div>
            <a href="#contact" onClick={(event) => { event.preventDefault(); scrollToId('contact'); }} data-testid="link-searchgro-contact" className="group mt-12 inline-flex w-fit items-center gap-3 border-b border-[#d7f84a] pb-2 font-mono-custom text-[11px] uppercase tracking-[.1em] text-[#d7f84a]">
              Talk about the build <ArrowUpRight className="icon-arrow" size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SystemsSection() {
  return (
    <section id="systems" className="hairline-grid border-y border-[#c8cfcc] bg-[#ebe9df] px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="reveal grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="eyebrow section-marker text-[#51626b]">02 / Systems I speak</p>
            <h2 className="mt-5 font-display text-[clamp(3rem,6vw,6rem)] font-semibold leading-[.9] tracking-[-.075em] text-[#14253b]">Depth over<br /><span className="text-[#e97958]">buzzwords.</span></h2>
          </div>
          <div className="lg:pt-8">
            <p className="max-w-[580px] text-lg leading-[1.55] text-[#51626b]">The stack is a toolbelt, not a personality. These are the technologies Gautam has used to make products, integrations, and asynchronous work hold together in production.</p>
          </div>
        </div>
        <div className="reveal reveal-delay-1 mt-16 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div key={skill.name} className={`skill-pill flex min-h-[98px] flex-col justify-between p-4 ${skill.tone === 'primary' ? 'bg-[#14253b] text-[#f4f0e8] border-[#14253b]' : ''} ${skill.tone === 'accent' ? 'border-[#ff9b7a]' : ''}`} data-testid={`skill-${index}`}>
                <Icon size={18} strokeWidth={1.6} className={skill.tone === 'primary' ? 'text-[#d7f84a]' : 'text-[#e97958]'} />
                <span className="font-display text-[15px] font-semibold tracking-[-.025em]">{skill.name}</span>
              </div>
            );
          })}
        </div>
        <div className="reveal reveal-delay-2 mt-20 grid gap-5 md:grid-cols-3">
          {[
            { number: '01', title: 'Connect', copy: 'Third-party APIs, SDKs, and services that need to agree on the same reality.' },
            { number: '02', title: 'Process', copy: 'Queues, workers, caching, and microservices that keep the work moving.' },
            { number: '03', title: 'Ship', copy: 'Cloud infrastructure and thoughtful interfaces that turn backend effort into value.' },
          ].map((item) => (
            <div key={item.number} className="wire-card border-t border-[#14253b] py-5">
              <span className="font-mono-custom text-[11px] text-[#e97958]">{item.number}</span>
              <h3 className="mt-10 font-display text-2xl font-semibold tracking-[-.04em] text-[#14253b]">{item.title}</h3>
              <p className="mt-3 max-w-[300px] text-sm leading-[1.65] text-[#51626b]">{item.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="px-5 py-24 sm:px-8 lg:px-14 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="reveal flex flex-col justify-between gap-6 border-b border-[#c8cfcc] pb-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow section-marker text-[#51626b]">03 / The path so far</p>
            <h2 className="mt-5 font-display text-[clamp(3rem,6.5vw,6.8rem)] font-semibold leading-[.88] tracking-[-.08em] text-[#14253b]">Close to the<br /><span className="text-[#e97958]">real problem.</span></h2>
          </div>
          <p className="max-w-[300px] text-sm leading-[1.7] text-[#51626b] md:pb-1">Four chapters, one consistent instinct: understand the system before trying to optimize it.</p>
        </div>
        <div className="reveal reveal-delay-1 relative mt-12 pl-8 sm:pl-12">
          <div className="timeline-line" />
          {experience.map((item, index) => (
            <article key={item.company} className="relative mb-12 grid gap-4 last:mb-0 md:grid-cols-[.65fr_1.35fr] md:gap-14">
              <span className="timeline-dot" />
              <div className="flex items-center gap-3 pt-1">
                <span className="font-mono-custom text-[11px] text-[#e97958]">{String(index + 1).padStart(2, '0')}</span>
                <span className="font-mono-custom text-[10px] uppercase tracking-[.1em] text-[#718087]">{item.label}</span>
              </div>
              <div className="border-b border-[#c8cfcc] pb-10">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl font-semibold tracking-[-.045em] text-[#14253b] sm:text-3xl">{item.company}</h3>
                  <span className="font-mono-custom text-[11px] text-[#718087]">{item.role}</span>
                </div>
                <p className="mt-4 max-w-[610px] text-sm leading-[1.7] text-[#51626b]">{item.copy}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.highlights.map((highlight) => <span key={highlight} className="rounded-full bg-[#ebe9df] px-3 py-1.5 font-mono-custom text-[10px] text-[#51626b]">{highlight}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PrinciplesSection() {
  return (
    <section className="bg-[#14253b] px-5 py-24 text-[#f4f0e8] sm:px-8 lg:px-14 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="reveal grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
          <div>
            <p className="eyebrow section-marker text-[#aab5b7]">04 / How I work</p>
            <h2 className="mt-5 font-display text-[clamp(3rem,6vw,6rem)] font-semibold leading-[.9] tracking-[-.075em]">Good systems<br /><span className="text-[#d7f84a]">feel obvious.</span></h2>
          </div>
          <div className="grid gap-0 border-t border-[#f4f0e8]/20">
            {[
              ['Read the edges', 'The interesting bugs live in the handoff: one API to another, one queue to a worker, one assumption to the next.'],
              ['Prefer useful', 'A clean abstraction matters. So does shipping the thing that makes a merchant or learner’s day easier.'],
              ['Leave a map', 'Code is collaborative infrastructure. Names, boundaries, and decisions should help the next engineer move faster.'],
            ].map(([title, copy], index) => (
              <div key={title} className="grid gap-4 border-b border-[#f4f0e8]/20 py-7 sm:grid-cols-[80px_1fr] sm:gap-8">
                <span className="font-mono-custom text-[11px] text-[#ff9b7a]">0{index + 1}</span>
                <div><h3 className="font-display text-2xl font-semibold tracking-[-.04em]">{title}</h3><p className="mt-3 max-w-[480px] text-sm leading-[1.7] text-[#bfc8c8]">{copy}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal reveal-delay-1 mt-20 flex flex-wrap gap-x-10 gap-y-5 border-t border-[#f4f0e8]/20 pt-6 font-mono-custom text-[10px] uppercase tracking-[.13em] text-[#aab5b7]">
          <span className="flex items-center gap-2"><Check size={13} className="text-[#d7f84a]" /> clear interfaces</span>
          <span className="flex items-center gap-2"><Check size={13} className="text-[#d7f84a]" /> useful defaults</span>
          <span className="flex items-center gap-2"><Check size={13} className="text-[#d7f84a]" /> fewer surprises</span>
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section className="px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <div className="reveal">
          <p className="eyebrow section-marker text-[#51626b]">05 / Foundations</p>
          <h2 className="mt-5 max-w-[650px] font-display text-[clamp(3rem,6vw,6rem)] font-semibold leading-[.9] tracking-[-.075em] text-[#14253b]">Curiosity is<br /><span className="text-[#e97958]">a feature.</span></h2>
          <p className="mt-8 max-w-[495px] text-base leading-[1.7] text-[#51626b]">The formal line: a Bachelor of Computer Applications from Gujarat University, completed between 2019 and 2022. The useful line: keep learning every time the system gets interesting.</p>
        </div>
        <div className="reveal reveal-delay-1 border border-[#14253b] bg-[#ebe9df] p-7 sm:p-10">
          <div className="flex items-start justify-between">
            <GraduationCap size={28} strokeWidth={1.4} className="text-[#e97958]" />
            <span className="font-mono-custom text-[11px] text-[#718087]">2019 — 2022</span>
          </div>
          <p className="mt-20 font-mono-custom text-[10px] uppercase tracking-[.12em] text-[#718087]">Gujarat University</p>
          <h3 className="mt-3 font-display text-4xl font-semibold leading-none tracking-[-.06em] text-[#14253b]">Bachelor of<br />Computer Applications</h3>
          <div className="mt-12 flex items-center gap-3 border-t border-[#c8cfcc] pt-4 font-mono-custom text-[10px] uppercase tracking-[.1em] text-[#51626b]"><span className="h-2 w-2 rounded-full bg-[#d7f84a]" /> Ahmedabad, India</div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="contact-block px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="reveal grid gap-12 lg:grid-cols-[1fr_.7fr] lg:gap-24">
          <div>
            <p className="eyebrow section-marker text-[#14253b]">06 / Open channel</p>
            <h2 className="mt-5 max-w-[900px] font-display text-[clamp(3.6rem,9vw,9.5rem)] font-semibold leading-[.82] tracking-[-.09em] text-[#14253b]">Have a<br />hard problem?</h2>
            <p className="mt-10 max-w-[470px] text-lg leading-[1.55] text-[#14253b]/75">Tell me what is tangled. I like working from the sharp edge of a product, where better systems make a visible difference.</p>
          </div>
          <div className="flex flex-col justify-end lg:pb-2">
            <a href="mailto:gautamrathore1111@gmail.com?subject=Let's%20work%20together" data-testid="link-contact-email" className="contact-link group flex items-center justify-between py-4 font-display text-xl font-semibold tracking-[-.035em] text-[#14253b] sm:text-2xl">
              gautamrathore1111@gmail.com <ArrowUpRight className="icon-arrow shrink-0" size={23} />
            </a>
            <a href="tel:+918849504992" data-testid="link-contact-phone" className="contact-link group flex items-center justify-between py-4 font-display text-xl font-semibold tracking-[-.035em] text-[#14253b] sm:text-2xl">
              +91 88495 04992 <ArrowUpRight className="icon-arrow shrink-0" size={23} />
            </a>
            <a href="https://www.linkedin.com/in/gautam-rathore-python" target="_blank" rel="noreferrer" data-testid="link-contact-linkedin" className="contact-link group flex items-center justify-between py-4 font-display text-xl font-semibold tracking-[-.035em] text-[#14253b] sm:text-2xl">
              LinkedIn <ArrowUpRight className="icon-arrow shrink-0" size={23} />
            </a>
            <p className="mt-8 flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[.1em] text-[#14253b]/65"><MapPin size={13} /> Ahmedabad, India</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#14253b] px-5 py-7 text-[#f4f0e8] sm:px-8 lg:px-14">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d7f84a] font-mono-custom text-xs font-medium text-[#14253b]">GR</span>
          <span className="font-display text-sm font-semibold">Gautam Rathore</span>
        </div>
        <p className="font-mono-custom text-[10px] uppercase tracking-[.11em] text-[#96a4ae]">Reliable by default / 2025</p>
        <button type="button" onClick={() => scrollToId('top')} data-testid="button-footer-back-top" className="group flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[.11em] text-[#d7f84a]">
          Back to top <ArrowUpRight className="icon-arrow" size={14} />
        </button>
      </div>
    </footer>
  );
}

function Home() {
  useReveal();
  return (
    <div className="site-shell grain min-h-[100dvh] bg-[#f4f0e8]">
      <Navigation />
      <main>
        <Hero />
        <ProofStrip />
        <WorkSection />
        <SystemsSection />
        <ExperienceSection />
        <PrinciplesSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <ErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;