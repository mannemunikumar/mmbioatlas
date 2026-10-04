import React, { useState } from 'react';
import { TRAINING_PROGRAMS } from '../data/websiteContent';
import { TrainingProgramInfo } from '../types';
import { 
  GraduationCap, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  Calendar, 
  FileCode2, 
  Sparkles, 
  Check, 
  Download,
  Terminal,
  Send
} from 'lucide-react';

interface TrainingProgramsProps {
  onOpenEnrollment?: (program: string) => void;
}

export const TrainingPrograms: React.FC<TrainingProgramsProps> = ({ onOpenEnrollment }) => {
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgramInfo>(TRAINING_PROGRAMS[1]); // 3-Month default

  return (
    <div className="space-y-10">
      {/* Section Header */}
      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Project-Based Bioinformatics Academy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0b3b70]">
            Training &amp; Research Projects
          </h1>
          <p className="text-base text-emerald-800 font-medium italic">
            Equipping students, scholars, and professionals with industry-standard computational skills.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            The programs combine live mentorship from veteran bioinformaticians, dedicated high-performance Linux cloud environments, and hands-on publication-oriented project execution.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenEnrollment && onOpenEnrollment('training-3m')}
              className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition"
            >
              <span>Join a Training Program</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Official Copy Table: Program Length | Focus Area | Ideal For */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs uppercase tracking-wider text-slate-500 font-bold">
            Standard Curriculum Tracks &amp; Research Fellowships
          </h3>
          <span className="text-xs font-semibold text-emerald-700">Applications Open for Upcoming Cohort</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
                <th className="py-4 px-6 font-bold">Program Length</th>
                <th className="py-4 px-6 font-bold">Focus Area</th>
                <th className="py-4 px-6 font-bold">Ideal For</th>
                <th className="py-4 px-6 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {TRAINING_PROGRAMS.map((prog) => {
                const isSelected = selectedProgram.id === prog.id;
                return (
                  <tr
                    key={prog.id}
                    onClick={() => setSelectedProgram(prog)}
                    className={`cursor-pointer transition ${
                      isSelected
                        ? 'bg-blue-50/70'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-5 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-2 h-2 rounded-full ${prog.highlight ? 'bg-emerald-500' : 'bg-[#0b3b70]'}`} />
                        <div>
                          <strong className="text-[#0b3b70] font-bold text-sm sm:text-base">
                            {prog.length}
                          </strong>
                          {prog.highlight && (
                            <span className="ml-2 inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              Most Popular
                            </span>
                          )}
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {prog.weeklyHours}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6 max-w-md text-slate-700 leading-relaxed">
                      {prog.focusArea}
                    </td>
                    <td className="py-5 px-6 text-slate-800 text-xs whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-medium">
                        {prog.idealFor}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenEnrollment && onOpenEnrollment(prog.id);
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
                      >
                        Enroll Now
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Program Detailed Syllabus & Deliverables Breakdown */}
      <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Curriculum Deep Dive
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0b3b70] mt-1">
              {selectedProgram.length}: Syllabus &amp; Research Milestones
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Designed for: <strong className="text-slate-800">{selectedProgram.idealFor}</strong>
            </p>
          </div>

          <button
            onClick={() => onOpenEnrollment && onOpenEnrollment(selectedProgram.id)}
            className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Apply for {selectedProgram.length}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Software Stack */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#0b3b70] font-bold flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-600" />
              <span>Computational Software &amp; Frameworks Covered</span>
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {selectedProgram.tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 font-medium"
                >
                  {tool}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed pt-2">
              All scholars are provisioned remote cloud terminal environments pre-configured with GPU-accelerated computing nodes.
            </p>
          </div>

          {/* Tangible Deliverables */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#0b3b70] font-bold flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Tangible Scholar Deliverables</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-700">
              {selectedProgram.deliverables.map((del, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{del}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
