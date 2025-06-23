// 現在時刻を表示するコンポーネント
import { getCurrentTime } from "../../services/api.ts"
import { currentTime } from "../../types/time.ts"


export const CurrentTime = () => {
    const currentTime = getCurrentTime();

    return (
        <>
            <div>
            <h1>現在の時刻</h1>
            {currentTime ? (}
            </div>
        </>


    )
}