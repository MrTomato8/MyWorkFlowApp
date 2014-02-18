

Ext.define("MyWorkFlowApp.view.item.Edit", {
    extend:'Ext.form.Panel',

    alias : 'widget.itemeditpanel',

    requires:[
        'Ext.field.Checkbox',
                    'Ext.field.Select',
                    'Ext.field.Text',
        //            'Ext.Date',
                    'Ext.field.Spinner'
    ],
    config:{
        tabBarPosition:'bottom',

        items:[
                                            {
                                                xtype:'spinnerfield',
                                                name:'priority',
                                                label:'Priority',
                                                minValue:0,
                                                maxValue:100,
                                                increment:1,
                                                cycle:true
                                            },
                                            {
                                                xtype:'textfield',
                                                name:'text',
                                                label:'Text'
                                            },
                                            {
                                                xtype:'checkboxfield',
                                                name:'checked',
                                                label:'Done'
                                            },

                                            {
                                                xtype:'selectfield',
                                                label:'Frequency',
                                                name:'freq',
                                                options:[
                                                    {text:'Daily', value:'daily'},
                                                    {text:'Weekly', value:'weekly'},
                                                    {text:'Once', value:'once'}
                                                ]
                                            },
                                            {
                                                height:100,
                                                items:[
                                                    {
                                                        xtype:'button',
                                                        centered:true,
                                                        text:'Save',
                                                        scope:this,
                                                        handler:function (btn)
                                                            {
                                                                var formpanel = btn.up('formpanel');

                                                                formpanel.updateRecord(formpanel.getRecord());

//                                                                this.popup.hide();

                                                                this.save();

                                                                this.refreshList();
                                                            }
                                                    }
                                                ]
                                            }
                                        ],

        listeners:{
            activeitemchange:function (container, newActiveItem, oldActiveItem, eOpts)
                {
                    //newActiveItem.reload();
                }
        }
    }
});
