var res = window.location.href.split("/");
$(".select-language option").removeAttr('selected', 'selected');
var selectedValue = "";
switch (res[res.length - 1]) {
    case 'index.html':
        selectedValue = 'index';
        break;
    case '':
        selectedValue = 'index';
        break;
    case 'index-ar.html':
        selectedValue = 'index-ar'
        break;
    case 'index-de.html':
        selectedValue = 'index-de'
        break;
    case 'index-ru.html':
        selectedValue = 'index-ru'
        break;
    case 'index-ch.html':
        selectedValue = 'index-ch'
        break;
    default:
        selectedValue = 'index-fr'
}
$(".select-language").val(selectedValue);