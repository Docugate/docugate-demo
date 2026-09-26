import { useCallback, useEffect, useState } from 'react'

/** Loads data for a screen and exposes a reload for after a mutation. */
export function useLoad<T>(load: () => Promise<T>, deps: unknown[]) {
  const [data, setData] = useState<T>()
  const [error, setError] = useState<string>()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const run = useCallback(load, deps)

  const reload = useCallback(() => {
    setError(undefined)
    run().then(setData, (e: Error) => setError(e.message))
  }, [run])

  useEffect(reload, [reload])

  return { data, error, reload }
}
