# Figma Component Import Guide (Component Level)

このドキュメントは、Figma Desktop MCPを使用してFigmaデザインから**コンポーネントレベル**（Atoms / Molecules / Organisms）を実装するための具体的なプロセスとガイドラインを記載しています。

**Variables/Stylesの設定については [`figma_setup.md`](./figma_setup.md) を参照してください。**

## 対象コンポーネント

- **Atoms**: 単一コンポーネント（Button, Avatar, TextLinkListItemなど）
- **Molecules**: Atomsの組み合わせ（FooterLinkSection, HeaderAuthなど）
- **Organisms**: Moleculesの組み合わせ（Header, Footer, CardGridTestimonialsなど）

## 基本方針

1. **MCPツール使用**: Figma Desktop MCPの`get_design_context`と`get_screenshot`を使用
2. **Atomic Design順序**: Atoms → Molecules → Organisms の順で段階的に実装
3. **コンポーネント合成**: 既存の小さいコンポーネントを組み合わせて大きいコンポーネントを構築
4. **レスポンシブ対応**: `platform` propは`.figma-raw.tsx`のみ保持、実装は Tailwind `md:`ブレークポイントで自動切り替え（Mobile First）

## 実装手順

**重要**: コンポーネント取り込み時は、必ずTodoWriteツールでタスクリストを作成し、進捗を可視化すること。

### タスクリスト（必須）

以下の7ステップでタスクリストを作成：

1. **MCP情報取得**: `get_design_context` + `get_screenshot` + `get_code_connect_map` + `get_metadata` でFigma情報取得
2. **Figma Raw作成**: コンポーネントフォルダ内に `.figma-raw.tsx` ファイル作成
3. **実装作成**: forwardRef対応のコンポーネント実装
4. **Storybook作成**: `.stories.tsx` ファイル作成
5. **Code Connect作成**: `.figma.tsx` ファイル作成
6. **Code Connect Publish**: `pnpm figma:connect:publish` 実行
7. **Type Check**: `pnpm typecheck` で型エラー確認

### 進捗表示ルール（必須）

**作業開始時と各ステップ完了時に、以下の形式で進捗状況を表示すること：**

```
## [コンポーネント名] コンポーネント取り込み - 進捗状況

1. ✅ **MCP情報取得** - 完了
2. 🔄 **Figma Raw作成** - 進行中
3. ⏳ **実装作成**
4. ⏳ **Storybook作成**
5. ⏳ **Code Connect作成**
6. ⏳ **Code Connect Publish**
7. ⏳ **Type Check**

---
```

**ステータス記号:**
- ✅ = 完了 (completed)
- 🔄 = 進行中 (in_progress)
- ⏳ = 待機中 (pending)

**表示タイミング:**
- 作業開始時: 最初に全体の進捗を表示
- 各ステップ完了時: 更新された進捗状況を表示
- 作業完了時: 全ステップ完了を表示

### 1. Figmaノード取得

```
1. Figmaで実装するコンポーネント名を検索し、node IDを特定
2. get_design_context(nodeId) でデザインコンテキスト取得
3. get_screenshot(nodeId) でビジュアル確認
4. get_code_connect_map(nodeId) でCode Connect情報確認（既存マッピング有無）
5. get_metadata(nodeId) でノード構造確認（必要に応じて）
```

**各MCPツールの役割:**
- `get_design_context`: 実装コード生成（props、スタイル、構造）
- `get_screenshot`: ビジュアル確認（見た目の正確性検証）
- `get_code_connect_map`: 既存Code Connect確認（重複防止）
- `get_metadata`: ノード構造確認（レイヤー階層、サイズ情報）

### 2. 依存確認

- デザインコンテキストに含まれる子コンポーネントが実装済みか確認
- 未実装の場合、依存する子コンポーネントから先に実装（Atomic Design順序）

### 3. ディレクトリ構成

#### Atoms

