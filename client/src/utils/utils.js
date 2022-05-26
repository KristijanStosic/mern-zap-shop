import { useLocation } from 'react-router-dom'

export function currencyFormat(amount) {
  return '$' + (amount / 100).toFixed(2)
}

export function useQuery() {
  return new URLSearchParams(useLocation().search)
}