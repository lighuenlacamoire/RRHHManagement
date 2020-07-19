
function BorrarAlertFactory() {
    return {

        main: function (_title, _message, _ondelete, _oncancel) {

            var title, message, value, ondelete, oncancel;


            this.title = _title;
            this.message = _message;
            this.ondelete = _ondelete;
            this.oncancel = _oncancel;
            this.value = '';

            this.set('title', this.title);
            this.set('message', this.message);
            this.set('value', this.value);
            this.set('ondelete', this.ondelete);
            this.set('oncancel', this.oncancel);
            return this;
        },
        setup: function () {

            return {

                /* buttons collection */
                buttons: [

                    /*button defintion*/
                    {
                        /* button label */
                        text: 'Si',

                        /*bind a keyboard key to the button */
                        //key: 27,

                        /* indicate if closing the dialog should trigger this button action */
                        invokeOnClose: true,

                        /* custom button class name  */
                        className: 'btn btn-danger'


                    },
                    {
                        text: 'No',
                        key: 27/*Esc*/,
                        invokeOnClose: true,
                        className: 'btn btn-default'
                    }
                ],
                focus: { element: 0 },
                /* dialog options, these override the defaults */
                options: {
                    closable: false,
                    maximizable: false
                }
            };
        },
        settings: {
            message: undefined,
            ondelete: undefined,
            oncancel: undefined,
            value: '',

        },
        build: function () {

        },
        callback: function (closeEvent) {

            var returnValue;
            switch (closeEvent.index) {

                case 0:

                    if (typeof this.get('ondelete') === 'function') {
                        returnValue = this.get('ondelete').call(this, closeEvent, '');
                        returnValue = 1;

                        if (typeof returnValue !== 'undefined') {
                            closeEvent.cancel = !returnValue;
                        }
                    }
                    break;
                case 1:
                    if (typeof this.get('oncancel') === 'function') {

                        returnValue = this.get('oncancel').call(this, closeEvent, '');

                        if (typeof returnValue !== 'undefined') {
                            closeEvent.cancel = false;
                        }
                    }
                    //if (!closeEvent.cancel) {
                    // //   input.value = this.settings.value;
                    //}

                    break;
            }
        },

        prepare: function () {
            var contentTitulo = '<div><i class="fa fa-times-circle" style="font-size:24px;"></i><span class="tituloAlert" style="font-size:18px">' + this.title + '</span></div>';
            contentTitulo += '';
            this.setHeader(contentTitulo);
            this.setContent(this.message);
        }
    };
}

function CancelarAlertFactory() {
    return {

        main: function (_title, _message, _onYes, _onNo) {

            var title, message, value, onYes, onNo;


            this.title = _title;
            this.message = _message;
            this.onYes = _onYes;
            this.onNo = _onNo;
            this.value = '';

            this.set('title', this.title);
            this.set('message', this.message);
            this.set('value', this.value);
            this.set('onYes', this.onYes);
            this.set('onNo', this.onNo);
            return this;
        },
        setup: function () {

            return {

                /* buttons collection */
                buttons: [

                    /*button defintion*/
                    {
                        /* button label */
                        text: 'Sí',

                        /*bind a keyboard key to the button */
                        key: 13/*Enter*/,

                        /* indicate if closing the dialog should trigger this button action */
                        invokeOnClose: true,

                        /* custom button class name  */
                        className: 'btn btn-ef btn-ef-1 btn-ef-1-warning btn-ef-1a mb-10'


                    },
                    {
                        text: 'No',
                        key: 27/*Esc*/,
                        invokeOnClose: true,
                        className: 'btn btn-ef btn-ef-1 btn-ef-1-default btn-ef-1a mb-10'

                    }
                ],
                focus: { element: 0 },
                /* dialog options, these override the defaults */
                options: {
                    closable: false,
                    maximizable: false
                }
            };
        },
        settings: {
            message: undefined,
            onYes: undefined,
            onNo: undefined,
            value: '',

        },
        build: function () {

        },
        callback: function (closeEvent) {

            var returnValue;
            switch (closeEvent.index) {

                case 0:

                    if (typeof this.get('onYes') === 'function') {
                        returnValue = this.get('onYes').call(this, closeEvent, '');
                        returnValue = 1;

                        if (typeof returnValue !== 'undefined') {
                            closeEvent.cancel = !returnValue;
                        }
                    }
                    break;
                case 1:
                    if (typeof this.get('onNo') === 'function') {

                        returnValue = this.get('onNo').call(this, closeEvent, '');

                        if (typeof returnValue !== 'undefined') {
                            closeEvent.cancel = false;
                        }
                    }
                    //if (!closeEvent.cancel) {
                    // //   input.value = this.settings.value;
                    //}

                    break;
            }
        },

        prepare: function () {
            var contentTitulo = '<div><i class="fa fa-undo" style="font-size:24px;"></i><span class="tituloAlert" style="font-size:18px">' + this.title + '</span></div>';
            contentTitulo += '';
            this.setHeader(contentTitulo);
            this.setContent(this.message);
        }
    };
}

