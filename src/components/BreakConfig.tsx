import ArrowUp from '../utils/ArrowUp';
import ArrowDown from '../utils/ArrowDown';

interface BreakConfigProps {length: number}

const BreakConfig : React.FC<BreakConfigProps> = ({length}) => {
    return (
        <div id='break-container'>
            <h3 id='break-label' className='text-2xl text-white'>Break</h3>
            <div className='change'>
                <button id='break-increment' className='config-btn'>
                    <ArrowUp />
                </button>
                <h3 id='break-length' className='text-2xl text-white'>{length}</h3>
                <button id='break-decrement' className='config-btn'>
                    <ArrowDown />
                </button>
            </div>
      </div>
    )
}

export default BreakConfig;