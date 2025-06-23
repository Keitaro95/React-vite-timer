// API経由で現在時刻を取得

// types/time.tsで型定義
export const getCurrentHHMM = async () => {
    const response = await fetch('https://worldtimeapi.org/api/ip');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const datetime = data.datetime
    const HHMM = datetime.substring(11, 15)
    return HHMM
};