import TypeXCore from "../TypeXCore/TypeXCore";
import './typexcontainer.css';
import logo from '../../../../assets/logo-cropped.png';

export default function TypeXContainer ({ settings }) {

    // wait for settings to load
    if (Object.keys(settings).length === 0) return null;

    return (
        <div id="typex-container">
            <div id='banner'>
                <img src={logo} height='250px' className='me-4' />
                <h1>TypeX</h1>
            </div>
            <div className='scale-125'>
                <TypeXCore settings={settings} />
            </div>
        </div>
    )
}