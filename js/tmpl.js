// will replace occurences of <% ### %> within your string

function tmpl(str, args) {
    for (var i = 0; i < args.length; i++) {
        str = str.replace(new RegExp('<%' + i.toString() + '%>', 'g'), args[i]);
    }
    return str;
}