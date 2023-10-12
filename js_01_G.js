var G = {
  STYLES: {
    //machine_w_h: [1000, 600],
    machine_w_h: [420 * 2.0, 297 * 2.0],
    //machine_w_h: [420 * 2, 297 * 2],
    stroke_width: 0.0762,

    stroke_text: "blue",
    stroke_folds: "red",
    stroke_cuts: "black"
  },

  //font in greed default: w=8 h=12 (square cells)
  FONT: new Map(),

  f_scale_d: function(d, scale_xy = [1.0, 1.0]) {
    var arr_words = d.split(' ');

    function f_work_ix_iy(ix, iy) {
      arr_words[ix] = ((+arr_words[ix]) * scale_xy[0]) + "";
      arr_words[iy] = ((+arr_words[iy]) * scale_xy[1]) + "";
    }

    function f_work(i_x_i_y) {
      f_work_ix_iy(i_x_i_y, i_x_i_y + 1);
    }

    for (let i = 0; i < arr_words.length; i+=1) {
      if (arr_words[i] == "M") {f_work(i + 1); continue;}
      if (arr_words[i] == "L") {f_work(i + 1); continue;}
      if (arr_words[i] == "A") {f_work(i + 1); f_work(i + 6); continue;}
    }
    
    return arr_words.join(" ");
  },

  f_translate_rotate: function (d_xy, deg) {
    var translate = "translate(" + d_xy[0] + " " + d_xy[1] + ")";
    var rotate = "rotate(" + deg + ")";
    return translate + " " + rotate;
  },

  SVG: {
    el: document.getElementById("id_main_svg"),

    f_draw_path: function (d, scale_xy = [1,1], rotate = 0, translate = [0,0], stroke_width = G.STYLES.stroke_width, stroke = G.STYLES.stroke_text, fill = "none") {
      var my_svg = '<path d="' + G.f_scale_d(d, scale_xy) + '"';
      //console.log(d);
      my_svg += ' stroke="' + stroke + '" stroke-width="' + stroke_width + '" fill="' + fill + '"';
      my_svg += ' transform="' + G.f_translate_rotate(translate, rotate) + '"';
      return my_svg + ' />';
    },

    f_draw_line: function (a, b, stroke = G.STYLES.stroke_folds, stroke_width = G.STYLES.stroke_width) {
      var str = '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '"';
      str += ' stroke="' + stroke + '" stroke-width="' + stroke_width + '"';
      return str + '/>';
    },

    f_add_html: function (new_html) {
      G.SVG.el.innerHTML += new_html;
    },

    f_clear_html: function () {
      G.SVG.el.innerHTML = "";
    }
  },

  TEXT: {},

  SPINNER: {}
};


