/**
 * 根据资源url下载文件
 * @param url
 * @param fileName
 */
export function download (url: string, fileName = ''): void {
  const aLink = document.createElement('a')
  aLink.style.display = 'none'
  aLink.download = fileName
  aLink.href = url
  document.body.appendChild(aLink)
  // 避免新开页面，闪烁
  // aLink.target = '_blank'
  aLink.click()
  document.body.removeChild(aLink)
  // aLink.remove()
}
