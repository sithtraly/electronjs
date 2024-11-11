const $ = require('jquery')
const { UserModel } = require('../../db.config')
const { ipcRenderer } = require('electron')
const { route } = require('../../constants/route')

$(document).ready(() => {
  loadData()
})

async function loadData() {
  const data = await UserModel.findAll()
  $('#tb-data').empty()
  data.forEach((user) => {
    const tr = `<tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.username}</td>
        <td>
          <button style="color: blue;" id="u-${user.id}">Update</button>
          <button style="color: red;" id="d-${user.id}">delete</button>
        </td>
      </tr>`
    $('#tb-data').append(tr)
    $('#d-' + user.id).click(function () {
      const id = parseInt($(this).attr('id').split('-')[1])
      deleteRow(id)
    })
    $('#u-' + user.id).click(function () {
      const id = parseInt($(this).attr('id').split('-')[1])
      ipcRenderer.send('changeTo', [route.update, id])
    })
  })
}

async function deleteRow(rowId) {
  await UserModel.destroy({ where: { id: rowId } })
  loadData()
}

$('#bt-back').click(function () {
  ipcRenderer.send('changeTo', route.login)
})