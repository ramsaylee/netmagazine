Ext.define('Dinmu.view.SettingsView', {
    extend: 'Ext.form.Panel',
    xtype: 'settingsview',
    requires: [
            'Ext.form.FieldSet',
            'Ext.field.Toggle',
            'Ext.field.Select',
            'Ext.field.Text',
            'Ext.Button'
    ],
    config: {
        items: [{
                xtype: 'fieldset',
                title: 'Your location',
                instructions: "In case you do not want the app to detect your location, you can prefill the city and country.",
                items: [{
                        name: 'geo',
                        xtype: 'togglefield',
                        label: 'Detect location?',
                        labelWidth: '55%',
                        value: 1
                    }, {
                        name: 'units',
                        xtype: 'selectfield',
                        options: [{
                                text: 'Celsius',
                                value: 'c'
                            }, {
                                text: 'Fahrenheit',
                                value: 'f'
                            }
                        ],
                        label: 'Units'
                    }, {
                        name: 'city',
                        xtype: 'textfield',
                        label: 'City',
                        disabled: true
                    }, {
                        name: 'country',
                        xtype: 'textfield',
                        label: 'Country',
                        disabled: true
                    }, {
                        xtype: 'button',
                        ui: 'confirm',
                        margin: '10 5',
                        action: 'refresh',
                        text: 'Refresh'
                    }
                ]
            }
        ]
    }
});