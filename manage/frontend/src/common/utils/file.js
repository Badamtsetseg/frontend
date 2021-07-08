export function getFileUrlForForm(e) {
  if (Array.isArray(e)) {
    return e
  }
  return e && e.file && e.file.response && e.file.response.data
}

export function normFile(e) {
  if (Array.isArray(e)) {
    return e
  }
  return e && e.fileList
}

export function isImage(file) {
  return file.type.startsWith('image/')
}

// export function getFileUrlsForForm(e) {
//   if (Array.isArray(e)) {
//     return e
//   }
//   const fileUrls = []
//   if (e && e.fileList) {
//     for (let fileData of e.fileList) {
//       console.log(fileData)
//       if (fileData.response && fileData.response.data) {
//         fileUrls.push(fileData.response.data)
//       }
//     }
//   }
//   return fileUrls
// }
