$(document).ajaxStart(function () {
    $("#loading").show();
});

$(document).ajaxComplete(function () {
    $("#loading").hide();
});

function GetAjaxPromesa(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        //xhr.onload = function () {
        //    resolve(this.responseText);
        //};
        xhr.onerror = reject;
        xhr.open('GET', url);
        xhr.addEventListener('load', function () {
            if (xhr.status == 200)
            {
                resolve(JSON.parse(xhr.response))
            }
        });
        xhr.send();
    });
}

function FormatoFecha(fechaEnviada, tipo) {
    var fecha = new Date(fechaEnviada);

    //chequeamos que la fecha tenga formato y la misma sea de fecha, ademas de que no sea NaN
    if (fecha && fecha instanceof Date && !isNaN(fecha)) {
        if (tipo == '0') {
            return fecha.toISOString().slice(0, 10);
        }
        else if (tipo == '1') {
            // 01, 02, 03, ... 29, 30, 31
            var dd = (fecha.getDate() < 10 ? '0' : '') + fecha.getDate();
            // 01, 02, 03, ... 10, 11, 12
            var MM = ((fecha.getMonth() + 1) < 10 ? '0' : '') + (fecha.getMonth() + 1);
            // 1970, 1971, ... 2015, 2016, ...
            var yyyy = fecha.getFullYear();

            // create the format you want
            return (dd + "/" + MM + "/" + yyyy);
        }

        return fecha.toLocaleDateString();
    }

    return '';
}

function ErrorObtener(XHR) {
    console.log(XHR);
    if (!XHR.responseJSON) {

        var message = XHR.responseText;
        if (!message || message.indexOf('DOCTYPE')) {
            return ErrorObtenerporCodigo(XHR.status);
        }

        return message;
    }
    if (!XHR.responseText) return null;
    var errorMsg = '';
    var responseObj = JSON.parse(XHR.responseText);
    if (responseObj.exceptionMessage) {
        errorMsg = responseObj.exceptionMessage;
    } else if (responseObj.innerException) {
        errorMsg = responseObj.innerException.message;
    } else if (responseObj.message) {
        errorMsg = responseObj.message;
    } else {
        errorMsg = XHR.responseText;
    }
    return errorMsg;
}

function ErrorObtenerporCodigo(status) {
    switch (status) {
        case 401:
            return 'Usted no posee los permisos suficientes';
        case 404:
            return 'No se encontro el servicio solicitado';
        default:
            return 'Error inesperado contactese con el administrador';
    }
}


function GuardarByteArrayComoArchivo(data, xhr, archivoNombre) {

    //Si se han devuelto datos
    if (data != null && data != "FAIL") {
        var b64Data = data;
        var contentType = xhr.getResponseHeader("Content-Type"); //Obtenemos el tipo de los datos
        var filename = xhr.getResponseHeader("Content-disposition");//Obtenemos el nombre del fichero a desgargar
        filename = archivoNombre;

        var sliceSize = 512;

        var byteCharacters = window.atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }
        //Tras el procesado anterior creamos un objeto blob
        var blob = new Blob(byteArrays, {
            type: contentType
        });

        // IE 10+
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, filename);
        } else {
            //Descargamos el fichero obtenido en la petición ajax
            var url = URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

    }
}

function OrdenDinamico(property, desc) {
    if (desc) {
        return function (a, b) {
            return (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
        }
    }
    return function (a, b) {
        return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    }
}

function ObtenerPadre(child, className) {
    if (!child || child == document) {
        return null;
    }
    if (child.classList.contains(className)) {
        return child;
    } else {
        return ObtenerPadre(child.parentNode, className);
    }
}

function ObtenerPadreTipo(child, type) {
    if (!child || child == document) {
        return null;
    }
    if (child.nodeName == type) {
        return child;
    } else {
        return ObtenerPadre(child.parentNode, type);
    }
}

function MostrarFormulario(formulario, origen) {
    var secciones = document.getElementsByTagName('seccion');

    for (var i = 0; i < secciones.length; i++) {
        secciones[i].style.display = 'none';
    }
    origen.style.display = 'none';
    formulario.style.display = 'block';

}

function sortTable(table, col, reverse) {
    var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
        tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
        i;
    reverse = -((+reverse) || -1);
    tr = tr.sort(function (a, b) { // sort rows
        return reverse // `-1 *` if want opposite order
            * (a.cells[col].textContent.trim() // using `.textContent.trim()` for test
                .localeCompare(b.cells[col].textContent.trim())
               );
    });
    for (i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
}

function makeSortable(table) {
    var th = table.tHead, i;
    th && (th = th.rows[0]) && (th = th.cells);
    if (th) i = th.length;
    else return; // if no `<thead>` then do nothing
    while (--i >= 0) (function (i) {
        var dir = 1;
        th[i].addEventListener('click', function () { sortTable(table, i, (dir = 1 - dir)) });
    }(i));
}

function makeAllSortable(parent) {
    parent = parent || document.body;
    var t = parent.getElementsByTagName('table'), i = t.length;
    while (--i >= 0) makeSortable(t[i]);
}