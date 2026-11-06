# ⏳ Habit Timer (Minimalist Habit & Timer App with Kawaii Companions)

[![Live Demo](https://img.shields.io/badge/Live_Demo-kouluun2.github.io%2Fhabit--timer-brightgreen?style=flat&logo=github)](https://kouluun2.github.io/habit-timer/)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.11-FF0055?logo=framer&logoColor=white)
![PWA Ready](https://img.shields.io/badge/PWA-Ready-purple?logo=pwa&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

毎日のタスク達成と習慣化をサポートする、モバイル PWA 完全対応のミニマリスト・タイマー＆習慣トラッカーです。  
連続達成日数に応じて、キュートな「相棒キャラクター」たちがアンロックされ、あなたの継続を応援します。

👉 **[今すぐWebで体験する（無料・インストール不要）](https://kouluun2.github.io/habit-timer/)**

---

## 🌟 主な機能と特徴

### 1. ⏱️ マルチ時間・高精度バックグラウンドタイマー
* **柔軟な時間設定**: 数分単位のポモドーロから最大 99時間59分 まで自由自在にプリセット・カウントダウン可能。
* **バックグラウンドでもズレない**: 単純な `setInterval` ではなく、絶対タイムスタンプ差分（Epoch ms）を用いた高精度計算により、ブラウザを閉じたりスマホがスリープしても正確に計測。

### 2. 🔔 マナーモード貫通アラーム ＆ 振動フィードバック
* **確実な通知**: Web Audio API とメディアセッション（`AudioSession`）の最適化により、iOS / Android のマナーモード中やバックグラウンド時でもスピーカーからのアラーム再生に対応。
* タイマー終了時には心地よい振動（Haptic Feedback）でお知らせ。

### 3. 🐾 相棒キャラ図鑑 ＆ 広場システム
* **モチベーション継続の仕掛け**: 日々の全タスク完了や連続継続日数（Streak）に応じて、全6種類の愛らしいドット絵風キャラクターがアンロック。
* 広場でキャラクターたちが跳ねたり動いたりと、達成感を目に見える形で実感できます。

### 4. 📈 多期間データ分析グラフ（週・月・年・全体）
* タスク別の累計集中時間、完了回数、継続日数の推移をインタラクティブな折れ線グラフで可視化。
* 自分の成長や作業リズムが一目で把握できます。

### 5. 🛡️ アップデート耐性 3重データ永続化
* **データ消失ゼロへのこだわり**: `localStorage` + `IndexedDB` + `CacheStorage` の三重フォールバック構成を採用。
* ブラウザキャッシュのクリアやアプリアップデートが行われても、大切な習慣記録が自動復元されます。

---

## 📱 スマホアプリとしての追加方法（PWA対応）

ネイティブアプリのように全画面・アドレスバーなしで快適に利用できます。

* **iOS (Safari)**:
  1. [アプリページ](https://kouluun2.github.io/habit-timer/) を開く
  2. 画面下部の共有ボタン（四角から矢印）をタップ
  3. **「ホーム画面に追加」** を選択
* **Android (Chrome)**:
  1. [アプリページ](https://kouluun2.github.io/habit-timer/) を開く
  2. 画面右上のメニュー（3点リーダー）または画面下のポップアップから **「アプリをインストール」** をタップ

---

## 🛠️ 技術スタック

* **Frontend**: React 18 / Vite 5 / TypeScript
* **Styling**: Tailwind CSS
* **Animations**: Framer Motion
* **Icons**: Lucide React
* **Persistence**: LocalStorage, IndexedDB, CacheStorage
* **Audio**: HTML5 Audio / Web Audio API
* **Deployment**: GitHub Pages (GitHub Actions / gh-pages)

---

## 💻 ローカル開発手順

```bash
# 1. クローン
git clone https://github.com/kouluun2/habit-timer.git
cd habit-timer

# 2. 依存関係のインストール
npm install

# 3. 開発サーバー起動
npm run dev

# 4. プロダクションビルド
npm run build
```

---

## 📄 ライセンス

本プロジェクトは [MIT License](LICENSE) のもとで公開されています。
