import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Article {
  id: string;
  vol: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
}

const ARTICLES: Article[] = [
  {
    id: 'vol-1-campaign',
    vol: 'VOL. I',
    title: 'The Sacred Weight: Autumn / Winter Campaign',
    category: 'CAMPAIGN',
    date: 'AUTUMN 2026',
    excerpt: 'Shot under single-source directional museum tungsten in an abandoned brutalist cloister. An exploration of heavy silver rings as emotional armor in contemporary life.',
    image: './assets/images/hero-hand.jpg',
  },
  {
    id: 'in-praise-of-patina',
    vol: 'ESSAY',
    title: 'In Praise of Blackened Silver: Why Metal Must Age',
    category: 'METALLURGY',
    date: 'OCTOBER 2026',
    excerpt: 'Polished silver seeks to deny time; oxidized silver welcomes it. How daily contact with the human hand transforms bone-ash patinas into an intimate chronological portrait.',
    image: './assets/images/smoke-craft.jpg',
  },
  {
    id: 'relic-geometry',
    vol: 'ARCHIVE',
    title: 'Architectural Reliquaries: The Geometry of the Onyx Halo',
    category: 'DESIGN STUDY',
    date: 'SEPTEMBER 2026',
    excerpt: 'Examining 14th-century Gothic spire traceries and how medieval thorny buttresses were re-engineered down into a 31-gram wearable crown of blackened silver.',
    image: './assets/images/onyx-halo.jpg',
  },
];

export const JournalPage: React.FC = () => {
  return (
    <div className="pt-28 md:pt-36 pb-32 bg-[#050505] text-[#F2EEE7] min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16">
        
        {/* Header */}
        <div className="mb-20 border-b border-white/[0.08] pb-12">
          <div className="flex items-center space-x-2 text-[10px] tracking-[0.3em] uppercase text-[#8E1734] font-mono mb-4">
            <span>[EDITORIAL JOURNAL]</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-light text-[#F2EEE7] leading-[1.02]">
              Lookbook & <br />
              <span className="italic font-serif-luxury font-normal text-[#C4C4C2]">Dispatches</span>
            </h1>

            <p className="text-[12px] sm:text-[13px] leading-relaxed text-[#8A8780] font-light max-w-md">
              Essays on craftsmanship, material philosophy, and visual documentation from our subterranean studio and seasonal campaigns.
            </p>
          </div>
        </div>

        {/* Feature Hero Article */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-24 pb-20 border-b border-white/[0.08]">
          <div className="lg:col-span-7 aspect-[16/10] bg-[#0A0A08] border border-white/[0.08] overflow-hidden group">
            <img
              src={ARTICLES[0].image}
              alt={ARTICLES[0].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-3 text-[10px] tracking-[0.25em] text-[#8E1734] font-mono uppercase">
              <span>{ARTICLES[0].vol}</span>
              <span>·</span>
              <span>{ARTICLES[0].category}</span>
              <span>·</span>
              <span className="text-[#8A8780]">{ARTICLES[0].date}</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl text-[#F2EEE7] font-light leading-snug">
              {ARTICLES[0].title}
            </h2>

            <p className="text-[13px] text-[#8A8780] font-light leading-relaxed">
              {ARTICLES[0].excerpt}
            </p>

            <Link
              to="/collection"
              className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-[#F2EEE7] border-b border-[#8E1734] pb-1 hover:text-[#8E1734] transition-colors"
            >
              <span>EXPLORE CAMPAIGN PIECES</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
          {ARTICLES.slice(1).map((article) => (
            <article key={article.id} className="space-y-6 group">
              <div className="aspect-[4/3] bg-[#0A0A08] border border-white/[0.08] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-[10px] tracking-[0.2em] text-[#8E1734] font-mono uppercase">
                  <span>{article.category}</span>
                  <span>·</span>
                  <span className="text-[#8A8780]">{article.date}</span>
                </div>

                <h3 className="font-editorial text-2xl sm:text-3xl text-[#F2EEE7] font-light group-hover:text-[#F2EEE7] transition-colors">
                  {article.title}
                </h3>

                <p className="text-[12px] text-[#8A8780] font-light leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};
