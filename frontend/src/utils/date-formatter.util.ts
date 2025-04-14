export const formatDate = (isoString: string): string => {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
