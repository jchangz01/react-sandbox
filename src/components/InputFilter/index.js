import './index.css';

export default function InputFilter({filterStr, changeFilterStr, results_count}) {
    const handleChange = (e) => {
        changeFilterStr(e.target.value);
    }

    return (
        <div>
            <div style={{padding: '10px'}}>
                <label>Search Users ({results_count} results): </label>
                <input 
                    className="input-filter" 
                    type="text" 
                    value={filterStr} 
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}