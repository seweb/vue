export const handleClientErrors = (v$: any, fieldName: string): string => {
  return v$[fieldName]?.$errors[0]?.$message
}