```
src/components/atoms/[ComponentName]/
├── [ComponentName].tsx               # 実装版（forwardRef対応）
├── [ComponentName].stories.tsx       # Storybook
├── [ComponentName].figma.tsx         # Code Connect
├── [ComponentName].figma-raw.tsx     # Figma生データ（差分比較用）
└── index.ts                          # Export
```

#### Molecules/Organisms

```
src/components/[ComponentName]/
├── [ComponentName].tsx
├── [ComponentName].stories.tsx
├── [ComponentName].figma.tsx
├── [ComponentName].figma-raw.tsx
└── index.ts
```

#### ファイルヘッダー（双方向参照）

**Figma Raw:**
```typescript
/**
 * ============================================
 * 🎨 Button (Figma Raw)
 * 📅 Generated at: 2025-11-15 10:00 JST
 * 🔗 Node ID: 123-456
 * 🔗 Figma URL: https://...
 * 📍 Implementation: src/components/atoms/Button/Button.tsx
 * ============================================
 */
```

**Implementation:**
```typescript
/**
 * ============================================
 * 🎨 Button
 * 📅 Synced at: 2025-11-15 10:00 JST
 * 🔗 Figma Raw: src/components/atoms/Button/Button.figma-raw.tsx
 * ============================================
 */
```

**タイムスタンプラベル規約:**
- Figma Raw: `Generated at` - 自動生成された静的ファイル（変更しない）
- Implementation: `Synced at` - Figmaと同期しながら継続的に更新されるファイル

### 4. 画像アセット管理

**重要**: Figma から画像アセットを必ずダウンロードして配置し、`next/image` で最適化すること。

#### 画像の配置場所

design-systemパッケージは Next.js 前提のため、利用側プロジェクトの `public/images/` に配置：

```
(利用側プロジェクト)
public/
└── images/
    ├── logos/          # ロゴ画像
    ├── icons/          # アイコン画像
    ├── hero/           # ヒーローイメージ
    └── testimonials/   # お客様の声など
```

#### 画像ダウンロード手順

**推奨: MCP から自動取得**

MCP の `get_design_context` で取得した Figma Raw に含まれる `localhost:3845` の画像 URL から直接ダウンロード可能：

1. **Figma Raw から画像 URL を確認**
   ```typescript
   // Button.figma-raw.tsx
   const imgIcon = "http://localhost:3845/assets/xxx.svg";
   ```

2. **curl でダウンロード**
   ```bash
   curl -s http://localhost:3845/assets/xxx.svg \
     -o public/images/icons/icon-name.svg
   ```

**代替: 手動エクスポート**

MCP で画像が取得できない場合：

1. Figma Desktop でコンポーネントを開く
2. 画像レイヤーを選択 → 右クリック → Export
3. フォーマット: PNG（透過）、JPG（写真）、SVG（アイコン）
4. 解像度: @2x または @3x（Retina 対応）
5. `public/images/[カテゴリ]/` に配置
6. 命名規則: `kebab-case.png` (例: `figma-logo.svg`)

#### 実装で使用

```tsx
import Image from "next/image";

// ✅ 推奨: next/image で最適化
<Image
  src="/images/logos/figma-logo.svg"
  alt="Figma Logo"
  width={40}
  height={35}
/>

// ❌ 非推奨: 通常の img タグ（最適化されない）
<img src="/images/logos/figma-logo.svg" alt="Figma Logo" />
```

#### next/image の利点

- ✅ 自動的に WebP/AVIF に変換（対応ブラウザのみ）
- ✅ レスポンシブサイズ自動生成
- ✅ 遅延読み込み（Lazy Loading）
- ✅ `.next/cache/images/` に60日間キャッシュ
- ✅ ビルド時に最適化

#### Figma Raw との使い分け

- **Figma Raw (`.figma-raw.tsx`)**:
  - 通常の `<img>` タグで保持（参考用）
  - `http://localhost:3845/assets/...` のままでOK

- **実装 (`Component.tsx`)**:
  - `next/image` の `Image` コンポーネント使用
  - `/images/` からの絶対パス

### 4. コンポーネント実装

#### 画像の扱い（重要）

