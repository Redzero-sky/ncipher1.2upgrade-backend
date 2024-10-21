import React, {useState} from 'react';

function IntervalForm({startInterval, remainingTime}) {
    const [interval, setInterval] = useState(0);

    const handleInputChange = (e) => {
        setInterval(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        startInterval(interval);
    };

    return (
        <div className="bg-gray-900 flex justify-center pt-16">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-white mb-6">Transactions</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="interval" className="font-[Nippo] block text-gray-400 text-lg mb-2">
                            Enter the interval in minutes
                        </label>

                        <input
                            id="interval"
                            type="number"
                            value={interval}
                            onChange={handleInputChange}
                            className="font-[Nippo] w-96"
                            placeholder="0"
                        />
                    </div>
                    <button className="clipButton font-[Nippo] w-[130px]">
                        Set Interval
                    </button>
                </form>
                <p className="text-xl font-[Nippo] text-white my-4">
                    Transactions will refresh after {remainingTime} seconds.
                </p>
            </div>
        </div>
    );
}

export default IntervalForm;