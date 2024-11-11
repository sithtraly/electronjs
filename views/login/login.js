const { ipcRenderer } = require('electron')
const $ = require('jquery')
const { UserModel } = require('../../db.config')
const { route } = require('../../constants/route')

$('#bt-login').click(async function () {
  const username = $('#txt-username').val()
  const password = $('#txt-password').val()

  const user = await UserModel.findOne({ where: { username: username } })
  if (!user) return alert('User not found')
  if (password != user.dataValues.password) return alert('wrong password')
  ipcRenderer.send('changeTo', 'home.html')
})

$('#signup').click(function () {
  ipcRenderer.send('changeTo', route.register)
})