**Figma Raw に `<img>` タグがある場合、実装では必ず `next/image` の `<Image>` に変換すること。**

```tsx
// ❌ Figma Raw: そのまま保持（参考用）
<img
  src={logoSrc}
  alt={logoAlt}
  className="block max-w-none size-full"
/>

// ✅ 実装: next/image に変換
import Image from "next/image";

<Image
  src={logoSrc}
  alt={logoAlt}
  width={40}
  height={35}
  className="block max-w-none size-full"
/>
```

**変換ポイント:**
1. `import Image from "next/image"` を追加
2. `<img>` → `<Image>` に変更
3. `width` と `height` プロパティを追加（必須）
   - **Figma Raw の親要素の className から読み取る**
   - 例: `className="h-[35px] w-[40px]"` → `width={40} height={35}`
4. その他のプロパティ（`className`, `alt` など）は維持

#### forwardRefパターン（必須）

```typescript
import { forwardRef } from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "px-[var(--sds-size-space-400,16px)]",
          "py-[var(--sds-size-space-300,12px)]",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
```

#### レスポンシブ実装（Mobile First）

```typescript
// ❌ platform propは削除（Figma rawにのみ存在）
export interface HeaderProps {
  // platform?: "Desktop" | "Mobile";  // 削除
  logoSrc?: string;
  className?: string;
}

export function Header({ logoSrc, className }: HeaderProps) {
  return (
    <header className={cn(
      // Mobile (デフォルト)
      "p-[var(--sds-size-space-600,24px)]",
      "justify-between",

      // Desktop (md: 768px以上)
      "md:p-[var(--sds-size-space-800,32px)]",
      "md:gap-[var(--sds-size-space-600,24px)]",
      className,
    )}>
      {/* Navigation - Desktop only */}
      <nav className={cn(
        "hidden",           // Mobile: 非表示
        "md:flex md:flex-1" // Desktop: 表示
      )} />

      {/* Hamburger - Mobile only */}
      <button className="md:hidden"> {/* Desktop: 非表示 */}
        Menu
      </button>
    </header>
  );
}
```

### 5. デザイントークン使用

**必須**: Figma semantic tokensを使用すること（Tailwindユーティリティクラスは使わない）

```typescript
// ✅ Figmaトークン使用
<div className={cn(
  "gap-[var(--sds-size-space-200,8px)]",
  "p-[var(--sds-size-space-300,12px)]",
  "rounded-[var(--sds-size-radius-200,8px)]",
  "border-[length:var(--sds-size-stroke-border,1px)]",
  "border-[color:var(--sds-color-border-default-default,#d9d9d9)]",
  "text-[color:var(--sds-color-text-default-default,#1e1e1e)]",
  "text-[length:var(--sds-typography-body-size-medium,16px)]",
  "font-[var(--sds-typography-body-font-weight-regular,400)]",
)} />

// ❌ Tailwindクラス使用（禁止）
<div className="gap-2 px-3 py-3 rounded-lg border text-base" />
```

**重要**: Tailwind arbitrary valuesではプロパティ型を明示すること
- border-width: `border-[length:var(...)]`
- border-color: `border-[color:var(...)]`
- text-color: `text-[color:var(...)]`
- font-size: `text-[length:var(...)]`

### 6. Storybook作成

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";  // ← 必須
import { Button } from "./Button";

const meta = {
  title: "Atoms/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Button",
  },
};

// レスポンシブStory
export const Desktop: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: "responsive", // 1200px
    },
  },
};

export const Mobile: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: "mobile1", // 375px
    },
  },
};
```

**重要**: `import React from "react";` は必須（Storybook実行環境で未定義エラーになるため）

### 7. Code Connect作成

Figma上でコンポーネントを選択すると実装コードが表示されるようにCode Connectファイルを作成します。

#### 基本的なCode Connect

```typescript
// src/components/atoms/Button/Button.figma.tsx
import { figma } from "@figma/code-connect";
import { Button } from "./Button";

/**
 * Code Connect for Button component
 * Links Figma Button component to React implementation
 */

