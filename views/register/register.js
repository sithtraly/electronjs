const { ipcRenderer } = require('electron')
const $ = require('jquery')
const { UserModel } = require('../../db.config')
const { route } = require('../../constants/route')

$('#login').click(function () {
  ipcRenderer.send('changeTo', route.login)
})
$('#bt-register').click(async function () {
  event.preventDefault()
  const name = $('#txt-name').val()
  const email = $('#txt-email').val()
  const username = $('#txt-username').val()
  const password = $('#txt-password').val()

  const user = await UserModel.create({ name, email, username, password })
  ipcRenderer.send('changeTo', route.login)
})