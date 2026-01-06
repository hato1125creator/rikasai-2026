import { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import PageTransition from './PageTransition';
import { Home, Calendar, MapPin, Menu as MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { APP_TITLE } from '@/const';
import { textConfig } from '@/lib/textConfig';

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { label: textConfig.navAbout, href: '/about' },
  { label: textConfig.navAccess, href: '/access' },
  { label: textConfig.navPrograms, href: '/programs' },
  { label: textConfig.navClassroomMap, href: '/classroom-map' },
  { label: textConfig.navEvents, href: '/events' },
  { label: textConfig.navMedia, href: '/media' },
  { label: textConfig.navLive, href: '/live' },
  { label: textConfig.navStudentGuide, href: '/student-guide' },
];

const mobileNavItems = [
  { label: 'ホーム', href: '/', icon: Home },
  { label: textConfig.navPrograms, href: '/programs', icon: Calendar },
  { label: textConfig.navEvents, href: '/events', icon: Calendar },
  { label: textConfig.navClassroomMap, href: '/classroom-map', icon: MapPin },
];

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      {/* デスクトップヘッダー */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* ロゴ */}
          <Link href="/">
            <a className="flex items-center space-x-2 font-bold text-xl hover:opacity-80 transition-opacity">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {APP_TITLE}
              </span>
            </a>
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.startsWith(item.href)
                      ? 'text-primary'
                      : 'text-foreground/60'
                  }`}
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>

          {/* 問い合わせボタン（デスクトップ） */}
          <div className="hidden md:block">
            <Link href="/contact">
              <Button variant="default" size="sm">
                問い合わせ
              </Button>
            </Link>
          </div>

          {/* モバイルメニュー */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>メニュー</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <a
                      className={`text-base font-medium transition-colors hover:text-primary ${
                        location.startsWith(item.href)
                          ? 'text-primary'
                          : 'text-foreground/60'
                      }`}
                    >
                      {item.label}
                    </a>
                  </Link>
                ))}
                <Link href="/contact">
                  <Button variant="default" className="w-full mt-4">
                    問い合わせ
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1">
        <PageTransition key={location}>
          {children}
        </PageTransition>
      </main>

      {/* モバイルナビゲーション */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex justify-around">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <a className="flex flex-col items-center justify-center space-y-1 px-3 py-2 text-foreground/60">
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </a>
              </Link>
            );
          })}
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center justify-center space-y-1 px-3 py-2 text-foreground/60">
                <MenuIcon className="h-5 w-5" />
                <span className="text-xs font-medium">メニュー</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <SheetHeader>
                <SheetTitle>メニュー</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <a
                      className={`text-base font-medium transition-colors hover:text-primary ${
                        location.startsWith(item.href)
                          ? 'text-primary'
                          : 'text-foreground/60'
                      }`}
                    >
                      {item.label}
                    </a>
                  </Link>
                ))}
                <Link href="/contact">
                  <Button variant="default" className="w-full mt-4">
                    問い合わせ
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* フッター */}
      <footer className="border-t bg-muted/50 py-8 mt-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">{APP_TITLE}</h3>
              <p className="text-sm text-muted-foreground">
                千葉英和高等学校の文化祭「梨花祭」の公式サイトです。
                来場者の皆様に梨花祭の情報をお届けします。
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">リンク</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about">
                    <a className="text-muted-foreground hover:text-primary transition-colors">
                      梨花祭について
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/programs">
                    <a className="text-muted-foreground hover:text-primary transition-colors">
                      企画紹介
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/events">
                    <a className="text-muted-foreground hover:text-primary transition-colors">
                      イベント情報
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">お問い合わせ</h4>
              <div className="text-sm text-muted-foreground space-y-2 mb-4">
                <p>{textConfig.footerSchoolName}</p>
                <p>{textConfig.footerAddress}</p>
                <p>{textConfig.footerPhone}</p>
              </div>
              <Link href="/contact">
                <Button variant="outline" size="sm">
                  問い合わせフォーム
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            {textConfig.footerCopyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
