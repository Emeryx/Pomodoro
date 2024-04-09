import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faPause } from "@fortawesome/free-solid-svg-icons";

interface ControlProps {
    resetFunc: Function;
    startStopFunc: Function;
}

const Control : React.FC<ControlProps> = ({resetFunc, startStopFunc}) => {
    return (
        <div id="control-container">
        <button id="reset" onClick={() => resetFunc()}>
            <FontAwesomeIcon icon={faArrowsRotate} />
        </button>
        <button id="start_stop" onClick={() => startStopFunc()}>
            <FontAwesomeIcon icon={faPause} />
        </button>
        </div>
    );
};

export default Control;
