
7/14
frontend 
JavaScript:とっつきやすいから
コンポーネントに要素を追加すればいい


backend：
結局Pythonが使い勝手良さそう
Agent SDKも豊富
backendに対応するAPI書けばいい
7/18
TypeScriptで軽量なサーバーで運用した方がいいかも
firebase jsonb, + object管理のバケット
notionのキャッシュ戦略
https://www.reddit.com/r/node/comments/1ah7eyq/ideas_about_how_notion_manages_its_backend_data/



7/18
登録画面から作って
そこから登録してみる
html, css, js, .py, jsonファイルで登録する



## default　page
デフォルトのページ
すでに配置してある



## UI1 Tile 表示
Tileを使う

user db
登録と同時に、ユーザーとしてもクリエイターとしても利用できる
要素の配置を記憶する Tile db
tileはidで登録されている
紐づいてコンポーネントを呼び出す
管理画面でタイルを配置
最終的に dashboard.tsxでダッシュボードの配置をレンダリングする



## UI2 user admin画面
Tileの表示を管理する
デフォルトでいくつか入っている

Timerblock
Agentくんとの会話 | タスク管理 | Googleカレンダーの内容・今日の日程
Notionとの連携　| Timer | 付箋・メモ
キャラクター画像設定　| KPIダッシュボード | YouTubeとか音楽再生


AgentChat.tsx - AgentChat.py
TaskManager.tsx - 
Calender
Timer
Memo
Character
KPIdashboard
Music


## UI3 store画面
Tileや
Themeを購入する

.json
title
feature(特徴)
images(商品の画像)
追加するbuttonで userに表示



store db
json dbで商品情報
S3で、個別にファイル空間があって、そこに


## UI5 Modelator
申請されたものを確認する
運営用




## UI4 creaters market

file box
申請 button


creater db(json databaseでid管理+zipファイルは、S3)
html, css, js, assets, jsonファイルで登録する
json形式で、tileについての情報を登録
クリエイター専用画面
Tileを登録する
手数料10%
wordpressのプラグインがどうなってるか調べよう

https://qiita.com/sasao3/items/0606b67da01948ae58b7

manifest.jsonでextensionを解説


my-tile/
├── my-plugin.py             
├── uninstall.py 
├── endpoint.py            
├── tile/                  
│   ├── css/
│   ├── js/
│   └── images/
├── includes/                 
│   ├── class-admin.php 
管理画面用の処理をまとめたクラス
設定ページ、メニュー追加、オプション管理、管理用の CSS/JS 読み込みなど。    
│   └── class-public.php   
フロントエンド（一般公開側）の処理をまとめたクラス
ショートコードの出力、ウィジェット、訪問者向けの表示、CSS/JS 読み込みなど。  
└── languages/  
翻訳ファイル用のディレクトリ
.pot, .po, .mo 形式の翻訳ファイルをここに格納。
プラグインの国際化（i18n）とローカライズ（l10n）をサポート

























ComponentのことをTileという
Tile審査
俺たちが審査して
許可されたら販売とか配布
Themaはプリセットで登録
Tileの集まりのこと
ポケカの絵の集まりみたいにもできる

LINEの着せ替えみたいにマーケットにしよう！
## theme　申請の場合
tileを管理画面で組み合わせる
組み合わせたものをプリセットとして登録
セット販売、または無料で公開する  



## tile　申請の場合
１つのコンポーネント(機能) 1つのエンドポイント
これで、シンプルでスタイリッシュなものになる

