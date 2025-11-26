# 🎨 Awesome Design System

Figmaデザインから生成されたReactコンポーネントライブラリです。

## ✨ 特徴

- 🎯 **Figma連携** - Figma MCPを使用してデザイントークンとコンポーネントを同期
- 🧩 **再利用可能** - Atomic Designに基づいたコンポーネント構成
- 🎨 **デザイントークン** - CSS変数によるカラー、スペーシング、タイポグラフィの一元管理
- 📱 **レスポンシブ** - モバイルファーストのレスポンシブデザイン
- 🔗 **Code Connect** - FigmaとReactコンポーネントの紐付け

## 📦 インストール

```bash
# pnpm
pnpm add @awesome/design-system

# npm
npm install @awesome/design-system
```

## 🚀 使い方

### 1. スタイルのインポート

```tsx
// app/layout.tsx
import "@awesome/design-system/styles.css";
```

### 2. コンポーネントのインポート

```tsx
import { Button, Header, Footer } from "@awesome/design-system";

export default function Page() {
  return (
    <>
      <Header logoSrc="/logo.svg" />
      <main>
        <Button variant="primary">Click me</Button>
      </main>
      <Footer />
    </>
  );
}
```

## 🧱 コンポーネント一覧

### Atoms（原子）
| コンポーネント | 説明 |
|--------------|------|
| 🔘 `Button` | プライマリ/ニュートラル/サトルの3バリアント |
| ⚠️ `ButtonDanger` | 危険なアクション用ボタン |
| 📝 `InputField` | テキスト入力フィールド |
| 🏷️ `Tag` | ステータスタグ |
| 👤 `Avatar` | ユーザーアバター |
| 🔗 `NavigationPill` | ナビゲーションピル |
| 📄 `TextLinkListItem` | テキストリンクアイテム |

### Components（分子・有機体）
| コンポーネント | 説明 |
|--------------|------|
| 📍 `Header` | サイトヘッダー（ナビゲーション付き） |
| 📍 `Footer` | サイトフッター |
| 🔐 `HeaderAuth` | 認証状態に応じたヘッダー部品 |
| 🧭 `NavigationPillList` | ナビゲーションリスト |
| 🎬 `HeroActions` | ヒーローセクションのCTA |
| 📝 `TextContentTitle` | タイトルテキストブロック |
| 📝 `TextContentHeading` | 見出しテキストブロック |
| 🔗 `TextLinkList` | リンクリスト |
| 👥 `AvatarBlock` | アバター＋テキストブロック |
| 🃏 `TestimonialCard` | 証言カード |
| 🎴 `CardGridTestimonials` | 証言カードグリッド |
| 🔘 `ButtonGroup` | ボタングループ |

## 🎨 デザイントークン

CSS変数として定義されています：

```css
/* カラー */
--sds-color-text-brand-on-brand: #f5f5f5;
--sds-color-background-brand-default: #2c2c2c;

/* スペーシング */
--sds-size-space-200: 8px;
--sds-size-space-400: 16px;

/* ボーダー半径 */
--sds-size-radius-200: 8px;
```

## 🛠️ 開発

```bash
# 依存関係インストール
pnpm install

# 開発モード（watch）
pnpm dev

# ビルド
pnpm build

# Storybook起動
pnpm storybook

# 型チェック
pnpm typecheck
```

## 📚 ドキュメント

- [Figmaコンポーネント取り込みガイド](./doc/figma_import_component.md)
- [Figma Variables設定ガイド](./doc/figma_setup.md)

## 🔗 Figma Code Connect

```bash
# Code Connectの公開
pnpm figma:connect:publish
```

## 📄 ライセンス

Private
