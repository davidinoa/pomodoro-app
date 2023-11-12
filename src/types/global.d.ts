/* eslint-disable react/no-typos */
import 'react'

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}
