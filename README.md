# 🏮 ホイアン・ダナン旅行ガイド (Hội An & Đà Nẵng Travel Guide)

> **日本人旅行者のためのスマートなベトナム・ホイアン＆ダナン観光ガイド＆会話アプリ**  
> (React 19 + Vite 8 + Tailwind CSS v4 + Web Speech API TTS)

---

## 📖 概要 (Overview)

**ホイアン・ダナン旅行ガイド** は、初めてベトナム（ホイアン・ダナン）を訪れる日本人旅行者（特に女性旅行者やファミリー層）が、安全・快適に旅を楽しむためのオールインワンWebアプリケーションです。

ベトナム語の発音が不安な方のために、**Web Speech APIを活用したネイティブ発音再生機能（TTS）** や **カタカナ読み表記** を完備。観光名所の案内から、ローカルグルメの注文方法、手土産（お土産）の選び方、Gội đầu dưỡng sinh（ハーバルヘッドスパ）、Grab / GreenSMタクシーの乗り方まで網羅しています。

---

## 🌟 主な機能 (Key Features)

### 1. 🏠 ホーム (Home)
- **クイックアクセス・ナビゲーション**: 主要機能へ1タップで遷移できるナビゲーションカード。
- **お役立ち会話・グルメのプレビュー**: 旅行中に頻出する定番フレーズとローカルフードのダイジェスト表示。
- **リアルタイム気象・ベストシーズン情報**: ホイアン・ダナンの気候解説と旅の準備ガイド。

### 2. 🗣️ 会話・フレーズ (Travel Vietnamese & Audio TTS)
- **6つのカテゴリ別フレーズ集**:
  1. `基本フレーズ` (挨拶・感謝・すみません)
  2. `呼び方` (Anh, Chị, Em, Chú, Cô...)
  3. `注文するとき` (数量の指定・1人前〜6人前)
  4. `よく使う表現` (いくらですか？・トイレはどこ？)
  5. `値切り・買物` (安くしてください・試着できますか？)
  6. `緊急・その他` (助けて・113/115電話番号)
- **ベトナム語音声再生 (Web Speech API)**: スピーカーアイコンタップでネイティブ音声を発音。
- **カタカナ読み付き**: 発音のコツを分かりやすくカタカナでサポート。

### 3. 🍜 グルメガイド (Hội An & Đà Nẵng Gourmet)
- **名物料理の深掘り解説**: Cao Lầu（カオラウ）、Mì Quảng（ミークアン）、Cơm Gà（コムガー）、Bánh Mì（バインミー）などの魅力を徹底紹介。
- **参考価格＆注文フレーズ**: リアルな価格相場（VND/JPY）と「パクチー抜きで」「氷少なめで」といった実践的フレーズを収録。

### 4. 🛍️ お土産ガイド (Souvenir & Gift Collection)
- **相手別おすすめ度表示**: 🎁 会社の同僚、上司、お義母様、女友達、自分用など、渡す相手に合わせた選び方ガイド。
- **人気のベトナムお土産セレクション**: Pheva高級チョコ、ベトナム蓮の花茶、ココナッツコーヒー、伝統手刺繍ポーチ、バッチャン焼き、ホイアン焼き緑豆せんべい、Bánh ít lá gai...
- **お気に入りハートカウンター**: 気に入ったお土産をワンタップでリスト化。
- **人気ショップ情報**: Reaching Out Arts & Crafts などのフェアトレード＆お土産店ガイド。

### 5. 📍 観光＆スパガイド (Spots, Craft Villages & Head Spa)
- **ホイアン・ダナンの名所案内**: Chùa Cầu（日本橋）、「ホイアンの記憶」大型ショー、VinWonders、バイマウ椰子林かご舟、ドラゴン橋、五行山など。
- **伝統工芸村ツアー**:
  - 🏺 **Làng Gốm Thanh Hà (タインハー陶芸村)**: 足踏みろくろ体験＆テラコッタパーク。
  - 🧵 **Làng Lụa Hội An (ホイアン絹の村)**: 300年の伝統シルク工房ツアー＆蚕・織物体験。
- **💆‍♀️ リラクゼーション＆ヘッドスパ (Gội đầu dưỡng sinh)**:
  - ベトナム伝統のハーブシャンプー＆ツボ押しマッサージ「Gội đầu dưỡng sinh」の人気スパを厳選掲載。
- **動画プレビュー＆Google Maps連携**: YouTube動画の直接再生機能とワンタップでGoogle Mapsを開くナビ機能。

