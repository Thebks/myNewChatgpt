import React from 'react'

import { useEffect, useState } from 'react'


const Loader = () => {
    const [loadingText, setLoadingText] = useState('');

    useEffect(() => {
        const loadInterval = setInterval(() => {
            setLoadingText((prevText) => {
                if (prevText === '....') {
                    return '';
                } else {
                    return prevText + '.';
                }
            });
        }, 300);

        return () => clearInterval(loadInterval);
    }, []);
    return (
        <span>{loadingText}</span>
    )
}

export default Loader