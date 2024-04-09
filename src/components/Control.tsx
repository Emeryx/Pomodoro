import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faPause } from '@fortawesome/free-solid-svg-icons';

const Control = () => {

    return (
        <div id='control-container'>
            <button id='reset'>
            <FontAwesomeIcon icon={faPause} />
            </button>
            <button id='start_stop'>
                    <FontAwesomeIcon icon={faArrowsRotate} />
            </button>
        </div>
    )

}

export default Control;