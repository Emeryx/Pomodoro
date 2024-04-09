import ArrowUp from "../utils/ArrowUp";
import ArrowDown from "../utils/ArrowDown";

interface SessionConfigProps {
  length: number;
  modify: Function;
}

const SessionConfig: React.FC<SessionConfigProps> = ({ length, modify }) => {
    return (
        <div id="session-container">
        <h3 id="session-label" className="text-2xl text-neutral-50">
            Session
        </h3>
        <div className="change">
            <button id="session-increment" onClick={() => modify(true)} className="config-btn">
            <ArrowUp />
            </button>
            <h3 id="session-length" className="text-2xl text-neutral-50">
            {length}
            </h3>
            <button id="session-decrement" onClick={() => modify(false)} className="config-btn">
            <ArrowDown />
            </button>
        </div>
        </div>
    );
};

export default SessionConfig;
