import { useCallback, useEffect, useState } from 'react';

const useFetch = (url: string) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<unknown>([]);
    const [error, setError] = useState<unknown>(null);

    const getData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(
                url,
            );
            const responseJson = await response.json();
            setData(responseJson);
            setLoading(false);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        getData();
    }, [getData]);

    return { data, loading, error };
};

export default useFetch;
