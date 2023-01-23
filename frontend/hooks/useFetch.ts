import { useEffect, useState } from 'react'

export interface UseDataState<Data> {
  data: Data | null
  error: null | unknown
  loading: boolean
}

export function useFetch<Data>(url: `/${string}`) {
  const [state, setState] = useState<UseDataState<Data>>({
    data: null,
    error: null,
    loading: true,
  })

  useEffect(() => {
    let ignore = false
    const abortController = new AbortController()

    setState((previous) => ({ ...previous, loading: true }))
    fetch(url, {
      signal: abortController.signal,
    })
      .then((response) => response.json())
      .then((json: Data) => {
        if (!ignore) {
          setState({ data: json, loading: false, error: null })
        }
      })
      .catch((e) => {
        if (!abortController.signal.aborted) {
          console.error('useData', e)
          setState((previous) => ({ ...previous, error: e, loading: false }))
        } else {
          setState((previous) => ({ ...previous, error: null, loading: true }))
        }
      })

    return () => {
      ignore = true
      abortController.abort()
    }
  }, [url])

  return state
}
