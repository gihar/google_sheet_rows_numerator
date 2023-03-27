/** @OnlyCurrentDoc */

function getMaxId(data){
  var max = 0
  var num = 0
  var numRows = data.length

  for (var i = 0; i < numRows; i++) {
    num = parseInt(data[i].toString().split("-")[1])
    if (num > max) {
      max = num
    }
  }
  return max + 1
}

function onEdit(e){
  
  const sheetName = e.source.getActiveSheet().getSheetName()
  const sheet = e.source.getActiveSheet();
  const numRows = sheet.getLastRow();
  const cell = e.range;
  const row = cell.getRow();
  const col = cell.getColumn();

  if (sheetName == 'Cutover_b') {
    const rowId = sheet.getRange(row,1).getValue()
    
    var rangeA = sheet.getRange(1,1,numRows,1)
    var data = rangeA.getValues()
    var count = 0 
 
    for (var i = 0; i < numRows; i++) {    //цикл по всем строкам на листе
      if (rowId == data[i]) {
        count = count + 1                  //считаем, сколько раз встречается такой идентификатор
      }
    };                                     //конец  цикла

    if ((count > 1) || (rowId == '')) {    //Если таких id строки пустой или такой id уже есть
       var maxId = getMaxId(data)
       var prefix = 'CUT-'
       var newRowId = prefix.concat(maxId.toString())
       sheet.getRange(row, 1).setValue(newRowId);
    }
  }
}
