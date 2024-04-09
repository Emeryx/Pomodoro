import ArrowUp from '../utils/ArrowUp';
import ArrowDown from '../utils/ArrowDown';

interface BreakConfigProps {length: number}

const BreakConfig : React.FC<BreakConfigProps> = ({length}) => {
    return (
        <div id='break-container'>
            <h3 id='break-label' className='text-xl'>BREAK</h3>
            <button id='break-increment'>
                <ArrowUp />
            </button>
            <h3 id='break-length'>{length}</h3>
            <button id='break-decrement'>
                <ArrowDown />
            </button>
      </div>
    )
}

export default BreakConfig;