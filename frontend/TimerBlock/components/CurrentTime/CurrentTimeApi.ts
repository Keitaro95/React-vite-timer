// API経由で現在時刻を取得
import type { WorldTimeApiResponse, HHMM } from "../types/time";

// types/time.tsで型定義
export const getCurrentHHMM = async (): Promise<HHMM> => {
    const response = await fetch('https://worldtimeapi.org/api/ip');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: WorldTimeApiResponse = await response.json();
    const datetime = data.datetime
    const hhmm: HHMM = datetime.substring(11, 15)
    return hhmm
};