function PromptAlertFactory() {
    return {

        main: function (_title, _message, _onok, _oncancel, _options) {

            var title, message, value, onok, oncancel;


            this.title = _title;
            this.message = _message;
            //    this.ondelete = _ondelete;
            this.onok = _onok;
            this.value = '';
            this.options = _options;



            this.set('title', this.title);
            this.set('message', this.message);
            this.set('value', this.value);
            this.set('onok', this.onok);
            this.set('oncancel', this.oncancel);
            return this;
        },
        setup: function () {

            return {
                /* buttons collection */
                buttons: [

                    /*button defintion*/
                    {
                        /* button label */
                        text: 'OK',
                        /*bind a keyboard key to the button */
                        //key: 27,
                        /* indicate if closing the dialog should trigger this button action */
                        invokeOnClose: true,
                        /* custom button class name  */
                        className: 'btn btn-ef btn-ef-1 btn-ef-1-success btn-ef-1a mb-10'
                    },
                    {
                        text: 'Cancelar',
                        key: 27/*Esc*/,
                        invokeOnClose: true,
                        className: 'btn btn-ef btn-ef-1 btn-ef-1-default btn-ef-1a mb-10'
                    }
                ],
                focus: { element: 0 },
                /* dialog options, these override the defaults */
                options: {
                    closable: false,
                    maximizable: false
                }
            };
        },
        settings: {
            message: undefined,
            ondelete: undefined,
            oncancel: undefined,
            onok: undefined,
            value: '',

        },
        build: function () {

        },

        callback: function (closeEvent) {


            var returnValue;
            switch (closeEvent.index) {

                case 0:


                    if (typeof this.get('onok') === 'function') {

                        //Validación del formulario antes de cerrar el prompt
                        var _form = $(this.elements.modal).find("form");


                        var attr = $(_form).attr('data-parsley-validate');

                        if (typeof attr !== typeof undefined && attr !== false) {


                            var boolValid = $(_form).parsley().validate();
                            if (boolValid == false) {

                                //si no es valid, no deja cerrar el prompt
                                closeEvent.cancel = true;
                                return false;
                            }
                        }


                        var obj = null;
                        var arrayValuesReturned = [];
                        //var valueReturn = $(".campo-return").val();
                        $(".campo-return").each(function (index) {

                            arrayValuesReturned.push({ "key": $(this).attr('id'), "value": $(this).val() });
                        });

                        //  returnValue = this.get('onok').call(this, closeEvent, valueReturn);
                        returnValue = this.get('onok').call(this, closeEvent, arrayValuesReturned);
                        returnValue = 1;


                        if (typeof returnValue !== 'undefined') {
                            closeEvent.cancel = !returnValue;
                        }
                    }
                    break;
                case 1:
                    if (typeof this.get('oncancel') === 'function') {

                        returnValue = this.get('oncancel').call(this, closeEvent, '');

                        if (typeof returnValue !== 'undefined') {
                            closeEvent.cancel = false;
                        }
                    }
                    //if (!closeEvent.cancel) {
                    // //   input.value = this.settings.value;
                    //}

                    break;
            }
        },
        hooks: {
            onok: function (closeEvent) {

                // closeEvent.cancel = true;
            },
            // triggered when the dialog is shown, this is seperate from user defined onshow
            onshow: function () {
                //var _form = $(this.elements.modal).find("form");

                if (this.options && this.options.height) {
                    this.elements.dialog.style.height = this.options.height;
                }
                else {
                    this.elements.dialog.style.height = '300px';
                }


            },
            // triggered when the dialog is closed, this is seperate from user defined onclose
            onclose: function () {
            },
            // triggered when a dialog option gets updated.
            // IMPORTANT: This will not be triggered for dialog custom settings updates ( use settingUpdated instead).
            onupdate: function () {
            }
        },
        prepare: function () {
            var contentTitulo = '<div><i class="fa fa-leaf" style="font-size:24px;"></i><span class="tituloAlert" style="font-size:18px">' + this.title + '</span></div>';
            contentTitulo += '';
            this.setHeader(contentTitulo);
            this.setContent(this.message);

        }
    };
}

