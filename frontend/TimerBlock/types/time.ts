// types/time.ts
// WorldTimeAPIのレスポンス型定義
export interface WorldTimeApiResponse {
  abbreviation: string;
  client_ip: string;
  datetime: string;
  day_of_week: number;
  day_of_year: number;
  dst: boolean;
  dst_from: string | null;
  dst_offset: number;
  dst_until: string | null;
  raw_offset: number;
  timezone: string;
  unixtime: number;
  utc_datetime: string;
  utc_offset: string;
  week_number: number;
}

// HH:MM 形式の時刻を表すエイリアス
export type HHMM = string;  // 例: "13:45"

// getCurrentTime コンポーネントなどで使用する型エイリアス
export type time = HHMM;

// 現在時刻取得結果を扱うコールバック型定義
export type TimeCallback = (time: HHMM) => void;