figma.connect(Button, "https://www.figma.com/design/FILE_KEY/...?node-id=4185-3778", {
  props: {
    variant: figma.enum("Variant", {
      Primary: "primary",
      Neutral: "neutral",
      Subtle: "subtle",
    }),
    size: figma.enum("Size", {
      Medium: "medium",
      Small: "small",
    }),
    disabled: figma.enum("State", {
      Disabled: true,
      Default: false,
      Hover: false,
    }),
    children: figma.string("Label"),  // ← テキストコンテンツをマッピング
  },
  example: ({ variant, size, disabled, children }) => (
    <Button variant={variant} size={size} disabled={disabled}>
      {children}
    </Button>
  ),
});
```

#### 精度向上のベストプラクティス

**重要**: Code Connect作成時は、**初回から可能な限り多くのプロパティをマッピング**してください。後から追加するのは手間がかかります。

**推奨ワークフロー:**

1. **MCPで利用可能な全プロパティを確認**
   ```bash
   # 既存の.figma.tsxファイルからNode IDを抽出
   # 例: "node-id=4185-3778" → "4185-3778"

   # MCPで全プロパティを取得（Figma Desktop選択不要）
   get_design_context({
     nodeId: "4185-3778",
     clientLanguages: "typescript",
     clientFrameworks: "react"
   })

   # 出力例から利用可能なプロパティを特定:
   # type ButtonProps = {
   #   label?: string;
   #   iconEnd?: React.ReactNode;
   #   hasIconEnd?: boolean;
   #   hasIconStart?: boolean;
   #   iconStart?: React.ReactNode;
   #   variant?: "Primary" | "Neutral" | "Subtle";
   #   state?: "Default" | "Hover" | "Disabled";
   #   size?: "Medium" | "Small";
   # }
   ```

2. **マッピング可能なプロパティを全て追加**
   ```typescript
   props: {
     // 高優先度: バリアント・サイズ・状態
     variant: figma.enum("Variant", { Primary: "primary", ... }),
     size: figma.enum("Size", { Medium: "medium", ... }),
     disabled: figma.enum("State", { Disabled: true, ... }),

     // 中優先度: テキストコンテンツ
     children: figma.string("Label"),

     // 低優先度: アイコン等（可能なら追加）
     leftIcon: figma.instance("Icon Start"),
     rightIcon: figma.instance("Icon End"),
   }
   ```

3. **Reactコンポーネントのプロパティ名と対応させる**
   ```typescript
   // Figma: "Icon Start" / "Icon End"
   // React: leftIcon / rightIcon
   // → マッピング時にReact側の名前を使う

   props: {
     leftIcon: figma.instance("Icon Start"),   // Figma名 → React名
     rightIcon: figma.instance("Icon End"),
   }
   ```

**マッチ率（紫色のバー）を高めるためのポイント:**

1. **テキストコンテンツをマッピング**
   ```typescript
   props: {
     children: figma.string("Label"),     // ボタンテキスト
     title: figma.string("Title"),        // タイトル
     subtitle: figma.string("Subtitle"),  // サブタイトル
   }
   ```

2. **ブーリアンプロパティをマッピング**
   ```typescript
   props: {
     hasSubtitle: figma.boolean("Has Subtitle"),
     hasIcon: figma.boolean("Has Icon"),
   }
   ```

3. **列挙型プロパティをマッピング**
   ```typescript
   props: {
     align: figma.enum("Align", {
       Start: "Start",
       Center: "Center",
       End: "End",
     }),
   }
   ```

4. **インスタンススワップをマッピング**
   ```typescript
   props: {
     leftIcon: figma.instance("Icon Start"),
     rightIcon: figma.instance("Icon End"),
   }
   ```

#### マッピング可能なプロパティタイプ

| Figmaプロパティ | Code Connect | 用途 |
|---|---|---|
| Text/String | `figma.string("Label")` | ボタンテキスト、タイトル等 |
| Boolean/Toggle | `figma.boolean("Has Icon")` | 表示/非表示の制御 |
| Variant/Enum | `figma.enum("State", {...})` | バリアント、状態選択 |
| Instance Swap | `figma.instance("Icon")` | アイコン等の入れ替え（高度） |

#### マッピングの優先順位

マッチ率100%を目指さなくても、**主要なプロパティだけマッピングすれば実用上は十分**です：

1. **高優先度**（必須）:
   - バリアント（variant, state等）
   - サイズ（size）
   - 状態（disabled, active等）

2. **中優先度**（推奨）:
   - テキストコンテンツ（label, title, subtitle）
   - ブーリアンフラグ（hasIcon, hasSubtitle等）

3. **低優先度**（オプション）:
   - アイコン（iconStart, iconEnd等）
   - 配列データ（items, links等）

#### 注意事項

**重要なポイント:**
- **第2引数は文字列リテラル必須**（変数不可）
- **FILE_KEYは`.env.local`の`FIGMA_FILE_KEY`を手動でコピー**
- **propsマッピング**: Figmaのプロパティ名とReact propsを紐付け
- **children問題**: テキストが取得できない場合は固定値で対応（`figma.string()`や`figma.textContent()`でエラーが出る場合）
- **マッチ率の影響**: 100%でなくてもCode Connectは正常に動作。主要プロパティのマッピングで十分実用的

### 8. Code Connect Publish

Code Connectファイルを作成したら、必ずFigmaにpublishします。

```bash
# 環境変数を読み込んでpublish
FIGMA_ACCESS_TOKEN=<your_token> pnpm figma:connect:publish
```

**必要な設定:**
1. **Figma Personal Access Token**（Code Connect Write スコープ必須）
   - Settings → Account → Personal Access Tokens
   - スコープ: ✅ File content (read) + ✅ Code Connect (write)
   - `.env.local`の`FIGMA_ACCESS_TOKEN`に設定

2. **figma.config.json確認**
   ```json
   {
     "codeConnect": {
       "include": ["src/components/**/*.tsx"],
       "exclude": ["**/*.stories.tsx", "**/*.test.tsx", "**/node_modules/**"],
       "parser": "react",
       "label": "React",
       "importType": "esm",
       "importPaths": {
         "src/components/*": "@awesome/design-system"
       },
       "docs": "https://gitlab.com/YOUR_ORG/awesome-designsystem"
     }
   }
   ```

**成功例:**
```
Successfully uploaded to Figma, for React:
-> Button https://www.figma.com/design/...?node-id=4185-3778
```

### 9. 型安全性確認

```bash
pnpm typecheck
```

- `index.ts`で型を適切にエクスポート
- TypeScriptエラーがないことを確認

## Figmaデータ解釈

### 1. Figma定義と実際の見た目が異なる場合

**症状**: 固定幅で定義されているが、実際は可変幅で使われている

**対処法**: 実際の見た目を優先

```typescript
// ❌ Figma定義通り（固定幅）
<button className="w-[89px]">{text}</button>