//App Modals
function AppModalPromptFactory() {

    return {

        main: function (_title, _message, _onok, _oncancel, _options) {

            var title, message, value, onok, oncancel;


            this.title = _title;
            this.message = _message;
            //    this.ondelete = _ondelete;
            this.onok = _onok;
            this.oncancel = _oncancel;
            this.value = '';
            this.options = _options;



            this.set('title', this.title);
            this.set('message', this.message);
            this.set('value', this.value);
            this.set('onok', this.onok);
            this.set('oncancel', this.oncancel);
            this.set('options', this.options);
            return this;
        },
        setup: function () {

            return {
                /* buttons collection */
                buttons: [

                    /*button defintion*/
                    {
                        /* button label */
                        text: 'Aceptar',
                        /*bind a keyboard key to the button */
                        key: 13/*Enter*/,
                        /* indicate if closing the dialog should trigger this button action */
                        invokeOnClose: true,
                        /* custom button class name  */
                        className: 'btn-inner ajs-ok',
                        /* custom button attributes  */
                        attrs: { tipo: 'ok', inner: '' },

                    },
                    {
                        text: 'Cancelar',
                        key: 27/*Esc*/,
                        invokeOnClose: true,
                        className: 'btn-inner ajs-cancel',
                        /* custom button attributes  */
                        attrs: { tipo: 'cancel', inner: '' },
                    }
                ],
                focus: { element: 0 },
                /* dialog options, these override the defaults */
                options: {
                    //closable: false,
                    maximizable: false,
                    closable: true,
                    closableByDimmer: false,
                    resizable: true,
                    autoReset: false,
                }
            };
        },
        settings: {
            message: undefined,
            ondelete: undefined,
            oncancel: undefined,
            onok: undefined,
            value: '',
            templateTitle: 'default',
            templateMessage: 'default',
            labels: '',
            buttons: '',
            footer: '',

        },
        build: function () {
            this.elements.dialog.className = 'ajs-dialog ajs-sidu';

            if (this.options && this.options.height) {
                this.elements.dialog.style.height = this.options.height;
            }
            else {
                this.elements.dialog.style.height = '330px';
            }

        },

        callback: function (closeEvent) {

            //The closeEvent has the following properties
            //
            // index: The index of the button triggering the event.
            // button: The button definition object.
            // cancel: When set true, prevent the dialog from closing.

            var returnValue;
            switch (closeEvent.index) {

                case 0:


                    if (typeof this.get('onok') === 'function') {

                        //Validación del formulario antes de cerrar el prompt
                        var _form = $(this.elements.modal).find("form");


                        var attr = $(_form).attr('data-parsley-validate');

                        if (typeof attr !== typeof undefined && attr !== false) {


                            var boolValid = $(_form).parsley().validate();
                            if (boolValid == false) {

                                //si no es valid, no deja cerrar el prompt
                                closeEvent.cancel = true;
                                return false;
                            }
                        }


                        var obj = null;
                        var arrayValuesReturned = [];
                        //var valueReturn = $(".campo-return").val();
                        $(".campo-return").each(function (index) {

                            arrayValuesReturned.push({ "key": $(this).attr('id'), "value": $(this).val() });
                        });

                        //  returnValue = this.get('onok').call(this, closeEvent, valueReturn);
                        returnValue = this.get('onok').call(this, closeEvent, arrayValuesReturned);
                        returnValue = 1;


                        if (typeof returnValue !== 'undefined') {
                            closeEvent.cancel = !returnValue;
                        }
                    }
                    break;
                case 1:
                    if (typeof this.get('oncancel') === 'function') {

                        returnValue = this.get('oncancel').call(this, closeEvent, '');

                        if (typeof returnValue !== 'undefined') {
                            closeEvent.cancel = false;
                        }
                    }
                    //if (!closeEvent.cancel) {
                    // //   input.value = this.settings.value;
                    //}

                    break;
            }
        },
        // AlertifyJS will invoke this each time a settings value gets updated.
        settingUpdated: function (key, oldValue, newValue) {
            // Use this to respond to specific setting updates.
            switch (key) {
                case 'templateTitle':
                    // Do something when 'templateName' changes
                    break;

                case 'templateMessage':
                    // Do something when 'templateName' changes
                    break;
                case 'labels':
                    //Obtenemos los botones principales
                    var buttons = this.elements.buttons.primary.getElementsByTagName('button');

                    for (var i = 0; i < buttons.length; i++) {
                        //Consultamos si en labels enviaron la key para modificar alguno de los botones
                        if (newValue[buttons[i].getAttribute('tipo')]) {
                            buttons[i].textContent = newValue[buttons[i].getAttribute('tipo')];
                        }
                    }
                    break;
                case 'buttons':
                    var buttons = this.elements.buttons.primary.getElementsByTagName('button');

                    for (var i = 0; i < buttons.length; i++) {

                        buttons[i].outerHTML = newValue[buttons[i].getAttribute('tipo')];
                    }

                    //var buttons2 = this.__internal.buttons;
                    break;
                case 'footer':
                    var footer = this.elements.buttons.primary;
                    footer.innerHTML = newValue;
                    break;
            }
        },
        hooks: {
            onok: function (closeEvent) {
                //closeEvent.cancel = true;
            },
            // triggered when the dialog is shown, this is seperate from user defined onshow
            onshow: function () {

                //if (this.options && this.options.height) {
                //    this.elements.dialog.style.height = this.options.height;
                //}
                //else {
                //this.elements.dialog.style.width = 'auto';
                //    this.elements.dialog.style.height = 'auto';
                //}
            },
            // triggered when the dialog is closed, this is seperate from user defined onclose
            onclose: function () {

                if (this.instance) {
                    Blaze.remove(this.instance);
                }
            },
            // triggered when a dialog option gets updated.
            // IMPORTANT: This will not be triggered for dialog custom settings updates ( use settingUpdated instead).
            onupdate: function () {
            }
        },
        prepare: function () {

            //var errorHeader = '<span class="fa fa-times-circle fa-2x" '
            //+ 'style="vertical-align:middle;color:#e10000;">'
            //+ '</span>' + this.title;
            //this.setHeader(errorHeader);
            this.setHeader(this.title);
            this.setContent(this.message);

        }
    };
}

