export function calculateSize(width, height, canvasWidth, canvasHeight) {
  let ratio = width / height

  let targetWidth = Math.min(canvasWidth, Math.max(width, height))
  let targetHeight = Math.min(canvasHeight, Math.max(width, height))

  if (ratio < 1) {
    targetWidth = targetHeight * ratio
  } else {
    targetHeight = targetWidth / ratio
  }

  // console.log({w0: width, h0: height, w1: targetWidth, h1: targetHeight})
  return {width: targetWidth, height: targetHeight}
}