// ✅ 実際の使用方法（可変幅）
<button className="text-left">{text}</button>
```

### 2. コンポーネント粒度調整

Figmaで1つの大きなコンポーネントでも、実装時に適切な粒度で分割

```typescript
// TextLinkListItem（独立コンポーネント）
export const TextLinkListItem = forwardRef<HTMLButtonElement, Props>(
  ({ text, ...props }, ref) => <button ref={ref} {...props}>{text}</button>
);

// FooterLinkSection（TextLinkListItemを使用）
export const FooterLinkSection = forwardRef<HTMLDivElement, Props>(
  ({ links, ...props }, ref) => (
    <div ref={ref} {...props}>
      {links.map((link, i) => <TextLinkListItem key={i} text={link.label} />)}
    </div>
  )
);
```

### 3. 配置・レイアウト確認

`get_design_context`のコードで`items-start`や`items-center`を確認し、Figma定義に従う

## Figma更新時の差分同期

### ⚠️ 自動置換禁止

既存実装にカスタマイズが含まれているため、ファイルを自動削除・再生成してはいけない

**保持すべきカスタマイズ:**
- forwardRef対応
- イベントハンドラー（onClick, onChange等）
- 型の拡張（HTMLAttributes継承等）
- "use client" ディレクティブ
- cn()によるclassName結合
- アクセシビリティ属性（aria-*等）

### 差分確認手順

#### 1. Figmaから最新コードを取得してメモリ上で比較

```
AIに依頼: "Update Button from Figma"
→ AIがMCPで取得し、メモリ上で既存の.figma-raw.tsxと比較
```

- 中間ファイル保存不要（メモリ上で比較）
- `.figma-raw.tsx`同士の比較で正確な差分検出

#### 2. AIが差分を検出して報告

**差分なし:**
```
✅ Figma側で変更なし - 更新不要
```

**差分あり:**
```
## Figma側の変更
- padding: var(--sds-size-space-300) → var(--sds-size-space-400)

