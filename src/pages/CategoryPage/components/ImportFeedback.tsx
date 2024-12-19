import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface ImportFeedbackProps {
  error: string | null;
  stats: {
    added: number;
    skipped: number;
  } | null;
}

export const ImportFeedback: React.FC<ImportFeedbackProps> = ({ error, stats }) => {
  if (!error && !stats) return null;

  return (
    <div className="space-y-2">
      {error && (
        <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}
      
      {stats && (
        <div className="flex items-start gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-green-400">
            <p>Import terminé avec succès :</p>
            <ul className="list-disc list-inside mt-1">
              <li>{stats.added} articles ajoutés</li>
              {stats.skipped > 0 && (
                <li>{stats.skipped} articles ignorés (déjà existants)</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};