### 6. ⚠️ 注意事項＆便利ツール (Safety, Taxi & Currency Converter)
- **トラブル防止ガイド**: タクシーのぼったくり防止策、治安・水・両替のヒント。
- **🛺 GreenSM電気タクシーアプリの使い方**: 登録方法から配車手順までの分かりやすい画面ガイド。
- **🧮 双方向リアルタイム通貨換算ツール**: ドン（VND）↔ 円（JPY）の瞬時計算機能。

### 7. 🎙️ リアルタイムAI翻訳モーダル (Live Audio Translator)
- 音声入力＆テキスト入力に対応したベトナム語⇔日本語相互翻訳機能。

---

## 🛠️ 技術スタック (Tech Stack)

| カテゴリ | 使用技術 / ライブラリ | 役割・説明 |
|---|---|---|
| **Core** | React 19, TypeScript 5.7 | UIフレームワークおよび型安全性 |
| **Build Tooling** | Vite 8 | 超高速な開発環境＆プロダクションビルド |
| **Styling** | Tailwind CSS v4 | `@import 'tailwindcss'` を使用したモダンダーク/スカイテーマ |
| **Icons** | Lucide React (`lucide-react`) | 高品質なベクターアイコン群 |
| **Audio / TTS** | Web Speech API (`speechSynthesis`) | ブラウザ標準のベトナム語（`vi-VN`）音声読み上げ |

---

## 📁 ディレクトリ構造 (Project Directory Structure)

```
c:\Users\longn\Downloads\ホイアン旅行ガイド\
├── index.html                   ← Vite HTMLエントリーポイント
├── package.json                 ← 依存関係およびスクリプト
├── vite.config.ts               ← Vite設定 (Path alias @/ → src/)
├── README.md                    ← 本ドキュメント
├── public/                      ← 静的アセット (動画 bg.mp4, 画像)
│   ├── bg.mp4                   ← ヘッダー用4K動画
│   └── img/                     ← GreenSMガイド用高解像度画像
└── src/
    ├── main.tsx                 ← Reactエントリーポイント
    ├── App.tsx                  ← ナビゲーションシェル (Header, Sidebar, BottomNav)
    ├── index.css                ← グローバルCSS, Tailwind v4, アニメーション定義
    ├── types.ts                 ← Tab型定義, skyカラーキー
    ├── data/
    │   └── greenSMImages.ts     ← モバイル環境用の最適化済ベース64画像データ
    ├── utils/
    │   └── tts.ts               ← Web Speech API ベトナム語発音ユーティリティ
    ├── components/
    │   ├── Atoms.tsx            ← SectionHeading, Card, SpeakButton, TipBox
    │   ├── Cards.tsx            ← PhraseCard, AddressCard, OrderCard 等
    │   ├── CurrencyConverter.tsx ← ドン/円 双方向リアルタイム換算
    │   └── TranslatorModal.tsx   ← 音声＆テキスト翻訳モーダル
    └── pages/
        ├── HomePage.tsx         ← ホーム画面
        ├── KaiwaPage.tsx        ← ベトナム語会話・発音ガイド (6カテゴリ)
        ├── GourmetPage.tsx      ← ベトナム・ホイアンのグルメガイド
        ├── OmiyagePage.tsx      ← お土産ガイド＆ウィッシュリスト
        ├── SpotsPage.tsx        ← 観光・伝統工芸村・ヘッドスパガイド
        ├── ChuiPage.tsx         ← 旅行中の注意事項＆安全ガイド
        └── GreenSMPage.tsx      ← 配車アプリ GreenSM の使い方
```

---

## 🚀 開発およびビルドコマンド (Development & Build Commands)

### 開発サーバーの起動
```bash
npm run dev
```

### 型チェックの実行 (TypeScript Verification)
```bash
npx tsc --noEmit
```

### プロダクションビルドの生成
```bash
npm run build
```

---

## 🎨 デザインシステム (Design System & Tokens)

アプリ全体でプライマリーカラーとして `sky` カラーパレットを採用しています。

```ts
sky[50]  = '#f7fbff'  // 背景色
sky[100] = '#eaf5fd'  // カードのボーダー・薄背景
sky[200] = '#d0ebf9'  // ホバー時のシャドウ
sky[400] = '#7bc3e8'  // サブテキスト・アクティベーション
sky[500] = '#4eabdc'  // メインプライマリーカラー (ボタン・グラデーション)
sky[600] = '#2b8fbe'  // 濃いグラデーション・ヘッダー
```

---

## 📱 レスポンシブデザイン対応 (Responsive Breakpoints)

- **デスクトップ (≥1024px)**: サイドバー固定 + メインコンテンツエリア。
- **タブレット (768px〜1023px)**: トップヘッダー + 横スクロールタブバー。
- **モバイル (<768px)**: ボトムナビゲーションバー + ドロワーメニュー。

---

## 📝 ライセンス (License)

This project is created for Vietnam Travel Guide application. All rights reserved.
