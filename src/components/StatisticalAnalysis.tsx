import React, { useState } from 'react';
import { 
  BarChart3, 
  LineChart, 
  TrendingUp, 
  CheckCircle2, 
  Sliders, 
  HelpCircle, 
  PieChart, 
  ArrowRight,
  Calculator,
  Layers,
  FileSpreadsheet,
  Check
} from 'lucide-react';

interface StatisticalAnalysisProps {
  onOpenConsultation?: (service: string) => void;
}

export const StatisticalAnalysis: React.FC<StatisticalAnalysisProps> = ({ onOpenConsultation }) => {
  // Interactive Statistical Modeling State
  const [selectedTest, setSelectedTest] = useState<'anova' | 'ttest' | 'regression'>('anova');
  const [sampleSizeN, setSampleSizeN] = useState<number>(120);
  const [effectSize, setEffectSize] = useState<number>(0.45);

  // Dynamic values
  const fStatistic = (effectSize * 12.4).toFixed(2);
  const pValue = effectSize > 0.3 ? (0.001 / (effectSize * 5)).toFixed(4) : '0.0842';
  const isSignificant = Number(pValue) < 0.05;

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/20 p-8 sm:p-10 shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Mathematical &amp; Empirical Rigor</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Statistical &amp; Survey Data Analysis
          </h1>
          <p className="text-base text-amber-200/90 font-medium italic">
            Robust analytics to validate your research hypotheses.
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            Eliminate methodological flaws with high-precision statistical consulting. We audit assumptions, clean noisy observational data, execute advanced inferential modeling in R and SPSS, and generate publication-ready APA-style reports.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenConsultation && onOpenConsultation('statistics')}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs font-mono flex items-center gap-2 shadow-lg shadow-amber-500/20 transition"
            >
              <span>Consult a Biostatistician</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Two Core Pillars: Survey Data Analysis & Advanced Statistical Modeling */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pillar 1: Survey Data Analysis */}
        <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition shadow-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <FileSpreadsheet className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-bold text-white">Survey Data Analysis</h3>
            <p className="text-sm text-amber-300 font-mono">
              Processing, cleaning, and extracting actionable insights from large-scale academic, clinical, or market surveys.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              We handle complex survey datasets from REDCap, Qualtrics, Google Forms, and epidemiological questionnaires with strict validation.
            </p>

            <ul className="space-y-2.5 pt-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Data Cleansing &amp; Imputation:</strong> Handling missing data through MICE (Multiple Imputation by Chained Equations) and outlier detection.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Scale Reliability &amp; Validity:</strong> Cronbach’s alpha, McDonald’s omega, Exploratory Factor Analysis (EFA), and Confirmatory Factor Analysis (CFA).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Cross-Tabulations &amp; Non-Parametrics:</strong> Chi-square tests of independence, Mann-Whitney U, and Kruskal-Wallis analyses for Likert responses.</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-slate-800">
            <button
              onClick={() => onOpenConsultation && onOpenConsultation('survey')}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-mono font-semibold flex items-center justify-center gap-2 transition"
            >
              <span>Analyze Survey Data</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Pillar 2: Advanced Statistical Modeling */}
        <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition shadow-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <TrendingUp className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-bold text-white">Advanced Statistical Modeling</h3>
            <p className="text-sm text-cyan-300 font-mono">
              Hypothesis testing, regression models, ANOVA, and multivariate data analysis to ensure scientific and mathematical rigor.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              We design statistical architectures that prevent Type I/II errors, verify normality assumptions, and control for confounding covariates.
            </p>

            <ul className="space-y-2.5 pt-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Inferential Hypothesis Testing:</strong> One-way, Two-way, and Repeated Measures ANOVA, ANCOVA, and post-hoc Tukey/Bonferroni corrections.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Multivariate Regressions:</strong> Linear, logistic (binary &amp; multinomial), Cox proportional hazards survival modeling, and mixed-effects models.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Sample Size &amp; Power Calculation:</strong> G*Power a priori sample size estimation for IRB/ethics approvals and grant applications.</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-slate-800">
            <button
              onClick={() => onOpenConsultation && onOpenConsultation('modeling')}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono font-semibold flex items-center justify-center gap-2 transition"
            >
              <span>Build Statistical Model</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Hypothesis Testing & Bell Curve Simulator */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-400" />
              <span>Interactive Statistical Significance Modeler</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulate power, effect sizes (Cohen’s d / Partial η²), and p-value confidence intervals.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {(['anova', 'ttest', 'regression'] as const).map((test) => (
              <button
                key={test}
                onClick={() => setSelectedTest(test)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition ${
                  selectedTest === test
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                    : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {test}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-slate-300">
                <span>Sample Cohort Size (N):</span>
                <span className="text-amber-400 font-bold">{sampleSizeN} subjects</span>
              </div>
              <input
                type="range"
                min="30"
                max="500"
                step="10"
                value={sampleSizeN}
                onChange={(e) => setSampleSizeN(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-slate-300">
                <span>Observed Effect Size:</span>
                <span className="text-cyan-400 font-bold">{effectSize}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.9"
                step="0.05"
                value={effectSize}
                onChange={(e) => setEffectSize(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-mono">Computed Test Metric:</span>
                <span className="font-mono font-bold text-slate-200">F({selectedTest === 'anova' ? '2, 117' : '1, 118'}) = {fStatistic}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-mono">Two-Tailed p-value:</span>
                <span className={`font-mono font-bold ${isSignificant ? 'text-emerald-400' : 'text-rose-400'}`}>
                  p = {pValue}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-mono">Statistical Decision:</span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                  isSignificant ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30' : 'bg-rose-950/60 text-rose-300 border border-rose-500/30'
                }`}>
                  {isSignificant ? 'Reject Null Hypothesis (Significant)' : 'Fail to Reject H0'}
                </span>
              </div>
            </div>
          </div>

          {/* Bell Curve & Normal Distribution Canvas */}
          <div className="lg:col-span-7 h-52 rounded-xl bg-slate-950 border border-slate-800 p-4 relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Standard Normal Distribution (Z-Distribution &amp; Critical Region)</span>
              <span className="text-amber-400">α = 0.05 Level</span>
            </div>

            <div className="relative flex-1 flex items-center justify-center">
              <svg width="100%" height="120" viewBox="0 0 320 120" preserveAspectRatio="none">
                {/* Bell Curve Area Fill */}
                <path
                  d="M 10 110 Q 80 110 120 70 Q 160 10 200 70 Q 240 110 310 110 Z"
                  fill="rgba(245, 158, 11, 0.1)"
                />
                {/* Bell Curve Line */}
                <path
                  d="M 10 110 Q 80 110 120 70 Q 160 10 200 70 Q 240 110 310 110"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                />

                {/* Mean line */}
                <line x1="160" y1="10" x2="160" y2="110" stroke="#94a3b8" strokeDasharray="3 3" />
                
                {/* Critical cutoff threshold */}
                <line x1="230" y1="30" x2="230" y2="110" stroke="#f43f5e" strokeWidth="2" strokeDasharray="2 2" />
                <rect x="230" y="30" width="80" height="80" fill="rgba(244, 63, 94, 0.15)" />

                {/* Current sample marker */}
                {(() => {
                  const xPos = 160 + (effectSize * 100);
                  return (
                    <g>
                      <line x1={xPos} y1="15" x2={xPos} y2="110" stroke="#06b6d4" strokeWidth="2" />
                      <circle cx={xPos} cy="15" r="4" fill="#06b6d4" className="animate-pulse" />
                    </g>
                  );
                })()}
              </svg>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-800/80 pt-1">
              <span>μ = 0 (Null Hypothesis Center)</span>
              <span className="text-rose-400">Critical Region (p &lt; 0.05)</span>
              <span className="text-cyan-400">Observed Statistic</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
