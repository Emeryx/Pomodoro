import ArrowUp from '../utils/ArrowUp';
import ArrowDown from '../utils/ArrowDown';

interface SessionConfigProps {length: number}

const SessionConfig : React.FC<SessionConfigProps> = ({length}) => {
    return (
        <div id='session-container'>
            <h3 id='session-label' className='text-xl'>SESSION</h3>
            <button id='session-increment'>
                <ArrowUp />
            </button>
            <h3 id='session-length'>{length}</h3>
            <button id='session-decrement'>
                <ArrowDown />
            </button>
      </div>
    )
}

export default SessionConfig;