const $ = require('jquery');
const { UserModel } = require('../../db.config');
const { ipcRenderer } = require('electron');
const { route } = require('../../constants/route');

var id

$(document).ready(async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const data = JSON.parse(decodeURIComponent(urlParams.get('data')))
  id = data.val

  const user = await UserModel.findByPk(id)
  $('#txt-name').val(user.name)
  $('#txt-email').val(user.email)
  $('#txt-username').val(user.username)
  $('#txt-password').val(user.password)
})

$('#bt-update').click(async function () {
  const data = {
    name: $('#txt-name').val(),
    email: $('#txt-email').val(),
    username: $('#txt-username').val(),
    password: $('#txt-password').val(),
  }
  const updatedUser = await UserModel.update(data, { where: { id: id } })
  ipcRenderer.send('changeTo', route.home)
})