function AppModalOkFactory() {
    return {

        main: function (_title, _message, _onok, _oncancel, _options) {

            var title, message, value, onok, oncancel;


            this.title = _title;
            this.message = _message;
            this.onok = _onok;
            this.value = '';
            this.options = _options;


            this.set('title', this.title);
            this.set('message', this.message);
            this.set('value', this.value);
            this.set('onok', this.onok);
            this.set('options', this.options);
            return this;
        },
        setup: function () {

            return {
                /* buttons collection */
                buttons: [

                    /*button defintion*/
                    {
                        /* button label */
                        text: 'Ok',
                        /*bind a keyboard key to the button */
                        key: 13/*Enter*/,
                        /* indicate if closing the dialog should trigger this button action */
                        invokeOnClose: true,
                        /* custom button class name  */
                        className: 'btn-inner ajs-ok',
                        /* custom button attributes  */
                        attrs: { tipo: 'ok', inner: '' },
                    }
                ],
                focus: { element: 0 },
                /* dialog options, these override the defaults */
                options: {
                    maximizable: false,
                    closable: true,
                    closableByDimmer: false,
                    resizable: true,
                    autoReset: false,
                }
            };
        },
        settings: {
            message: undefined,
            ondelete: undefined,
            oncancel: undefined,
            onok: undefined,
            value: '',
            templateTitle: 'default',
            templateMessage: 'default',
            labels: '',
            buttons: '',

        },
        build: function () {
            //this.elements.commands.close.className = 'ajs-close btn-inner';
            //this.elements.commands.close.innerHTML = '<i class="fa fa-user" ></i>';
            this.elements.dialog.className = 'ajs-dialog ajs-sidu';
        },

        callback: function (closeEvent) {


            var returnValue;
            switch (closeEvent.index) {

                case 0:


                    if (typeof this.get('onok') === 'function') {

                        //Validación del formulario antes de cerrar el prompt
                        var _form = $(this.elements.modal).find("form");


                        var attr = $(_form).attr('data-parsley-validate');

                        if (typeof attr !== typeof undefined && attr !== false) {


                            var boolValid = $(_form).parsley().validate();
                            if (boolValid == false) {

                                //si no es valid, no deja cerrar el prompt
                                closeEvent.cancel = true;
                                return false;
                            }
                        }


                        var obj = null;
                        var arrayValuesReturned = [];
                        //var valueReturn = $(".campo-return").val();
                        $(".campo-return").each(function (index) {

                            arrayValuesReturned.push({ "key": $(this).attr('id'), "value": $(this).val() });
                        });

                        //  returnValue = this.get('onok').call(this, closeEvent, valueReturn);
                        returnValue = this.get('onok').call(this, closeEvent, arrayValuesReturned);
                        returnValue = 1;


                        if (typeof returnValue !== 'undefined') {
                            closeEvent.cancel = !returnValue;
                        }
                    }
                    break;
            }
        },
        settingUpdated: function (key, oldValue, newValue) {
            // Use this to respond to specific setting updates.
            switch (key) {
                case 'templateTitle':
                    // Do something when 'templateName' changes
                    break;

                case 'templateMessage':
                    // Do something when 'templateName' changes
                    break;
                case 'labels':
                    //Obtenemos los botones principales
                    var buttons = this.elements.buttons.primary.getElementsByTagName('button');

                    for (var i = 0; i < buttons.length; i++) {
                        //Consultamos si en labels enviaron la key para modificar alguno de los botones
                        if (newValue[buttons[i].getAttribute('tipo')]) {
                            buttons[i].textContent = newValue[buttons[i].getAttribute('tipo')];
                        }
                    }
                    break;
                case 'buttons':
                    var buttons = this.elements.buttons.primary.getElementsByTagName('button');

                    for (var i = 0; i < buttons.length; i++) {
                        buttons[i].outerHTML = newValue[buttons[i].getAttribute('tipo')];
                    }

                    //var buttons2 = this.__internal.buttons;
                    break;
            }
        },
        hooks: {
            onok: function (closeEvent) {

                // closeEvent.cancel = true;
            },
            // triggered when the dialog is shown, this is seperate from user defined onshow
            onshow: function () {
                //var _form = $(this.elements.modal).find("form");

                if (this.options && this.options.height) {
                    this.elements.dialog.style.height = this.options.height;
                }
                else {
                    this.elements.dialog.style.height = 'auto';
                }


            },
            // triggered when the dialog is closed, this is seperate from user defined onclose
            onclose: function () {
            },
            // triggered when a dialog option gets updated.
            // IMPORTANT: This will not be triggered for dialog custom settings updates ( use settingUpdated instead).
            onupdate: function () {
            }
        },
        prepare: function () {

            //var errorHeader = '<span class="fa fa-times-circle fa-2x" '
            //+ 'style="vertical-align:middle;color:#e10000;">'
            //+ '</span>' + this.title;
            //this.setHeader(errorHeader);
            this.setHeader(this.title);
            this.setContent(this.message);

        }
    };
}

