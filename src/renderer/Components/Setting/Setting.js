import CodeEditor from '@uiw/react-textarea-code-editor';
import Select from 'react-select';

import './setting.css';

/**
 * Component that displays a single `setting`. Its properties are `settingName`,
 * `setting` and `modify`. In order to modify the setting, `modify` should be
 * called. The value to be passed to the function is the entire setting.
 */
export default function Setting({setting, modify}) {

    function setValue(value) {
        setting.value = value;
        modify(setting);
    }
    
    // Render a select element
    if (setting.type == 'select') {

        const options = setting.options.map(option => {
            return { value: option, label: option };
        });
        const value = { value: setting.value, label: setting.value };

        return (
            <>
                <h3>{setting.name}</h3>
                <Select
                    theme={selectTheme}
                    styles={selectStyles}
                    options={options}
                    value={value}
                    onChange={(e) => setValue(e.value)}
                />
            </>
        )
    }

    // Render a switch for booleans
    else if (setting.type == 'bool') {

        const swtch = (
            setting.value? <input className='form-check-input' type='checkbox' onChange={setValue} checked />
            : <input className='form-check-input' type='checkbox' onChange={(e) => setValue(e.target.checked)} />
        )

        return (
            <>
                <h3>{setting.name}</h3>
                <div className='form-check form-switch'>
                    {swtch}
                </div>
            </>
        )
    }

    // Render a text input
    else if (setting.type == 'text') {
        return (
            <>
                <h3>{setting.name}</h3>
                <input type='text' className='setting' value={setting.value} onChange={(e) => setValue(e.target.value)} />
            </>
        )
    }

    // Render a text input
    else if (setting.type == 'code') {

        // There are two different ways of saving the typed code: either by
        // blur or by being inactive for 10 seconds

        let timeoutID;
        // Timeout that executes setValue if not called again
        function storeValueAfterTimeout(e) {
            setting.value = e.target.value;
            clearTimeout(timeoutID);
            timeoutID = setTimeout(() => {
                modify(setting);
            }, 10000);
        }

        return (
            <>
                <h3>{setting.name}</h3>
                <div data-color-mode={window.settings.theme.value}>
                    <CodeEditor value={setting.value} language={setting.language} onChange={storeValueAfterTimeout} onBlur={(e) => setValue(e.target.value)} padding={15} />
                </div>
            </>
        )
    }
}

const selectStyles = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'var(--color)' : 'var(--color-05)',
    })
};

const selectTheme = theme => ({
    ...theme,
    borderRadius: 'var(--border-radius)',
    colors: {
        ...theme.colors,
        neutral0: 'var(--bg-color)',
        neutral5: 'var(--color-005)',
        neutral10: 'var(--color-01)',
        neutral20: 'var(--color-02)',
        neutral30: 'var(--color-03)',
        neutral40: 'var(--color-04)',
        neutral50: 'var(--color-05)',
        neutral60: 'var(--color-07)',
        neutral70: 'var(--color-08)',
        neutral80: 'var(--color-09)',
        neutral90: 'var(--color)',
        primary: 'var(--color-02)',
        primary25: 'var(--color-005)',
        primary50: 'var(--color-01)',
    }
});