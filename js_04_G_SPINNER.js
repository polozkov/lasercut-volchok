G.SPINNER = {
  f_folds: function (c_00 = [0, 0], side = 96) {
    var half = side * 0.5;
    var small = half - side * Math.tan(Math.PI / 8);
    var my_svg = "";
    var arr = [0, small, half];
    function fx(n) { return Math.sign(n) * arr[Math.abs(n)] + c_00[0]; }
    function fy(n) { return Math.sign(n) * arr[Math.abs(n)] + c_00[1]; }
    function f(nx, ny) { return [fx(nx), fy(ny)]; }

    my_svg += G.SVG.f_draw_line(f(-2, -2), f(2, 2));
    my_svg += G.SVG.f_draw_line(f(0, 2), f(0, -2));
    my_svg += G.SVG.f_draw_line(f(2, -2), f(-2, 2));
    my_svg += G.SVG.f_draw_line(f(-2, 0), f(2, 0));

    my_svg += G.SVG.f_draw_line(f(2, -1), f(-2, -2));
    my_svg += G.SVG.f_draw_line(f(-2, -2), f(-1, 2));

    my_svg += G.SVG.f_draw_line(f(1, 2), f(2, -2));
    my_svg += G.SVG.f_draw_line(f(2, -2), f(-2, -1));

    my_svg += G.SVG.f_draw_line(f(-2, 1), f(2, 2));
    my_svg += G.SVG.f_draw_line(f(2, 2), f(1, -2));

    my_svg += G.SVG.f_draw_line(f(-1, -2), f(-2, 2));
    my_svg += G.SVG.f_draw_line(f(-2, 2), f(2, 1));

    return my_svg;
  },

  f_cuts: function (c_00 = [0, 0], side = 96) {
    var half = side * 0.5;
    var my_svg = "";
    var arr = [0, half];
    function fx(n) { return Math.sign(n) * arr[Math.abs(n)] + c_00[0]; }
    function fy(n) { return Math.sign(n) * arr[Math.abs(n)] + c_00[1]; }
    function f(nx, ny) { return [fx(nx), fy(ny)]; }

    my_svg += G.SVG.f_draw_line(f(1, 1), f(-1, 1), G.STYLES.stroke_cuts);
    my_svg += G.SVG.f_draw_line(f(-1, 1), f(-1, -1), G.STYLES.stroke_cuts);
    my_svg += G.SVG.f_draw_line(f(-1, -1), f(1, -1), G.STYLES.stroke_cuts);
    my_svg += G.SVG.f_draw_line(f(1, -1), f(1, 1), G.STYLES.stroke_cuts);

    return my_svg;
  },

  f_folds_text_cuts: function (c_00 = [0, 0], side = 96) {
    var my_svg = G.SPINNER.f_folds(c_00, side);

    var text_0 = G.TEXT.f_split_to_matrix(["ПОЛОЗКОВ", "СЕРГЕЙ СЕРГЕЕВИЧ", "АВТОР ВОЛЧКА", "+7 925 386 30 28"]);
    var text_1 = G.TEXT.f_split_to_matrix(["ЖУРНАЛ «КВАНТИК»", "2022-10 СТР. 18-19", "ВОЛЧОК И КОЛПАЧОК", " "]);
    var text_2 = G.TEXT.f_split_to_matrix(["ПЕВНИЦКИЙ", "ДМИТРИЙ ЛЬВОВИЧ", "МУЗЕЙ ГОЛОВОЛОМОК", "+7 985 768 82 73"]);
    var text_3 = G.TEXT.f_split_to_matrix(["СТОРОНА КВАДРАТА", "9.6 СМ", "КОЛПАЧОК", "7.4 СМ"]);

    //text_0 = [["Й"]];
    function f(text_03, deg, shift_xy) {
      var font = [1.125 * side / 96.0, 1.8 * side / 96.0];
      var font_plus_gap = [font[0] * 1.375, font[1] * 1.5];
      var c_xy = [c_00[0] + shift_xy[0], c_00[1] + shift_xy[1]];
      return G.TEXT.f_multiline_center_text_with_rotation(text_03, deg, c_xy, font, font_plus_gap);
    }
    var delta = 30.5 * side / 96.0;

    my_svg += f(text_0, 45, [-delta, -delta]);
    my_svg += f(text_1, 45 + 90, [delta, -delta]);
    my_svg += f(text_2, 45 + 180, [delta, delta]);
    my_svg += f(text_3, 45 + 270, [-delta, delta]);

    my_svg += G.SPINNER.f_cuts(c_00, side);

    return my_svg;
  },

  f_cut_A3: function (dx = 0, dy = 0, is_solo = false) {
    var side = 96;
    var n_wh = [4, 3];
    var A3_wh = [420, 297];
    var gap_w = (A3_wh[0] - side * n_wh[0]) / (n_wh[0] + 1);
    var gap_h = (A3_wh[1] - side * n_wh[1]) / (n_wh[1] + 1);

    var border_w = 0.5 * (A3_wh[0] - side * n_wh[0] - gap_w * (n_wh[0] - 1));
    var border_h = 0.5 * (A3_wh[1] - side * n_wh[1] - gap_h * (n_wh[1] - 1));
    var step_w = gap_w + side;
    var step_h = gap_h + side;
    var c_00 = [border_w + side * 0.5, border_h + side * 0.5];
    function f_center(ix, iy) {return [c_00[0] + ix * step_w + dx, c_00[1] + iy * step_h + dy]; }

    var my_svg = "";
    my_svg += G.SVG.f_draw_line([0 + dx,0 + dy], [border_w + dx, border_h + dy], G.STYLES.stroke_text);

    if (is_solo) {
      my_svg += G.SPINNER.f_folds_text_cuts(f_center(0, 0));
      return my_svg;
    }

    for (let iy = 0; iy < n_wh[1]; iy += 1)
    for (let ix = 0; ix < n_wh[0]; ix += 1)
    my_svg += G.SPINNER.f_folds_text_cuts(f_center(ix, iy));

    my_svg += G.SVG.f_draw_line([A3_wh[0] - border_w + dx, A3_wh[1] - border_h + dy], [A3_wh[0] + dx, A3_wh[1] + dy], G.STYLES.stroke_text);
    
    return my_svg;
  },

  f_cut_A3_four: function () {
    var my_svg = "";
    var A3_wh = [420, 297];

    my_svg += G.SPINNER.f_cut_A3(0,0);
    my_svg += G.SPINNER.f_cut_A3(A3_wh[0], 0);
    my_svg += G.SPINNER.f_cut_A3(0, A3_wh[1]);
    my_svg += G.SPINNER.f_cut_A3(A3_wh[0], A3_wh[1]);

    return my_svg;
  }
};