import { useState, useCallback } from "react";

const useHttp = () => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);
   const [process, setProcess] = useState('waiting')

   const request = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
      setLoading(true);
      setProcess('loading')
      setError(false)
      try {
         const response = await fetch(url, { method, body, headers })
         if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`)
         }

         const data = await response.json();
         setLoading(false)
         return data

      } catch (error) {
         setError(error.message)
         setLoading(false)
         setProcess('error')
         throw error
      }

   }, [])

   const clearError = useCallback(() => {
      setError(false)
      setProcess('waiting')
   }, []);

   return { loading, error, request, clearError, process, setProcess }
}

export default useHttp