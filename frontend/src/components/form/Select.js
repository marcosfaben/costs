import styles from './Select.module.css'

function Select({text, name, option, handleOnChange, value}){
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
                <option>{text}</option>
                {
                    option.map((option)=>
                    (
                        <option value={option._id} key={option._id}>{option.name}</option>
                    )
                )}
            </select>
        </div>
    )
}

export default Select