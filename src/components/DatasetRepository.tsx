import React, { useState } from 'react';
import { 
  Database, 
  Download, 
  FileText, 
  Check, 
  Copy, 
  Sliders, 
  Calendar, 
  User, 
  HardDrive,
  ExternalLink,
  Layers
} from 'lucide-react';
import { BIOATLAS_DATASETS } from '../data/mockAtlasData';
import { BioAtlasDataset } from '../types';

export const DatasetRepository: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [copiedDoi, setCopiedDoi] = useState<string | null>(null);

  const technologies = [
    'All',
    'scRNA-seq',
    'snRNA-seq',
    'Spatial Transcriptomics',
    'Multi-Omic (CITE-seq)'
  ];

  const filteredDatasets = selectedTech === 'All'
    ? BIOATLAS_DATASETS
    : BIOATLAS_DATASETS.filter((d) => d.technology === selectedTech);

  const handleDownload = (accession: string, title: string) => {
    setDownloadingId(accession);
    setTimeout(() => {
      const metadataContent = {
        atlas: 'M & M BioATLAS v3.4',
        accession,
        title,
        status: 'Open Access CC-BY 4.0',
        timestamp: new Date().toISOString(),
        manifest: [
          'matrix.mtx.gz',
          'features.tsv.gz',
          'barcodes.tsv.gz',
          'adata_processed.h5ad',
          'spatial_coordinates.parquet'
        ]
      };
      const blob = new Blob([JSON.stringify(metadataContent, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${accession}_manifest_metadata.json`;
      a.click();
      URL.revokeObjectURL(url);
      setDownloadingId(null);
    }, 800);
  };

  const handleCopyDoi = (doi: string) => {
    navigator.clipboard.writeText(`https://doi.org/${doi}`);
    setCopiedDoi(doi);
    setTimeout(() => setCopiedDoi(null), 2000);
  };

  return (
    <div id="dataset-repository-view" className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">Open-Access Data Repository</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Curated, quality-controlled multi-omic matrices, raw FASTQ metadata, and AnnData objects available for academic research.
          </p>
        </div>

        {/* Tech Filter */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {technologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedTech === tech
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Dataset Cards List */}
      <div className="space-y-4">
        {filteredDatasets.map((ds) => (
          <div
            key={ds.accession}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition space-y-4"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/70 border border-cyan-800/50 px-2.5 py-0.5 rounded-full">
                    {ds.accession}
                  </span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {ds.organ}
                  </span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300">
                    {ds.technology}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight">{ds.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{ds.summary}</p>
              </div>

              {/* Download & DOI Button */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                <button
                  onClick={() => handleDownload(ds.accession, ds.title)}
                  disabled={downloadingId === ds.accession}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition shadow-lg shadow-cyan-500/20 active:scale-95 disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloadingId === ds.accession ? 'Exporting Package...' : 'Download AnnData'}</span>
                </button>

                <button
                  onClick={() => handleCopyDoi(ds.doi)}
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-mono transition"
                >
                  {copiedDoi === ds.doi ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">DOI Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy DOI</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Metadata Footer */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{ds.leadInvestigator}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{ds.publicationDate}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-slate-500" />
                  <span>{ds.sizeGb} GB</span>
                </span>
                <span className="text-slate-300 font-semibold">
                  {ds.cellsCount} Cells • {ds.donorCount} Donors
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[11px]">
                <span className="text-slate-500">Formats:</span>
                {ds.fileFormats.slice(0, 3).map((f) => (
                  <span key={f} className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
