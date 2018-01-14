const isMacOS = process.platform === 'darwin'
const isWindows = process.platform === 'win32'

module.exports = {
  isWindows,
  isMacOS: isMacOS
}