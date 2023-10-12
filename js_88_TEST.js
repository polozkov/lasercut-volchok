(function f_test() {
  /*var test_svg = "";

  var dxy = [8 + 3, 12  + 3];
  var d00 = [4 + 3, 6 + 3];
  var m_chars = [["А","Б","В","Г","Д","Е"], ["Ё","Ж","З","И","Й","К"], ["Л","М","Н","О","П","Р"],
   ["С","Т","У","Ф","Х","Ц"], ["Ч","Ш","Щ","Ъ","Ы","Ь"], ["Э","Ю","Я","+","-"," "],
   ["0","1","2","3","4","5"], ["6","7","8","9"," "," "]];

  m_chars = [
    ["Ц","К"], ["В","Г","Д"]
  ];

  //test_svg += G.TEXT.f_multiline_center_text_with_rotation(m_chars, 45, [30, 0]);

  */

  return;
  var wh = G.STYLES.machine_w_h;
  G.SVG.el.setAttribute("viewbox", "0 0 " + wh[0] + " " + wh[1]);
  G.SVG.el.setAttribute("width", wh[0] + "px");
  G.SVG.el.setAttribute("height", wh[1] + "px");

  test_svg += G.SPINNER.f_cut_A3_four();
  G.SVG.f_add_html(test_svg);
}());