//Alerts
function AppMessageError(titulo, contenido, notificar) {
    
    var mensaje =
        '<div class="ajs-sidu-error" >' +
            '<div class="ajs-sidu-message-icon">'+
                '<i class="glyphicon glyphicon-remove-sign"></i>'+
            '</div>'+
            '<div class="ajs-sidu-message-body">'+
                contenido+
        '</div></div>';

    if (notificar)
    {
        alertify.set('notifier', 'position', 'top-center');
        alertify.notify(mensaje, 'sidu-message', 0, function () { });
    }
    else
    {
        return mensaje;
    }

}

function AppMessageWarning(titulo, contenido, notificar) {

    var mensaje =
        '<div class="ajs-sidu-warning" >' +
            '<div class="ajs-sidu-message-icon">' +
                '<i class="glyphicon glyphicon-exclamation-sign"></i>' +
            '</div>' +
            '<div class="ajs-sidu-message-body">' +
                contenido +
        '</div></div>';

    if (notificar) {
        alertify.set('notifier', 'position', 'top-center');
        alertify.notify(mensaje, 'sidu-message', 10, function () { });
    }
    else {
        return mensaje;
    }
}

function AppMessageSuccess(titulo, contenido, notificar) {

    var mensaje =
        '<div class="ajs-sidu-success" >' +
            '<div class="ajs-sidu-message-icon">' +
                '<i class="glyphicon glyphicon-ok-sign"></i>' +
            '</div>' +
            '<div class="ajs-sidu-message-body">' +
                contenido +
        '</div></div>';

    if (notificar) {
        alertify.set('notifier', 'position', 'bottom-right');
        alertify.notify(mensaje, 'sidu-message', 10, function () { });
    }
    else {
        return mensaje;
    }
}

function AppMessageInfo(titulo, contenido, notificar) {

    var mensaje =
        '<div class="ajs-sidu-info" >' +
            '<div class="ajs-sidu-message-icon">' +
                '<i class="glyphicon glyphicon-info-sign"></i>' +
            '</div>' +
            '<div class="ajs-sidu-message-body">' +
                contenido +
        '</div></div>';

    if (notificar) {
        alertify.set('notifier', 'position', 'bottom-right');
        alertify.notify(mensaje, 'sidu-message', 10, function () { });
    }
    else {
        return mensaje;
    }
}