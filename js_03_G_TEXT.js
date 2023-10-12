G.TEXT = {
  f_split_to_matrix: function (string_array) {
    var m = [];
    for (let i = 0; i < string_array.length; i+=1)
      m.push(string_array[i].split(""));
    return m;
  },

  f_multiline_center_text: function(m_chars, font_absolute = [10, 15], gap_plus_size_xy = [15, 20]) {
    function f_char_center(i_dx, i_dy) {
      var final_dx = i_dx * gap_plus_size_xy[0];
      var final_dy = i_dy * gap_plus_size_xy[1];
      var xy = [final_dx, final_dy];

      return xy;
    }

    var my_svg = "";
    for (let iy = 0; iy < m_chars.length; iy+=1)
    for (let ix = 0; ix < m_chars[iy].length; ix+=1) {
      let x0 = m_chars[iy].length * 0.5 - 0.5;
      let y0 = m_chars.length * 0.5 - 0.5;
      let cxy = f_char_center(ix - x0, iy - y0);
      let scale_xy = [font_absolute[0] / 8.0, font_absolute[1] / 12.0];
      my_svg += G.SVG.f_draw_path(G.FONT.get(m_chars[iy][ix]), scale_xy, 0, cxy);
    }

    return my_svg;
  },

  f_multiline_center_text_with_rotation: function (m_chars, rotation = 0, c_00 = [0,0], font_absolute = [10, 15], gap_plus_size_xy = [15, 20]) {
    var svg_chars = G.TEXT.f_multiline_center_text(m_chars, font_absolute, gap_plus_size_xy);
    var transform = G.f_translate_rotate(c_00, rotation);
    var g = '<g transform="' + transform + '"> ';
    g += svg_chars;
    g += '</g>'
    return g;
  },
};

