export function getStyle(styles) {
  const fontWeight = styles && styles.bold ? 'bold' : null
  const fontStyle = styles && styles.italic ? 'italic' : null
  const textDecoration = styles && styles.underline ? 'underline' : null
  // console.log({fontWeight, fontStyle, textDecoration, fontSize: styles.fontSize, marginBottom: styles.marginBottom})
  return {fontWeight, fontStyle, textDecoration, fontSize: styles && styles.fontSize, marginBottom: styles && styles.marginBottom}
}
