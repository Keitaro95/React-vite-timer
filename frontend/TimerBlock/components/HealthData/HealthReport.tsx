
import { rows } from './data'
import Thead from './table/thead'
import Tbody from './table/tbody'

import '../../App.css'

export const HealthReport = () => {
  return (
    <div>
      <h1>健康に関する調査</h1>
      <table>
        <Thead />
        <Tbody rows={rows}/>
      </table>
    </div>
  )
}
export default HealthReport



