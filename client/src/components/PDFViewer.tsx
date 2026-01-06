import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, ExternalLink, Download } from 'lucide-react';

interface PDFViewerProps {
  url: string;
  title: string;
}

export default function PDFViewer({ url, title }: PDFViewerProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex flex-col space-y-4">
      <div className="relative aspect-[1/1.414] w-full bg-muted rounded-lg overflow-hidden border">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">PDFを読み込んでいます...</p>
          </div>
        )}
        <iframe
          src={`${url}#toolbar=0&navpanes=0&scrollbar=0`}
          title={title}
          className="w-full h-full border-none"
          onLoad={() => setLoading(false)}
        />
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        <Button variant="outline" size="sm" asChild>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" />
            全画面で表示
          </a>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <a href={url} download>
            <Download className="h-4 w-4 mr-2" />
            ダウンロード
          </a>
        </Button>
      </div>
    </div>
  );
}
