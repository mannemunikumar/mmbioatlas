import React, { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  FileCheck, 
  ListOrdered,
  Award,
  BookMarked,
  ShieldCheck,
  Send
} from 'lucide-react';

interface AcademicWritingProps {
  onOpenConsultation?: (service: string) => void;
}

export const AcademicWriting: React.FC<AcademicWritingProps> = ({ onOpenConsultation }) => {
  const [selectedJournalTier, setSelectedJournalTier] = useState<string>('q1');
  const [activeChecklist, setActiveChecklist] = useState<string>('structure');

  const journals = [
    { name: 'Nature Methods / Nature Biotech', if: '38.5+', match: '98%', focus: 'Novel computational algorithms & single-cell benchmarks' },
    { name: 'Bioinformatics (Oxford)', if: '5.8+', match: '95%', focus: 'Algorithmic pipelines, software tools & databases' },
    { name: 'Journal of Chemical Information & Modeling (JCIM)', if: '5.6+', match: '96%', focus: 'Molecular docking, MD simulations, CADD' },
    { name: 'Nucleic Acids Research (NAR)', if: '14.9+', match: '94%', focus: 'Genomics, functional genomics, RNA biology' },
  ];

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/40 p-8 sm:p-10 shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono font-medium">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Peer-Reviewed Publishing Solutions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Academic &amp; Scientific Writing
          </h1>
          <p className="text-base text-blue-200/90 font-medium italic">
            We transform raw research into publication-ready, high-impact scientific literature.
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            Writing with rigorous scientific clarity, statistical integrity, and strict adherence to journal formatting standards. We support principal investigators, postdoctoral fellows, and graduate scholars across global academic institutions.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenConsultation && onOpenConsultation('writing')}
              className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold text-xs font-mono flex items-center gap-2 shadow-lg shadow-blue-500/20 transition"
            >
              <span>Submit Manuscript for Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Two Core Columns: Manuscript Writing & Thesis Support */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Module 1: Manuscript Writing */}
        <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition shadow-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <FileText className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-bold text-white">Manuscript Writing</h3>
            <p className="text-sm text-cyan-300 font-mono">
              Structuring, drafting, and refining research papers tailored to high-impact, peer-reviewed journals.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              We translate experimental outcomes, in silico docking tables, and multi-omic pipelines into compelling scientific narratives that survive peer review scrutiny.
            </p>

            <ul className="space-y-2.5 pt-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Target Journal Alignment:</strong> Formatting references, abstract limits, and figure resolutions according to Elsevier, Springer Nature, Wiley, and IEEE styles.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Methods &amp; Supplementary Data:</strong> Replicable computational protocols with exact command lines, parameters, and random seeds.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Peer Review Rebuttal Support:</strong> Point-by-point author rebuttal letters addressing reviewer concerns with updated statistical evaluations.</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-slate-800">
            <button
              onClick={() => onOpenConsultation && onOpenConsultation('manuscript')}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 text-xs font-mono font-semibold flex items-center justify-center gap-2 transition"
            >
              <span>Request Manuscript Drafting Support</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Module 2: Thesis & Dissertation Support */}
        <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition shadow-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <GraduationCap className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-bold text-white">Thesis &amp; Dissertation Support</h3>
            <p className="text-sm text-purple-300 font-mono">
              Comprehensive structuring, literature review drafting, and results interpretation for Master’s and Ph.D. scholars.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Navigating university formatting guidelines, exhaustive state-of-the-art literature syntheses, and synthesis of interdisciplinary multi-omic research chapters.
            </p>

            <ul className="space-y-2.5 pt-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span><strong>Exhaustive Literature Reviews:</strong> Systematic PRISMA-compliant search queries across PubMed, Scopus, and Web of Science.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span><strong>Results &amp; Discussion Synthesis:</strong> Connecting wet-lab or in silico data directly to foundational biochemical mechanisms.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span><strong>Defense Preparation:</strong> Defense presentation slide decks, viva-voce mock defense questions, and chapter synopsis summaries.</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-slate-800">
            <button
              onClick={() => onOpenConsultation && onOpenConsultation('thesis')}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 text-xs font-mono font-semibold flex items-center justify-center gap-2 transition"
            >
              <span>Inquire Thesis Guidance</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Target Journal Compatibility Inspector */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Target Journal Compatibility Matrix</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              We structure all drafts against exact journal author guidelines and citation style requirements.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-500/30">
            100% Plagiarism-Free Guarantee
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {journals.map((j, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 font-semibold">Impact Factor: {j.if}</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
                  Fit: {j.match}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-200">{j.name}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{j.focus}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
