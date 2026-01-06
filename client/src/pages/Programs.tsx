import { useState } from 'react';
import Layout from '@/components/Layout';
import ProgramCard from '@/components/ProgramCard';
import ProgramDetailModal from '@/components/ProgramDetailModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Loader2, AlertCircle } from 'lucide-react';
import { usePrograms } from '@/hooks/usePrograms';
import type { Program, ProgramType, CLUB_RELATED_TYPES } from '@/types';
import { CLUB_RELATED_TYPES as clubRelatedTypes } from '@/types';

type FilterValue = ProgramType | 'all' | 'club_related';

const filterOptions: { label: string; value: FilterValue }[] = [
  { label: 'すべて', value: 'all' },
  { label: 'クラス発表', value: 'class' },
  { label: '部活動', value: 'club_related' },
  { label: '飲食', value: 'food' },
];

export default function Programs() {
  const { programs, loading, error, refetch } = usePrograms();
  const [selectedFilter, setSelectedFilter] = useState<FilterValue>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  // 全てのタグを抽出
  const allTags = Array.from(new Set(programs.flatMap((p) => p.tags || []))).sort();

  const filteredPrograms = programs.filter((program) => {
    // カテゴリフィルター判定
    let matchesFilter = false;
    if (selectedFilter === 'all') {
      matchesFilter = true;
    } else if (selectedFilter === 'club_related') {
      matchesFilter = clubRelatedTypes.includes(program.type as any);
    } else {
      matchesFilter = program.type === selectedFilter;
    }

    // タグフィルター判定
    const matchesTag = selectedTag === 'all' || (program.tags && program.tags.includes(selectedTag));

    // 検索判定
    const matchesSearch =
      searchQuery === '' ||
      program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesTag && matchesSearch;
  });

  return (
    <Layout>
      {/* ヘッダー */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="font-bold">企画紹介</h1>
            <p className="text-lg text-muted-foreground">
              クラス発表、部活動発表、飲食企画など、梨花祭の多彩なプログラムをご紹介します
            </p>
          </div>
        </div>
      </section>

      {/* フィルター・検索 */}
      <section className="py-8 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-16 z-40">
        <div className="container space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* カテゴリフィルター */}
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={selectedFilter === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setSelectedFilter(option.value as FilterValue);
                    setSelectedTag('all'); // カテゴリ変更時にタグをリセット
                  }}
                >
                  {option.label}
                </Button>
              ))}
            </div>

            {/* 検索 */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="企画を検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* タグフィルター */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-medium text-muted-foreground mr-2">タグ:</span>
              <Button
                variant={selectedTag === 'all' ? 'secondary' : 'ghost'}
                size="xs"
                className="h-7 px-3 text-xs"
                onClick={() => setSelectedTag('all')}
              >
                すべて
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? 'secondary' : 'ghost'}
                  size="xs"
                  className="h-7 px-3 text-xs"
                  onClick={() => setSelectedTag(tag)}
                >
                  #{tag}
                </Button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 企画一覧 */}
      <section className="py-12">
        <div className="container">
          {/* エラー表示 */}
          {error && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-yellow-800 font-semibold mb-1">注意</p>
                <p className="text-sm text-yellow-700 whitespace-pre-wrap">{error}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => refetch()}
                >
                  再試行
                </Button>
              </div>
            </div>
          )}

          {/* ローディング */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">企画情報を読み込んでいます...</p>
            </div>
          ) : filteredPrograms.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                {filteredPrograms.length}件の企画が見つかりました
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrograms.map((program) => (
                  <div
                    key={program.id}
                    onClick={() => {
                      setSelectedProgram(program);
                      setDetailModalOpen(true);
                    }}
                    className="cursor-pointer"
                  >
                    <ProgramCard program={program} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                条件に一致する企画が見つかりませんでした
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedFilter('all');
                  setSelectedTag('all');
                  setSearchQuery('');
                }}
              >
                フィルターをリセット
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* 詳細モーダル */}
      {selectedProgram && (
        <ProgramDetailModal
          program={selectedProgram}
          open={detailModalOpen}
          onOpenChange={setDetailModalOpen}
        />
      )}
    </Layout>
  );
}
