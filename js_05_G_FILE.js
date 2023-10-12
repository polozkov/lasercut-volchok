function downloadFile(data, fileName, type="text/plain") {        
  // создаем невидимый элемент ссылки
  var a = document.createElement("a");
  a.style.display = "none";
  document.body.appendChild(a);
 
  // в качестве данных для загрузки из ссылки устанавливаем данные из формы
  a.href = window.URL.createObjectURL(
      new Blob([data], { type })
  );
 
  // аттрибут download ссылки используется для загрузки файла
  a.setAttribute("download", fileName);

  // запускаем загрузку путем эмулирования нажатия клавиши
  a.click();

  // удаляем ссылку из DOM
  document.body.removeChild(a);
}

function f_final_svg_for_file(inner_html, view_box, svg_wh) {
  var SIZES = 'width="' + svg_wh[0] + 'mm"' + ' ' + 'height="' + svg_wh[1]+ 'mm"';
  var VIEW_BOX = 'viewBox="' + view_box + '"';
  var file_start = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg ` + SIZES + ` 
` + VIEW_BOX + ` 
version="1.1"
baseProfile="full"
xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink"
xmlns:ev="http://www.w3.org/2001/xml-events">
`
  return file_start + inner_html + '</svg>';
}

// вызывается
function f_my_download(only_draw = false) {
  var wh = G.STYLES.machine_w_h;
  var view_box = "0 0 " + wh[0] + " " + wh[1];
  G.SVG.el.setAttribute("viewbox", view_box);
  G.SVG.el.setAttribute("width", wh[0] + "px");
  G.SVG.el.setAttribute("height", wh[1] + "px");
  
  var test_svg = G.SPINNER.f_cut_A3_four();
  //test_svg = G.SPINNER.f_cut_A3(0, 0, true); 
  //test_svg = G.SPINNER.f_cut_A3(0, 0, false);
  G.SVG.f_clear_html();
  G.SVG.f_add_html(test_svg);

  if (only_draw) {return;} 

  downloadFile(
    f_final_svg_for_file(test_svg, view_box, wh),
    "Volchok.svg"
  );
};

f_my_download(true);
function f_event_click() {
  f_my_download(false);
};

G.SVG.el.onclick = f_event_click;