## 実装のカスタマイズ（保持すべき）
- ✅ forwardRef対応
- ✅ onClick等のイベントハンドラー

## 更新が必要な箇所
1. Button.tsx 行25: padding値を更新
```

#### 3. 更新作業（差分がある場合のみ）

**重要: 必ず figma-raw → 実装 の順**

**a. `.figma-raw.tsx`を最新版で更新**

```bash
# Writeツールで最新版を保存
src/components/atoms/Button/Button.figma-raw.tsx
```

**b. git diff で figma-raw の差分を確認**

```bash
git diff src/components/atoms/Button/Button.figma-raw.tsx

# どのデザイントークンが変わったか把握
```

**c. 実装版を更新（カスタマイズ保持）**

```bash
# Editツールで該当箇所のみ更新
src/components/atoms/Button/Button.tsx

# forwardRef、onClick等のカスタマイズは保持
```

**d. タイムスタンプ更新**

両ファイルのタイムスタンプを現在日時に更新

**e. Git差分で最終検証**

```bash
git diff src/components/atoms/Button/

# 確認:
# - .figma-raw.tsx: Figmaの変更のみ
# - .tsx: デザイントークン値のみ更新、カスタマイズ保持
```

### 更新判断ガイドライン

| Figma側の変更内容 | 実装への反映 |
|---|---|
| デザイントークン値（色、サイズ、spacing） | ✅ 反映 |
| レイアウト構造（flex → grid等） | ⚠️ 慎重に判断 |
| 固定サイズ → 可変サイズ | ✅ 反映 |
| 要素タイプ（div → button） | ❌ 保持（実装側優先） |
| テキスト内容 | ⚠️ デフォルト値として反映 |

## よくある問題

### 問題1: デザイントークンが不明確

**対処法**: `get_design_context`のコードからトークン名をそのまま使用（推測しない）

### 問題2: 配置が意図と異なる

**対処法**: `get_design_context`で`items-start`/`items-center`等を確認し、Figma定義に従う

## チェックリスト

**進捗管理（必須）:**
- [ ] **TodoWriteツールでタスクリスト作成**（7ステップ）

**実装チェック:**
- [ ] `get_design_context` + `get_screenshot` + `get_code_connect_map` + `get_metadata` で仕様確認
- [ ] 依存する子コンポーネントを先に実装（Atomic Design順序）
- [ ] Figma Rawファイル作成（コンポーネントフォルダ内）
- [ ] forwardRefパターン使用
- [ ] Figmaデザイントークン（`--sds-*`）使用
- [ ] Tailwind arbitrary valuesでプロパティ型明示
- [ ] `index.ts`で型を適切にエクスポート
- [ ] Storybookストーリー作成（`import React from "react";`含む）
- [ ] **Code Connect ファイル作成**（`.figma.tsx`）
- [ ] **Code Connect Publish成功**（`pnpm figma:connect:publish`）
- [ ] `pnpm typecheck`成功
- [ ] 見た目がFigmaスクリーンショットと一致
- [ ] Figma定義と実際の見た目に矛盾がある場合、実際の見た目を優先
