import React, {useEffect, useState} from 'react';
import Navbar from "../common/Navbar.jsx";
import IntervalForm from "../views/intervalForm.jsx";
import TransactionsTable from "../views/transactionTable.jsx";
import getTopTenWhalesOnBSC from "../../utils/getTopWhales.js";

function Transactions(props) {
    const [currentTimer, setCurrentTimer] = useState(null);
    const [remainingTime, setRemainingTime] = useState(0);
    const [whaleData, setWhaleData] = useState([]);
    const [loading, setLoading] = useState(false);

    const createTimer = (intervalMins) => {
        if (intervalMins > 0) {
            if (currentTimer) clearInterval(currentTimer);
            setRemainingTime(intervalMins * 60);
            const timer = setInterval(() => {
                setRemainingTime(prevTime => {
                    if (prevTime <= 0) {
                        refreshTable()
                        return intervalMins * 60;
                    }
                    return prevTime - 1;
                });
            }, 1000);
            setCurrentTimer(timer);
        }
    }

    useEffect(() => {
        return () => {
            if (currentTimer) clearInterval(currentTimer);
        };
    }, [currentTimer]);

    const handleChange = (interval) => {
        createTimer(interval);
    };

    const refreshTable = async () => {
        setLoading(true)
        let data = await getTopTenWhalesOnBSC();
        console.log(data);
        setWhaleData(data);
        setLoading(false);
    }

    return (
        <div id="staking" className="h-screen">
            <Navbar />
            <IntervalForm startInterval={handleChange} remainingTime={remainingTime}/>
            <TransactionsTable whaleData={whaleData} loading={loading}/>
        </div>
    );
}

export default Transactions;