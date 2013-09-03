Ext.define('Dinmu.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        stores: 'Dinmu.store.Settings',
        refs: {
            mainView: 'main',
            settingsView: 'settingsview',

            btnSettings: 'main button[action=settings]',
            btnRefresh: 'settingsview button[action=refresh]',
            btnBack: 'main button[action=back]',

            toggleGeo: 'settingsview togglefield',
            fieldCity: 'settingsview textfield[name=city]',
            fieldCountry: 'settingsview textfield[name=country]'
        },

        control: {
            'btnRefresh': {
                tap: 'onRefresh'
            },
            'btnSettings': {
                tap: 'onSettingsBtnTap'
            },
            'btnBack': {
                tap: 'onBackBtnTap'
            },
            'toggleGeo': {
                change: 'onToggle'
            },
            'mainView': {
                activeitemchange: 'onCarouselChange'
            }
        }

    },

    onRefresh: function() {
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            indicator: true,
            message: 'Save Settings...'
        });

        var errorstring = "";

        var model = Ext.create("Dinmu.model.Setting", {});
        this.getSettingsView().updateRecord(model);

        var errors = model.validate();

        if (!errors.isValid() && model.get('geo') === 0) {
            errors.each(function(errorObj) {
                errorstring += errorObj.getMessage() + "<br />";
            });

            Ext.Msg.alert("Oops", errorstring);
        } else {

            var store = Ext.getStore('Settings');
            store.removeAll();
            store.add(model.getData());
            store.sync();

            Dinmu.utils.Functions.loadData();
        }

        Ext.Viewport.mask();
    },
    onSettingsBtnTap: function() {
        this.getMainView().setActiveItem(0);
    },

    onBackBtnTap: function() {
        this.getMainView().setActiveItem(1);
    },
    onToggle: function(togglefield) {
        if (togglefield.getValue() === 0) {
            this.getFieldCity().enable();
            this.getFieldCountry().enable();
        } else {
            this.getFieldCity().disable();
            this.getFieldCountry().disable();
            this.getFieldCity().reset();
            this.getFieldCountry().reset();
        }
    },
    onCarouselChange: function(carousel, newVal, oldVal) {
        if (newVal.getItemId() == "mainview") {
            this.getBtnBack().hide();
            this.getBtnSettings().show();

            Ext.ComponentQuery.query('titlebar')[0].setTitle('Do I need my Umbrella?');
        } else {
            this.getBtnBack().show();
            this.getBtnSettings().hide();

            Ext.ComponentQuery.query('titlebar')[0].setTitle('Settings');
        }
    },
    //called when the Application is launched, remove if not needed
    launch: function(app) {
        this.getMainView().setActiveItem(1);
        Dinmu.utils.Functions.loadData();
    }
});