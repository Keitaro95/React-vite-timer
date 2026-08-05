import type { Row } from '../data.ts'

const Component: React.FC<Row> = (props) => {
    return (
        <tr>
            <th>{props.generation}</th>
            {props.answers.map((answer, i) => (
                <td key={i}>{`${answer * 100}%`}</td>
            ))}
        </tr>
    )
}
export default Component